using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MvcAngularJs.Helpers;
using MvcAngularJs.Helpers.DataTypes;
using MvcAngularJs.Helpers.Messages;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult TemplateUrl()
        {
            return View();
        }

        public ActionResult FileUpload()
        {
            return View();
        }

        public ActionResult RadioInputs()
        {
            return View();
        }

        public ActionResult Codehighlight()
        {
            return View();
        }

        public ActionResult Services()
        {
            return View();
        }

        public ActionResult NgFormValidation()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PrototypeScope()
        {
            return View();
        }

        public ActionResult Alerts()
        {
            return View();
        }

        #region Angular xeditable Controls

        public ActionResult Xeditable()
        {
            return View();
        }

        public ActionResult Multiselect()
        {
            return View();
        }

        public ActionResult SlideDirective()
        {
            return View();
        }
        #endregion

        #region Directives
        public ActionResult Directives()
        {
            return View();
        }
        #endregion

        #region Validation
        public ActionResult Validation()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult ValidationDataModel()
        {
            return Json(new ValidationDataModel(), JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult SaveValidationModelData(ValidationDataModel model)
        {
            //Daten speichern und zurückgeben.
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Überprüft ob die übergebene Mailadresse bereits enthalten ist.
        /// </summary>
        public JsonResult CheckEmailExists(string mail)
        {
            if (mail == "undefined")
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            List<string> mails = new List<string>() { "joe@gmx.de", "squad@gmx.de", "wuschel@web.de" };
            if (mails.Any(p => p.ToLower() == mail.ToLower()))
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Custom Filters
        public ActionResult Filters()
        {
            return View();
        }
        #endregion

        #region MessageHandlingView
        public ActionResult Messages()
        {
            return View();
        }

        [AngularCreateProxy]
        [MyErrorHandler]
        public JsonResult GetJsonError()
        {
            //Fehler wird im Custom Handler abgearbeitet.
            throw new Exception("Es wurde ein Fehler ausgelöst und diese Meldung angezeigt.");
        }

        [AngularCreateProxy]
        public JsonResult GetInfoMessage()
        {
            EmptyMessages messages = new EmptyMessages();
            messages.MessageList.Add(new Message() { MessageType = MessageType.info, Text = "Dies ist eine Info Meldung 1 von: " + DateTime.Now.ToLongTimeString() });
            messages.MessageList.Add(new Message() { MessageType = MessageType.info, Text = "Dies ist eine Info Meldung 2 von: " + DateTime.Now.ToLongTimeString() });
            return Json(messages, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetWarningMessage()
        {
            EmptyMessages messages = new EmptyMessages();
            messages.MessageList.Add(new Message() { MessageType = MessageType.warning, Text = "Dies ist eine Warnmeldung 1 von: " + DateTime.Now.ToLongTimeString() });
            messages.MessageList.Add(new Message() { MessageType = MessageType.warning, Text = "Dies ist eine Warnmeldung 2 von: " + DateTime.Now.ToLongTimeString() });
            return Json(messages, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetSuccessMessage()
        {
            //Eine beliebiges Model nehmen, welches von BaseMessageModel ableitet!
            Autos auto = new Autos();
            auto.Name = "BMW";
            auto.Price = 85000;
            auto.LieferzeitInWochen = 4;

            auto.MessageList.Add(new Message() { MessageType = MessageType.success, Text = "Dies ist eine Erfolgsmeldung 1 von: " + DateTime.Now.ToLongTimeString() });
            auto.MessageList.Add(new Message() { MessageType = MessageType.success, Text = "Dies ist eine Erfolgsmeldung 2 von: " + DateTime.Now.ToLongTimeString() });
            return Json(auto, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetErrorMessage()
        {
            //Eine beliebiges Model nehmen, welches von BaseMessageModel ableitet!
            Autos auto = new Autos();
            auto.Name = "Merzedes";
            auto.Price = 65600;
            auto.LieferzeitInWochen = 2;

            auto.MessageList.Add(new Message() { MessageType = MessageType.danger, Text = "Dies ist eine Fehlermeldung 1 von: " + DateTime.Now.ToLongTimeString() });
            auto.MessageList.Add(new Message() { MessageType = MessageType.danger, Text = "Dies ist eine Fehlermeldung 2 von: " + DateTime.Now.ToLongTimeString() });
            return Json(auto, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region DropdownlistView
        public ActionResult DropDownlist()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult GetLevels()
        {
            List<ListItemHelper> items = new List<ListItemHelper>();
            items.Add(new ListItemHelper() { Text = "Home", Value = "5" });
            items.Add(new ListItemHelper() { Text = "Live", Value = "6" });
            items.Add(new ListItemHelper() { Text = "Dev", Value = "7" });
            items.Add(new ListItemHelper() { Text = "Staging", Value = "8" });

            return Json(items, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region TableExampleView - Nested Tables
        public ActionResult TableExample()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult GetAutoHersteller()
        {
            return Json(GetAllHersteller(), JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetAutosByHerstellerId(int id)
        {
            List<Autos> autos = new List<Autos>();

            switch (id)
            {
                case 1:
                    autos.Add(new Autos() { LieferzeitInWochen = 2, Name = "BMW Mini", Price = 34000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 4, Name = "BMW 3er", Price = 54000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 6, Name = "BMW 5er", Price = 78000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 8, Name = "BMW 6er", Price = 99000 });
                    break;
                case 2:
                    autos.Add(new Autos() { LieferzeitInWochen = 12, Name = "Merzedes E-Klasse", Price = 44000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 3, Name = "Merzedes S-Klasse", Price = 74000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 7, Name = "Merzedes Mini", Price = 54000 });
                    break;
                case 3:
                    autos.Add(new Autos() { LieferzeitInWochen = 1, Name = "Volvo - 1", Price = 34000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 14, Name = "Volvo - 2", Price = 41000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 13, Name = "Volvo - 4", Price = 53000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 8, Name = "Volvo - 7", Price = 73000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 13, Name = "Volvo - 6", Price = 53000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 16, Name = "Volvo - 5", Price = 64500 });
                    break;
                case 4:
                    autos.Add(new Autos() { LieferzeitInWochen = 2, Name = "Opel - 1", Price = 34000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 4, Name = "Opel - 2", Price = 54000 });
                    break;
                case 5:
                    autos.Add(new Autos() { LieferzeitInWochen = 1, Name = "Renault - 1", Price = 34000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 2, Name = "Renault - 2", Price = 54000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 4, Name = "Renault - 4", Price = 44000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 5, Name = "Renault - 5", Price = 24200 });
                    autos.Add(new Autos() { LieferzeitInWochen = 6, Name = "Renault - 6", Price = 34200 });
                    autos.Add(new Autos() { LieferzeitInWochen = 9, Name = "Renault - 7", Price = 35000 });
                    break;
                case 6:
                    autos.Add(new Autos() { LieferzeitInWochen = 1, Name = "Toyota - 1", Price = 34000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 7, Name = "Toyota - 2", Price = 24000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 5, Name = "Toyota - 4", Price = 14000 });
                    break;
                case 7:
                    autos.Add(new Autos() { LieferzeitInWochen = 2, Name = "KIA - 1", Price = 32000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 6, Name = "KIA - 2", Price = 67000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 5, Name = "KIA - 3", Price = 54000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 4, Name = "KIA - 5", Price = 14000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 2, Name = "KIA - 4", Price = 24000 });
                    break;
                case 8:
                    autos.Add(new Autos() { LieferzeitInWochen = 22, Name = "Dacia - 1", Price = 324000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 42, Name = "Dacia - 2", Price = 324000 });
                    autos.Add(new Autos() { LieferzeitInWochen = 23, Name = "Dacia - 3", Price = 134000 });
                    break;
            }

            return Json(autos, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        private List<AutoHersteller> GetAllHersteller()
        {
            List<AutoHersteller> hersteller = new List<AutoHersteller>();
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 10350, AutoTypen = new List<Autos>(), Hersteller = "BMW", Id = 1, Land = "DE" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 6345, AutoTypen = new List<Autos>(), Hersteller = "Merzedes", Id = 2, Land = "DE" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 2560, AutoTypen = new List<Autos>(), Hersteller = "Volvo", Id = 3, Land = "SW" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 2460, AutoTypen = new List<Autos>(), Hersteller = "Opel", Id = 4, Land = "US" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 8932, AutoTypen = new List<Autos>(), Hersteller = "Renault", Id = 5, Land = "FR" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 6543, AutoTypen = new List<Autos>(), Hersteller = "Toyota", Id = 6, Land = "JP" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 3245, AutoTypen = new List<Autos>(), Hersteller = "KIA", Id = 7, Land = "KR" });
            hersteller.Add(new AutoHersteller() { AnzMitarbeiter = 4523, AutoTypen = new List<Autos>(), Hersteller = "Dacia", Id = 8, Land = "BU" });
            return hersteller;
        }
        #endregion

        #region Services

        public ActionResult GetModelData()
        {
            var obj = new ServiceData()
            {
                Alter = 32,
                Geburtstag = new DateTime(1982, 3, 15),
                Gehalt = (decimal)1034.45,
                Name = "Johannes"
            };

            return this.JsonEx(obj);
        }

        public ActionResult SaveModelData(ServiceData data)
        {
            data.Name += " Posted";
            data.Gehalt += (decimal)100.23;

            return this.JsonEx(data);
        }
        #endregion

        #region FileUpload
        [HttpPost]
        public JsonResult Upload(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                //Da ich aktuell nicht weiß wie ich ebenfalls z.B. "UploadPerson" direkt im Upload mit
                //"befüllen" lassen kann füllen wir dieses Model erst einmal per "Hand".
                var json = HttpContext.Request.Form["person"];
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                UploadPerson person = (UploadPerson)serializer.Deserialize(json, typeof(UploadPerson));
                //TODO etwas mit den Personendaten machen.

                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/Images/"), fileName);
                file.SaveAs(path);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
