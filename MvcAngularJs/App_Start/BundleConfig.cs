using System.Web;
using System.Web.Optimization;

namespace MvcAngularJs
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/angular.js",
                        "~/Scripts/moment.js",
                        "~/Scripts/deb.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/i18n/angular-locale_de-de.js",
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.js"
                        )); // Für Deutsches Zahlenformat und CO die passende Locale einbinden

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/font-awesome.min.css",
                "~/Content/xeditable.css",
                "~/Content/select.directives.css",
                "~/Content/site.css"));
     
        }
    }
}