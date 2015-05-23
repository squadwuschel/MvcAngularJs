using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs1_3.Helper.Highcharts
{
    public class BasicHighChart
    {
       public BasicHighChart()
        {
            title = new Title();
            subtitle = new Title();
            chart = new Chart();
            legend = new Legend();
        }

        public int Test()
        {
            return 24*24;
        }

        public Title title { get; set; }

        public Title subtitle { get; set; }

        public Chart chart { get; set; }

        public Legend legend { get; set; }

        public dynamic xAxis { get; set; }

        public dynamic yAxis { get; set; }

        public dynamic series { get; set; }
    }
}