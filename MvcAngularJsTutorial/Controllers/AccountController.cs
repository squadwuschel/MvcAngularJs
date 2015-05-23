using System.Web.Mvc;
using MvcAngularJsTutorial.Helpers;

namespace MvcAngularJsTutorial.Controllers
{
    public class AccountController : Controller
    {
        #region Views
        // GET: Account
        public ActionResult Person()
        {
            return View();
        }
        #endregion

        #region Ajax Calls
        /// <summary>
        /// Alle Personen in unserem Repository zurückgeben
        /// </summary>
        public JsonResult GetAllPersons()
        {
            return Json(PersonRepository.Persons.GetAllPersons(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Leeres Model für einen Personeneintrag zurückgeben.
        /// </summary>
        public JsonResult GetPersonModelData()
        {
            return Json(new PersonEntry(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Leeres Auto Model zurückgeben
        /// </summary>
        public JsonResult GetAutModelData()
        {
            return Json(new AutoEntry(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Die Übergebene Person unserem Repistory hinzufügen
        /// </summary>
        [HttpPost]
        public JsonResult AddPerson(PersonEntry person)
        {
            PersonRepository.Persons.AddPerson(person);
            //Einfach die Liste inkl. der neuen Person wieder zurückgeben.
            return Json(PersonRepository.Persons.GetAllPersons(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Das Auto zu unserem Repository hinzufügen
        /// </summary>
        /// <param name="id">Die PersonenId an der das Auto hinzugefügt werden soll</param>
        [HttpPost]
        public JsonResult AddAuto(AutoEntry auto, int id)
        {
            PersonRepository.Persons.AddAuto(id, auto);
            return Json(PersonRepository.Persons.GetAllPersons());
        }

        /// <summary>
        /// Löschen der zugehörigen Person zur Id
        /// </summary>
        [HttpPost]
        public JsonResult DeletePerson(int id)
        {
            PersonRepository.Persons.DeletePerson(id);
            return Json(PersonRepository.Persons.GetAllPersons());
        }

        /// <summary>
        /// Löschen des zugehörigen Autos zur Id
        /// </summary>
       [HttpPost]
        public JsonResult DeleteAuto(int id)
        {
            PersonRepository.Persons.DeleteAuto(id);
            return Json(PersonRepository.Persons.GetAllPersons());
        }
        #endregion
    }
}