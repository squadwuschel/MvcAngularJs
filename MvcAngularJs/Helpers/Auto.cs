using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs.Helpers
{
    public class Auto
    {
        public string Name { get; set; }

        public string AutoTyp { get; set; }

        public int Price { get; set; }

        public List<Kennzeichen> Kennzeichen { get; set; }
    }
}