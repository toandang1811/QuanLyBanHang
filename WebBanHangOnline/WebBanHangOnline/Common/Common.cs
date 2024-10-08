﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace WebBanHangOnline.Common
{
    public class Common
    {
        #region keys config
        private const string KEY_EMAIL = "Email";
        private const string KEY_PASSWORDEMAIL = "PasswordEmail";
        #endregion

        #region messages
        public const string MsgErr = "Đã xảy ra lỗi trong quá trình xử lý!";
        #endregion

        private static string Email = ConfigurationManager.AppSettings[KEY_EMAIL];
        private static string PassWordEmail = ConfigurationManager.AppSettings[KEY_PASSWORDEMAIL];

        /// <summary>
        /// Send Mail to customer
        /// </summary>
        /// <param name="name"></param>
        /// <param name="subject"></param>
        /// <param name="content"></param>
        /// <param name="toMail"></param>
        /// <returns></returns>
        public static bool SendMail(string name, string subject, string content,
            string toMail)
        {
        bool rs = false;
            try
            {
                MailMessage message = new MailMessage();
                var smtp = new SmtpClient();
                {
                    smtp.Host = "smtp.gmail.com"; //host name
                    smtp.Port = 587; //port number
                    smtp.EnableSsl = true; //whether your smtp server requires SSL
                    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential() { 
                        UserName=Email,
                        Password= PassWordEmail
                    };
                }
                MailAddress fromAddress = new MailAddress(Email, name);
                message.From = fromAddress;
                message.To.Add(toMail);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = content;
                smtp.Send(message);
                rs = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                rs = false;
            }
            return rs;
        }

        /// <summary>
        /// Format number
        /// </summary>
        /// <param name="value"></param>
        /// <param name="SoSauDauPhay"></param>
        /// <returns></returns>
        public static string FormatNumber(object value, int SoSauDauPhay = 2)
        {
                bool isNumber = IsNumeric(value);
            decimal GT = 0;
            if (isNumber)
            {
                GT = Convert.ToDecimal(value);
            }
            string str = "";
            string thapPhan = "";
            for (int i = 0; i < SoSauDauPhay; i++)
            {
                thapPhan += "#";
            }
            if (thapPhan.Length > 0) thapPhan = "." + thapPhan;
            string snumformat = string.Format("0:#,##0{0}", thapPhan);
            str = String.Format("{" + snumformat + "}", GT);

            return str;
        }
        private static bool IsNumeric(object value)
        {
            return value is sbyte
                       || value is byte
                       || value is short
                       || value is ushort
                       || value is int
                       || value is uint
                       || value is long
                       || value is ulong
                       || value is float
                       || value is double
                       || value is decimal;
        }
    }
}