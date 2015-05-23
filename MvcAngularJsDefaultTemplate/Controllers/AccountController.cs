using System.Web.Mvc;
using MvcAngularJsDefaultTemplate.Models.Account;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJsDefaultTemplate.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Persons()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult GetPersons()
        {
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetPersonById(int id)
        {

            return Json("", JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult SavePerson(PersonEditModel model)
        {

            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}