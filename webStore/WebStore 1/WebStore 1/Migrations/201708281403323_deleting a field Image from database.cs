namespace WebStore_1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deletingafieldImagefromdatabase : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Application", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Application", "Image", c => c.Binary(nullable: false));
        }
    }
}
