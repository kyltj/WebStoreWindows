namespace WebStore_1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tebrtrb : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Application", "PathIcon", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Application", "PathIcon");
        }
    }
}
