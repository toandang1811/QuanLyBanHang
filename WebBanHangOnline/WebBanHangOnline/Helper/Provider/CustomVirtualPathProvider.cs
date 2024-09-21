using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebBanHangOnline.Helper.Provider
{
    public class CustomVirtualPathProvider : VirtualPathProvider
    {
        public override bool FileExists(string virtualPath)
        {
            if (IsCustomPath(virtualPath))
            {
                return true;
            }
            return base.FileExists(virtualPath);
        }


        public override VirtualFile GetFile(string virtualPath)
        {
            if (IsCustomPath(virtualPath))
            {
                return new CustomVirtualFile(virtualPath);
            }
            return base.GetFile(virtualPath);
        }

        private bool IsCustomPath(string virtualPath)
        {
            // Kiểm tra nếu đường dẫn là đường dẫn tùy chỉnh
            return virtualPath.StartsWith("~/CustomViews/");
        }
    }

    public class CustomVirtualFile : VirtualFile
    {
        public CustomVirtualFile(string virtualPath) : base(virtualPath) { }

        public override Stream Open()
        {
            // Đọc tệp từ project khác
            string physicalPath = HostingEnvironment.MapPath("~/../BeeShop_Admin/Views/Shared/_Layout.cshtml");
            return File.OpenRead(physicalPath);
        }
    }
}