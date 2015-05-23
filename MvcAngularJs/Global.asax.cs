using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using MvcAngularJs.Controllers;
using MvcAngularJs.Helpers;
using MvcAngularJsProxyBuilder;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MvcAngularJs
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
            controllers.Add(typeof(AngularProxyController));

            AngularProxyBuilder builder = new AngularProxyBuilder(@"ScriptsAngular\srv");
            builder.StartBuildProcess(controllers);
#endif

            //Remove and JsonValueProviderFactory and add JsonDotNetValueProviderFactory
            //ValueProviderFactories.Factories.Remove(ValueProviderFactories.Factories.OfType<JsonValueProviderFactory>().FirstOrDefault());
            //ValueProviderFactories.Factories.Add(new JsonDotNetValueProviderFactory());

        }
    }
}