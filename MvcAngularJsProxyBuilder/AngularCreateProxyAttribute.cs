using System;

namespace MvcAngularJsProxyBuilder
{
    /// <summary>
    /// Dieses Attribut dient aktuell nur dem Markieren von Funktionen die in 
    /// eine JavaScript Proxy Funktion umgewandelt werden sollen.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class AngularCreateProxyAttribute : Attribute
    {

    }
}
