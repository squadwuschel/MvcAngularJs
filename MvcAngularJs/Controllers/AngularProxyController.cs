using System;
using System.Collections.Generic;
using System.Web.Mvc;
using MvcAngularJs.Helpers;
using MvcAngularJs.Helpers.Messages;
using MvcAngularJsProxyBuilder;
using Newtonsoft.Json;

namespace MvcAngularJs.Controllers
{
    public class AngularProxyController : Controller
    {
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
            messages.MessageList.Add(new Message() { MessageType = MessageType.info, Text = "Dies ist eine Proxy Info Meldung 1 von: " + DateTime.Now.ToLongTimeString() });
            return Json(messages, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult GetWarningMessage()
        {
            EmptyMessages messages = new EmptyMessages();
            messages.MessageList.Add(new Message() { MessageType = MessageType.warning, Text = "Dies ist eine Proxy Warnmeldung 1 von: " + DateTime.Now.ToLongTimeString() });
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

            auto.MessageList.Add(new Message() { MessageType = MessageType.success, Text = "Dies ist eine Proxy Erfolgsmeldung 1 von: " + DateTime.Now.ToLongTimeString() });
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

            auto.MessageList.Add(new Message() { MessageType = MessageType.danger, Text = "Dies ist eine Proxy Fehlermeldung 1 von: " + DateTime.Now.ToLongTimeString() });
            return Json(auto, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Poxy Testfunktionen
        public ActionResult ProxyTestData()
        {
            return View();
        }

        [AngularCreateProxy]
        public JsonResult TestDatenOne(string fullName, int age, int? gehalt)
        {
            return Json(new {Name = fullName, Age = age, Gehalt = gehalt}, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenTwo(int id, string fullName, int age, DateTime datum)
        {
            return Json(new { ID = id, Name = fullName, Age = age, GebDat = datum }, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenObjectOne(string name)
        {
            AutoHersteller hersteller = new AutoHersteller();
            hersteller.AnzMitarbeiter = 12345;
            hersteller.AutoTypen = new List<Autos>();

            List<Message> messages = new List<Message>();
            messages.Add(new Message() { MessageType = MessageType.info, Text = "Test Message"});

            hersteller.AutoTypen.Add(new Autos() { LieferzeitInWochen = 12, Name = "Auto", Price = 12432, MessageList = messages});
            hersteller.Hersteller = "BMW &" + name;
            hersteller.Id = 12;
            hersteller.Land = "DE";

            return Json(hersteller, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenObjectTwo(int id, AutoHersteller hersteller)
        {
            //Leider weiß ich nicht warum das AutoHersteller Objekt nicht erkannt wird, das Person Objekt weiter unten
            //wird problemlos erkannt.
            return Json(new { Hersteller= hersteller, ID = id} , JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenObjectPerson(string name)
        {
            List< Kennzeichen> kennzeichen = new List<Kennzeichen>();
            kennzeichen.Add(new Kennzeichen() { Ort = "Dresden", Price = 123});
            kennzeichen.Add(new Kennzeichen() { Ort = "Berlin", Price = 43});

            Person pers = new Person();
            pers.Name = "Checker " + name;
            pers.Vorname = "Vom Dienst";
            pers.Namen = new List<Auto>();
            pers.Namen.Add(new Auto() { AutoTyp = "blubb", Name = "BMW", Price = 1234, Kennzeichen = kennzeichen});
            pers.Namen.Add(new Auto() { AutoTyp = "blubb1", Name = "BMW1", Price = 23534, Kennzeichen = kennzeichen});
            pers.Namen.Add(new Auto() { AutoTyp = "blubb2", Name = "BMW2", Price = 6542, Kennzeichen = kennzeichen});

            return Json(pers, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenObjectPersonSichernOne(int id, Person person)
        {
            return Json(new { Person = person, ID = id }, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult TestDatenObjectPersonSichernTwo(Person person)
        {
            return Json(new { Person = person}, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}