using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebStore_1.Models;

namespace WebStore_1.Controllers
{


    public class CategoryController : ApiController
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();

        [HttpPost]
        [Authorize(Roles = "Admin,UserWebPortal")]
        public HttpResponseMessage SetCategoryForApp([FromBody]SetCategoryForApp obj)
        {

            Application app = _db.Applications.Find(obj.AppId);

            if (app == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Приложние не найдено");
            }
            else
            {
                if (obj.CategoryId == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Id Категорий пустые");
                }
                else
                {
                    foreach (int catId in obj.CategoryId)
                    {
                        var cat = _db.Categories.Find(catId);

                        if (cat == null)
                        {
                            return Request.CreateResponse(HttpStatusCode.NotFound, "Категория не найдена");
                        }

                        else
                        {
                            _db.UserCategories.Add(new UserCategory() { ApplicationId = app.Id, CategoryId = cat.Id });
                            try
                            {
                                _db.SaveChanges();
                            }

                            catch (System.Data.Entity.Infrastructure.DbUpdateException)
                            {
                                return Request.CreateResponse(HttpStatusCode.BadRequest, "Категория: "+cat.Name+" уже добавлена");
                            }
                        }
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);

            }
        }
    }
}

