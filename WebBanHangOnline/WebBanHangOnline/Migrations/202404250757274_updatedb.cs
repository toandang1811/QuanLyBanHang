namespace WebBanHangOnline.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedb : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.tb_Adv", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Adv", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Category", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Category", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_News", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_News", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Posts", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Posts", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Contact", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Contact", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Order", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Order", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Product", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_Product", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.tb_ProductCategory", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.tb_ProductCategory", "ModifiedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.tb_ProductCategory", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_ProductCategory", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Product", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Product", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Order", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Order", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Contact", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Contact", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Posts", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Posts", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_News", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_News", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Category", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Category", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Adv", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.tb_Adv", "CreatedDate", c => c.DateTime(nullable: false));
        }
    }
}
