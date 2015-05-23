using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJsTutorial.Helpers
{
    public class PersonEntry
    {
        public PersonEntry()
        {
            PersonId = 0;
            Vorname = string.Empty;
            Nachname = string.Empty;
            Wohnort = string.Empty;
            Einkommen = 0;
            Autos = new List<AutoEntry>();
            ShowAuto = false;
        }

        public int PersonId { get; set; }

        public string Vorname { get; set; }

        public string Nachname { get; set; }

        public decimal Einkommen { get; set; }

        public string Wohnort { get; set; }
        
        public List<AutoEntry> Autos { get; set; }

        //Properties für den View
        public bool ShowAuto { get; set; }

        public bool ShowAutoAddEntry { get; set; }
    }
}