using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using WebStore_1.Models;

namespace WebStore_1.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();
        // GET: User
        public ActionResult Index()
        {
            IEnumerable<Application> appList = _db.Applications.Where(p => p.Delete == false && p.Hide == false);
            return View(appList);
        }

        public ActionResult OutMenu()
        {
            List<Category> categories = _db.Categories.ToList();

            return PartialView(categories);
        }

        public ActionResult LoadUpd(int id)
        {
            return PartialView(_db.Updates.Where(p => p.Delete == false && p.Hide == false && p.ApplicationId == id));
        }

        public ActionResult LoadAppCategory(int? id)
        {
            if (id == null)
            {
                IEnumerable<Application> apps = _db.Applications.Where(p => p.Delete == false & p.Hide == false).Include(p => p.ApplicationUser);
                return PartialView("LoadApp", apps);
            }

            else
            {
                ViewBag.Id = id;
                IEnumerable<Application> apps = _db.UserCategories.Where(p => p.CategoryId == id)
                    .Select(p => p.ApplicationId)
                    .Select(idapp => _db.Applications.FirstOrDefault(app => app.Id == idapp))
                    .Where(app => app.Delete == false && app.Hide == false).Include(p => p.ApplicationUser); 

                return PartialView("LoadApp", apps);
            }
        }
    }
}