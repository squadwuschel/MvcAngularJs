using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs1_3.Helper.Highcharts
{
    public class Chart
    {
        public Chart()
        {
            type = "bar";
            zoomType = string.Empty;
        }

        public string type { get; set; }

        public string zoomType { get; set; }
    }
}