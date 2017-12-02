namespace WebStore_1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class getCatNameForApplication : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Application", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Application", new[] { "CategoryId" });
            DropColumn("dbo.Application", "CategoryId");
            DropColumn("dbo.Application", "CategoryName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Application", "CategoryName", c => c.String(nullable: false));
            AddColumn("dbo.Application", "CategoryId", c => c.Int());
            CreateIndex("dbo.Application", "CategoryId");
            AddForeignKey("dbo.Application", "CategoryId", "dbo.Categories", "Id");
        }
    }
}
