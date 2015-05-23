using System.Web.Optimization;

namespace MvcAngularJs1_3
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-animate.js",
                        "~/Scripts/angular-messages.js",
                        "~/Scripts/angular-sanitize.js",
                        "~/Scripts/angular-strap.js",
                        "~/Scripts/angular-strap.tpl.js",
                        "~/Scripts/angular-ui-router.js",
                        "~/Scripts/highcharts.js"
                        ));

            bundles.Add(new ScriptBundle("~/Angular/App").IncludeDirectory("~/ScriptsApp/", "*.js", true));
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap/myFile.css"));
        }
    }
}