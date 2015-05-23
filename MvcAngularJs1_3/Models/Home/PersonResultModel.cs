using System.Collections.Generic;
using MvcAngularJs1_3.Models.Home.Helper;

namespace MvcAngularJs1_3.Models.Home
{
    public class PersonResultModel
    {
        public PersonResultModel()
        {
            Entries = new List<PersonEntry>();
        }

        public List<PersonEntry> Entries { get; set; }

    }
}