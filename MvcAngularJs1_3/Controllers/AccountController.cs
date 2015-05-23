using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcAngularJs1_3.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult AddPerson()
        {
            return View();
        }

        public ActionResult AccountSubMenue()
        {
            return View("_AccountSubmenue");
        }

        public ActionResult ManageRights()
        {
            return View();
        }

        public ActionResult PersonsList()
        {
            return View();
        }
    }
}
