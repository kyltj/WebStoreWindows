using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebStore_1.Models;
using System.IO;

namespace WebStore_1.Controllers
{
    public class RoomController : Controller
    {

        // получает список приложений (только для веб портала)
        private readonly ApplicationDbContext _db = new ApplicationDbContext();
        [Authorize(Roles = "Admin,UserWebPortal")]
        public ActionResult Index()
        {
            return View();
        }

        //получает список обновлений (только для веб портала)

        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal")]
        public ActionResult LoadUpd(int id)
        {
            var allUpdates = _db.Updates.Where(p => p.ApplicationId == id && p.Delete == false);

           

            return PartialView(allUpdates);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal")]

        public ActionResult OutCategories()
        {
            List<Category> categories = _db.Categories.ToList();
            return PartialView(categories);
        }
        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal")]

        public ActionResult LoadApp()
        {
            string id = Microsoft.AspNet.Identity.IdentityExtensions.GetUserId(User.Identity);
            IEnumerable<Application> appList = _db.Applications.Where(p => p.ApplicationUserId == id && p.Delete == false);

            return PartialView(appList);
        }


        // метод для скачки приложения (для всех клиентов)
        [HttpGet]
        [Authorize]
        public FileResult DowloadApp(string id)
        {

            Application app = _db.Applications.FirstOrDefault(p => p.Package == id && p.Hide == false);

            if (app == null)
            {
                Response.StatusCode = 404; // Replace .AddHeader
                throw new HttpException(404, "Приложения с таким Id не найдено");
            }
            else
            {
                Response.StatusCode = 200; // Replace .AddHeader
                string path = System.Web.HttpContext.Current.Server.MapPath("~/Applications/" + app.Path);
                // Объект Stream
                FileStream fs = new FileStream(path, FileMode.Open);
                string fileType = "application/zip";
                string fileName = app.Path;
                return File(fs, fileType, fileName);
            }

        }


        [HttpGet]

        public FileResult DowloadUpd(int id)
        {


            Update upd = _db.Updates.FirstOrDefault(p => p.Id == id && p.Hide == false);

            if (upd != null && upd.Hide)
            {
                Response.StatusCode = 400; // Replace .AddHeader
                throw new HttpException(400, "Вы не имеете права качать этот ресурс");
            }

            if (upd == null)
            {
                Response.StatusCode = 404; // Replace .AddHeader
                throw new HttpException(404, "Обновления  с таким Id не найдено");
            }

            else
            {
                Response.StatusCode = 200; // Replace .AddHeader
                string path = System.Web.HttpContext.Current.Server.MapPath("~/Updates/" + upd.Path);
                // Объект Stream
                FileStream fs = new FileStream(path, FileMode.Open);
                string fileType = "application/zip";
                string fileName = upd.Path;
                return File(fs, fileType, fileName);
            }

        }


        [HttpPost]

        public FileResult DowloadUpdConsole(string id)
        {

            if (Request.Headers.GetValues("Version") == null)
            {
                Response.StatusCode = 404; // Replace .AddHeader
                throw new HttpException(404, "Обновления с такой версией не найдено");
            }

            string version = Request.Headers.GetValues("Version")?[0];
            Application app = _db.Applications.FirstOrDefault(p => p.Package == id && p.Hide == false);
            Update upd = _db.Updates.FirstOrDefault(p => p.ApplicationId == app.Id && p.Version == version && p.Hide == false);

            if (upd == null)
            {
                Response.StatusCode = 404; // Replace .AddHeader
                throw new HttpException(404, "приложения с таким Id не найдено");
            }

            else
            {
                Response.StatusCode = 200; // Replace .AddHeader
                string path = System.Web.HttpContext.Current.Server.MapPath("~/Updates/" + upd.Path);
                // Объект Stream
                FileStream fs = new FileStream(path, FileMode.Open);
                string fileType = "application/zip";
                string fileName = upd.Path;
                return File(fs, fileType, fileName);
            }

        }
    }
}