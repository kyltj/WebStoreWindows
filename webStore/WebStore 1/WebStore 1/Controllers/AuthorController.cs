using System.Data.Entity;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Web.Mvc;
using WebStore_1.Models;

namespace WebStore_1.Controllers
{
    public class AuthorController : Controller
    {

        private readonly ApplicationDbContext _db = new ApplicationDbContext();
        [Authorize]
        // GET: Author
        public ActionResult Index()
        {
            string idUser = IdentityExtensions.GetUserId(User.Identity);
            return View(_db.Users.Find(idUser));
        }

        [Authorize]
        public ActionResult LoadAppAuthor(string idName)
        {
            ApplicationUser user;
            if (idName == null)
            {
                user = _db.Users.Find(IdentityExtensions.GetUserId(User.Identity));
            }

            else
            {
                user = _db.Users.Where(p => p.UserName == idName).FirstOrDefault();
            }

            var apps = _db.Applications.Where(p =>
                p.ApplicationUserId == user.Id && p.Hide == false && p.Delete == false).Include(p => p.ApplicationUser);
            return PartialView("LoadApp", apps);
        }

    }
}