using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;

namespace MvcAngularJs.Helpers.Messages
{
    public class MyErrorHandlerAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            //http://stackoverflow.com/questions/8144695/asp-net-mvc-custom-handleerror-filter-specify-view-based-on-exception-type

            var list = new List<Message>();
            list.Add(new Message() { MessageType = MessageType.danger, Text = filterContext.Exception.Message });

            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            filterContext.Result = new JsonResult
            {
                Data = new EmptyMessages() { MessageList = list },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}