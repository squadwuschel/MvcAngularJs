using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAngularJs1_3.Helper.Highcharts
{
    public class Legend
    {
        public Legend()
        {
            enabled = true;
            borderWidth = 0;
            layout = "vertical";
            align = "right";
            verticalAlign = "middle";
        }

        public bool enabled { get; set; }

        public string layout { get; set; }

        public string align { get; set; }

        public string verticalAlign { get; set; }

        public int borderWidth { get; set; }
    }
}