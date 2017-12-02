
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebStore_1.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace WebStore_1.Controllers
{
    public class UpdateController : ApiController
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();

        //метод для получения списка обновлений (для всех клиентов)

        [HttpGet]
        [Authorize(Roles = "Admin,UserWebPortal,UserConsoleClient")]
        public HttpResponseMessage GetUpdates()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _db.Updates);
        }

        //метод для загрузки обновления

        [HttpPost]
        [Authorize(Roles = "Admin,UserWebPortal,UserConsoleClient")]

        public async Task<HttpResponseMessage> Upload(int id)
        {
            UploadUpd updUpd = new UploadUpd();

            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Ошибка при загрузке файла");
            }

            updUpd.Upd = new Update();
            updUpd.GetProvider();



            await Request.Content.ReadAsMultipartAsync(updUpd.Provider);
            await updUpd.ReadFileAsync();

            List<Error> errors = await updUpd.ValidateAsync(id);

            //Валидация

            foreach (Error error in errors)
            {
                ModelState.AddModelError(error.Name, error.Text);
            }

            if (!ModelState.IsValid) //валидация
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }


            updUpd.Upd.Date = DateTime.Now.ToString("dd MMMM yyyy | HH:mm:ss");
            updUpd.Upd.ApplicationId = id;
            updUpd.Upd.Hide = true;
            updUpd.Upd.Delete = false;
            updUpd.Upd.Path = updUpd.Path;
          
            _db.Updates.Add(updUpd.Upd);
            _db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.Created, updUpd.Upd);
        }


        [HttpDelete]
        [Authorize(Roles = "Admin,UserWebPortal")]
        //метод для удаления  обновления
        public HttpResponseMessage DeleteUpd(int id)
        {
            Update upd = _db.Updates.Find(id);
            if (upd != null)
            {
                var app = _db.Applications.FirstOrDefault(p => p.Id == upd.ApplicationId);
                if (app != null)
                {
                    string idUser = Microsoft.AspNet.Identity.IdentityExtensions.GetUserId(User.Identity);

                    if (idUser != app.ApplicationUserId)
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Не достаточно прав для удаления ресурса");
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                upd.Hide = true;
                upd.Delete = true;

                _db.Entry(app).State = EntityState.Modified;
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, upd);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
