using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs1_3.Helper.Highcharts
{
    public class BasicSeries
    {
        public BasicSeries()
        {
            name = string.Empty;
            data = new List<double>();
        }


        public string name { get; set; }

        public List<double> data { get; set; }

    }
}