using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs.Models
{
    public class PersonViewModel
    {
        public List<string> Jobs { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int Age { get; set; }

        public DateTime Birthdate { get; set; }

        public PersonViewModel()
        {
            Jobs = new List<string>();
            FirstName = string.Empty;
            LastName = string.Empty;
            Age = 0;
            Birthdate = DateTime.Now;
        }
    }
}