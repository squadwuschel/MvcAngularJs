using System.Security.Policy;
using System.Web;
using System.Web.Mvc;

namespace MvcAngularJs
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}