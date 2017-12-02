
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebStore_1.Models;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace WebStore_1.Controllers
{

    public class ApplicationController : ApiController
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();

        //метод для получения списка приложений (для всех клиентов)

        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal,UserConsoleClient")]
        public HttpResponseMessage GetApplications()
        {
            var apps = _db.Applications.Where(p => p.ApplicationUserId == IdentityExtensions.GetUserId(User.Identity) && p.Hide == false);
            return Request.CreateResponse(HttpStatusCode.OK, apps);
        }


        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal,UserConsoleClient")]
        public HttpResponseMessage GetUpdatesApp(string id)
        {

            Application app = _db.Applications.FirstOrDefault(p => p.Package == id && p.Hide == false);

            if (app != null)
            {


                var updates = from p in _db.Updates
                              join c in _db.Applications on p.ApplicationId equals c.Id
                              select p;

                return Request.CreateResponse(HttpStatusCode.OK, updates);


            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Приложения не Найдено");
            }

        }


        //метод для загрузки приложения

        [HttpPost]
        [Authorize(Roles = "Admin,UserWebPortal,UserConsoleClient")]

        public async Task<HttpResponseMessage> Upload()
        {
            UploadApp updApp = new UploadApp();

            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Ошибка при загрузке файла");
            }

            updApp.App = new Application();
            updApp.GetProvider();



            await Request.Content.ReadAsMultipartAsync(updApp.Provider);
            await updApp.ReadFileAsync();

            List<Error> errors = await updApp.ValidateAsync();

            //Валидация

            foreach (Error error in errors)
            {
                ModelState.AddModelError(error.Name, error.Text);
            }


            updApp.App.ApplicationUserId = IdentityExtensions.GetUserId(User.Identity);
            updApp.App.Date = DateTime.Now.ToString("dd MMMM yyyy | HH:mm:ss");
            //updApp.App.Id = Guid.NewGuid().ToString();


            ApplicationUserManager userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            // если не админ то подтверждение нужно
            if (!userManager.IsInRole(IdentityExtensions.GetUserId(User.Identity), "Admin"))
                updApp.App.Hide = true;
            updApp.App.Delete = false;
            updApp.App.Path = updApp.Path;
            updApp.App.PathIcon = updApp.PathIcon;




            if (!ModelState.IsValid) //валидация
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            _db.Applications.Add(updApp.App);

            _db.SaveChanges();



            return Request.CreateResponse(HttpStatusCode.Created, updApp.App);
        }

        [HttpDelete]
        [Authorize(Roles = "Admin,UserWebPortal")]
        //метод для удаления приложение 
        public HttpResponseMessage DeleteApp(int id)
        {
            Application app = _db.Applications.Find(id);

            if (app != null)
            {
                //проверка преднадлежности обьекта пользователю

                string idUser = IdentityExtensions.GetUserId(User.Identity);

                if (idUser != app.ApplicationUserId)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Не достаточно прав для удаления ресурса");
                }


                //Удаление приложения вместе с обновлениями

                app.Updates = _db.Updates.Where(p => p.ApplicationId == id);
                foreach (Update item in app.Updates)
                {


                    item.Hide = true;
                    item.Delete = true;

                    _db.Entry(item).State = EntityState.Modified;
                    //db.SaveChanges();
                }


                app.Hide = true;
                app.Delete = true;
                _db.Entry(app).State = EntityState.Modified;
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
