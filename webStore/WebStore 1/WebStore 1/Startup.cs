using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebStore_1.Startup))]
namespace WebStore_1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
