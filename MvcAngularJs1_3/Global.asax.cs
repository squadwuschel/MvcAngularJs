using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using MvcAngularJs1_3.Controllers;
using MvcAngularJsProxyBuilder;

namespace MvcAngularJs1_3
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

#if DEBUG
            //Die ProxyDateien werden nur im Debug Modus erstellt!
            List<Type> controllers = new List<Type>();
            controllers.Add(typeof(HomeController));
            AngularProxyBuilder builder = new AngularProxyBuilder(@"ScriptsApp\services");
            builder.StartBuildProcess(controllers);
#endif
        }
    }
}