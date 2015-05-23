using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs.Helpers
{
    public class AutoHersteller
    {
        public int Id { get; set; }

        public string Hersteller { get; set; }

        public string Land { get; set; }

        public int AnzMitarbeiter { get; set; }

        public List<Autos> AutoTypen { get; set; }
    }
}