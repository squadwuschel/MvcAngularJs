using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs1_3.Helper.Highcharts
{
    public class PointSeries
    {
           public PointSeries()
        {
            data = new List<object[]>();
               name = string.Empty;
        }

           public string name { get; set; }

        public List<object[]> data { get; set; }
    }
}