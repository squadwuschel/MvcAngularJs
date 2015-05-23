using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using MvcAngularJsDefaultTemplate.Controllers;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJsDefaultTemplate
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            List<Type> ctrl = new List<Type>();
            ctrl.Add(typeof(AccountController));
            ctrl.Add(typeof(HomeController));

            AngularProxyBuilder builder = new AngularProxyBuilder("ScriptsApp/services/");
          //  builder.StartBuildProcess(ctrl);
        }
    }
}
