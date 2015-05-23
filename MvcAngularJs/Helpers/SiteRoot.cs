using System.Web;
using System.Web.Mvc;

namespace MvcAngularJs.Helpers
{
    public static class SiteRoot
    {
        public static string GetSiteRoot()
        {
            var cnt = new UrlHelper(HttpContext.Current.Request.RequestContext);
            return string.Format("{0}://{1}{2}", (object)HttpContext.Current.Request.Url.Scheme, 
                                                 (object)HttpContext.Current.Request.Url.Authority, 
                                                 (object)cnt.Content("~"));
        }
    }
}