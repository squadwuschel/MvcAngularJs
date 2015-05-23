using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using MvcAngularJs1_3.Helper.Highcharts;
using MvcAngularJs1_3.Models.Home;
using MvcAngularJs1_3.Models.Home.Helper;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJs1_3.Controllers
{
    public class HomeController : Controller
    {
       

        public ActionResult ModelBinderOhneWatch()
        {
            return View();
        }

        public ActionResult FormValidation()
        {
            return View();
        }

        public ActionResult HighCharts()
        {
            return View();
        }

        public ActionResult NgPattern()
        {
            return View();
        }

        public ActionResult DirectiveTests()
        {
            return View();
        }

        public ActionResult TemplateUrlTest()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Submenue()
        {
            return View("_HomeSubmenue");
        }

        #region Strap
        public ActionResult AngularStrapModal()
        {
            return View();
        }

        public ActionResult AngularStrapTestModal()
        {
            return View("_AngularStrapTestModal");
        }

        #endregion

        public JsonResult LoadTempratureChartData()
        {
            BasicHighChart chart = new BasicHighChart();

            var blubb= chart.Test();

            chart.chart.type = "line";
            chart.chart.zoomType = "x";
            chart.title.text = ".NET Generierte Daten";
            chart.subtitle.text = "chart subtitle";
            chart.legend.enabled = true;
            chart.xAxis = new { categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" } };
            chart.yAxis = new { title = new Title() { text = "Temperature (°C)" } };

            var series = new List<BasicSeries>();
            series.Add(new BasicSeries() { name = "Dresden", data = new List<double>() { 7.0, 4.3, 8.5, 7.7, 19.9, 22.4, 26.1, 31.0, 16.6, 15.2, 6.2, 4.3 } });
            series.Add(new BasicSeries() { name = "Hamburg", data = new List<double>() { 2.2, 7.2, 5.2, 8.3, 18.2, 24.4, 28.9, 32.6, 19.5, 13.8, 3.1, 5.3 } });
            series.Add(new BasicSeries() { name = "Berlin", data = new List<double>() { 5.0, 6.0, 2.8, 9.2, 16.9, 23.5, 29.1, 36.1, 15.2, 12.2, 5.7, 2.6 } });
            chart.series = series;

            return Json(chart, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadIllnessChartData()
        {
            BasicHighChart chart = new BasicHighChart();
            chart.chart.type = "line";
            chart.chart.zoomType = "x";
            chart.title.text = ".NET Generierte Daten";
            chart.subtitle.text = "chart subtitle";
            chart.legend.enabled = true;
            chart.xAxis = new { title= new Title() { text = "Krankheitstage"} };
            chart.yAxis = new { title = new Title() { text = "Alter" } };

            var series = new List<PointSeries>();
            series.Add(new PointSeries() { name = "Bert", data = new List<object[]>() { new object[] { 23, 2 }, new object[] { 24, 5 }, new object[] { 25, 8 }, new object[] { 26, 5 }, new object[] { 27, 1 } } });
            series.Add(new PointSeries() { name = "Hugo", data = new List<object[]>() { new object[] { 23, 8 }, new object[] { 24, 5 }, new object[] { 25, 3 }, new object[] { 26, 4 }, new object[] { 27, 2 } } });
            series.Add(new PointSeries() { name = "Gert", data = new List<object[]>() { new object[] { 23, 1 }, new object[] { 24, 1 }, new object[] { 25, 2 }, new object[] { 26, 5 }, new object[] { 27, 7 }, new object[] { 28, 2 } } });
            chart.series = series;

            return Json(chart, JsonRequestBehavior.AllowGet);
        }

        #region UnitTests Jasmine
        public static List<PersonEntry> PersonEntries = new List<PersonEntry>();

        [AngularCreateProxy]
        public JsonResult InitUnitTestPersonEntry()
        {
            return Json(new PersonEntry(), JsonRequestBehavior.AllowGet);
        }
    
        [AngularCreateProxy]
        public JsonResult InitUnitTestSearchModel()
        {
            PersonSearchModel searchModel = new PersonSearchModel() {Name = string.Empty};
            return Json(searchModel, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult UnitTestResultModel(PersonSearchModel searchModel)
        {
            PersonResultModel resultModel = new PersonResultModel();
            if (!string.IsNullOrEmpty(searchModel.Name))
            {
                resultModel.Entries.AddRange(PersonEntries.Where(p => p.FirstName.Contains(searchModel.Name) || p.LastName.Contains(searchModel.Name)));
            }
            else
            {
                resultModel.Entries.AddRange(PersonEntries);
            }

            return Json(resultModel, JsonRequestBehavior.AllowGet);
        }

        [AngularCreateProxy]
        public JsonResult AddUnitTestPerson(PersonEntry entry)
        {
            PersonEntries.Add(entry);
            return Json(entry, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UnitTests()
        {
            PersonEntries = new List<PersonEntry>();
            PersonEntries.Add(new PersonEntry() { Age = 23, FirstName = "Jürgen", Id = 1, IsAlive = true, LastName = "Pest"});
            PersonEntries.Add(new PersonEntry() { Age = 35, FirstName = "Otto", Id = 2, IsAlive = true, LastName = "Werner"});
            PersonEntries.Add(new PersonEntry() { Age = 87, FirstName = "Johann", Id = 3, IsAlive = false, LastName = "Torf"});
            
            return View();
        }
        #endregion
    }
}
