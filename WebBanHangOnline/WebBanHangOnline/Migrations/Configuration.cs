namespace WebBanHangOnline.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebBanHangOnline.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(WebBanHangOnline.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.SystemSettings.AddOrUpdate(x => x.SettingKey,
                new Models.EF.SystemSetting() { SettingKey = "SettingTitle", SettingValue = "MeowShop", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingLogo", SettingValue = "", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingEmail", SettingValue = "dvt12209@gmail.com", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingHotline", SettingValue = "0374178407", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingTitleSeo", SettingValue = "", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingDesSeo", SettingValue = "", SettingDescription = "" },
                new Models.EF.SystemSetting() { SettingKey = "SettingKeySeo", SettingValue = "", SettingDescription = "" }
                );
        }
    }
}
