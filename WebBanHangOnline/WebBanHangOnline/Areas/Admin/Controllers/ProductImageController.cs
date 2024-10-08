using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBanHangOnline.Models;
using WebBanHangOnline.Models.EF;

namespace WebBanHangOnline.Areas.Admin.Controllers
{
    [CustomAuthorizeAttribute(Roles = "Admin,Employee")]
    public class ProductImageController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly Cloudinary _cloudinary;
        public ProductImageController()
        {
            var account = new Account(
                ConfigurationManager.AppSettings["cloud_name"],
                ConfigurationManager.AppSettings["api_key"],
                ConfigurationManager.AppSettings["api_secret"]
            );
            _cloudinary = new Cloudinary(account);
        }
        // GET: Admin/ProductImage
        public ActionResult Index(int id)
        {
            ViewBag.ProductId = id;
            var items = db.ProductImages.Where(x => x.ProductId == id).ToList();
            return View(items);
        }

        [HttpPost]
        public ActionResult AddImage(int productId,string url)
        {
            DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
            Cloudinary cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
            cloudinary.Api.Secure = true;
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(url),
                UseFilename = true,
                UniqueFilename = true,
                Overwrite = true,
                Folder = "Product"
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            string uploadedImageUrl = uploadResult.SecureUrl.ToString();
            if (!string.IsNullOrEmpty(uploadedImageUrl)) 
            {
                db.ProductImages.Add(new ProductImage
                {
                    ProductId = productId,
                    Image = uploadedImageUrl,
                    IsDefault = false
                });
                db.SaveChanges();
            }
            return Json(new { Success=true});
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var item = db.ProductImages.Find(id);
            db.ProductImages.Remove(item);
            db.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult Update(List<HttpPostedFileBase> newFiles, List<string> deleteIds)
        {
            if (newFiles != null)
            {
                foreach (var file in newFiles)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(file.FileName, file.InputStream)
                        };

                        var uploadResult = _cloudinary.Upload(uploadParams);
                    }
                }
            }

            if (deleteIds != null && deleteIds.Count > 0)
            {
                foreach (var publicId in deleteIds)
                {
                    var deleteParams = new DeletionParams(publicId);
                    var deleteResult = _cloudinary.Destroy(deleteParams);

                    // Xử lý deleteResult nếu cần
                }
            }
            return Json(new { success = true });
        }

        public ActionResult SetIsDefault(int id)
        {
            var item = db.ProductImages.Find(id);
            //db.ProductImages.Remove(item);
            db.SaveChanges();
            return Json(new { success = true });
        }
    }
}