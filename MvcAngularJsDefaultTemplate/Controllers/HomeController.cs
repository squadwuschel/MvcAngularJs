using System.Collections.Generic;
using System.Drawing.Printing;
using System.Web.Mvc;
using MvcAngularJsDefaultTemplate.Models.Home;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJsDefaultTemplate.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult GetDashboardPersons()
        {
            List<PersonDashboardModel> models = new List<PersonDashboardModel>();
            models.Add(new PersonDashboardModel() { Age = 22, Price = 3478, Firstname = "Jonas", Lastname = "Müller"});
            models.Add(new PersonDashboardModel() { Age = 42, Price = 5446, Firstname = "Mustava", Lastname = "Ürkütz"});
            models.Add(new PersonDashboardModel() { Age = 26, Price = 12456, Firstname = "Ützgür", Lastname = "Meier"});
            models.Add(new PersonDashboardModel() { Age = 66, Price = 2531, Firstname = "Peter", Lastname = "Neubert"});
            models.Add(new PersonDashboardModel() { Age = 22, Price = 3456, Firstname = "Atze", Lastname = "Schröder"});
            return Json(models, JsonRequestBehavior.AllowGet);
        }
    }
}