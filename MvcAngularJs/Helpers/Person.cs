using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs.Helpers
{
    public class Person
    {
        public string Name { get; set; }

        public string Vorname { get; set; }

        public List<Auto> Namen { get; set; }

        public Person()
        {
            Namen = new List<Auto>();
        }
    }
}