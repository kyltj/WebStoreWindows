using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;
using WebStore_1.Models;

using System.Web.Security;

namespace WebStore_1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();
        // GET: Admin

        public ActionResult Index() => View();

        [System.Web.Mvc.HttpPost]
        public ActionResult EditApp(int id, [System.Web.Http.FromBody]Application app)
        { 
            //проверка сущестованиея редактируемого обьекта
            var appValid = _db.Applications.Find(id);
            if (appValid != null)
            {
                appValid.Hide = app.Hide;
                appValid.Delete = app.Delete;

                if (appValid.Hide != app.Hide)
                {
                    if (appValid.Hide)
                    {
                        foreach (var item in appValid.Updates)
                        {
                            item.Hide = true;
                            _db.Entry(item).State = EntityState.Modified;
                        }
                    }
                    else
                    {
                        foreach (var item in appValid.Updates)
                        {
                            item.Hide = false;
                            _db.Entry(item).State = EntityState.Modified;
                        }
                    }
                }

              

                appValid.Hide = app.Hide;
                appValid.Delete = app.Delete;

                _db.Entry(appValid).State = EntityState.Modified;
            }
            _db.SaveChanges();

            return View("Index");
        }


        public ActionResult EditUpd(int id , [System.Web.Http.FromBody]Update upd)
        {
            //Контроллер для Удаления/Восстоновления обновления
            Update updValidate = _db.Updates.Find(upd.Id);

            if (updValidate == null)
            {
                ModelState.AddModelError("Ошибка", @"Редактируемое обновление не найдено");
                return View("Index");

            }
            else
            {
                updValidate.Hide = upd.Hide;
                updValidate.Delete = upd.Delete;
                _db.Entry(updValidate).State = EntityState.Modified;
                _db.SaveChanges();
            }
            return View("Index");
        }

        public string GetApplications()
        {

            return JsonConvert.SerializeObject(_db.Applications.ToList());
        }


        public string GetUpdates()
        {

            return JsonConvert.SerializeObject(_db.Updates.ToList());
        }

        public string GetCategories()
        {
            return JsonConvert.SerializeObject(_db.Categories.ToList());
        }
    }
}


