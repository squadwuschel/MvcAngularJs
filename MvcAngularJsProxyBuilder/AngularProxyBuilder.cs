using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MvcAngularJsProxyBuilder
{
    /// <summary>
    /// TODOs:
    /// - Method Overloading für JavaScript einbinden - aktuell wird eine Exception geworfen, wenn zwei Methoden mit dem gleichen Namen existieren
    /// </summary>
    public class AngularProxyBuilder
    {
        #region Member
        /// <summary>
        /// Das Relative Ausgabeverzeichnis in der aktuellen Projektstruktur
        /// </summary>
        public string OutputDirectory { get; set; }
        #endregion

        #region Konstruktor
        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="outputDirectory">Das Ausgabeverzeichnis im aktuellen Webprojekt, z.B. "JavaScript/AngularSrv"</param>
        public AngularProxyBuilder(string outputDirectory)
        {
            OutputDirectory = outputDirectory;
        }
        #endregion

        #region Public functions
        /// <summary>
        /// Erstellen der passenden Proxy Klassen für die Controller
        /// </summary>
        /// <param name="controller">Liste mit Controllern für die Proxy Klassen erstellt werden sollen</param>
        public void StartBuildProcess(List<Type> controller)
        {
            //Alle übergebene Typen durchgehen
            foreach (Type type in controller)
            {
                //Prüfen ob der Controller direkt von Controller ableitet oder eine andere Basisklasse hat, die von Controller ableitet.
                if (type.IsSubclassOf(typeof(Controller)) || type == typeof(Controller))
                {
                    //Alle Methoden ermitteln für die ein Proxy erstellt werden soll.
                    List<MethodInfo> methods = GetControllerMethodsWithCreateProxyAttribute(type);
                    //Für den jeweiligen Controller dann den JavaScriptProxy erstellen.
                    BuildJavaScriptProxyFiles(methods, type);
                }
            }
        }
        #endregion

        #region Private functions
        /// <summary>
        /// Zusammenbauen/erstellen des JavaScripProxies
        /// </summary>
        private void BuildJavaScriptProxyFiles(List<MethodInfo> methodInfos, Type controller)
        {
            //Wenn keine Methoden übergeben wurden, kann auch keine Proxyklasse erstellt werden
            if (!methodInfos.Any())
            {
                return;
            }

            //Den Funktionsnamen/Modulnamen für unser Modul ermitteln, z.B. "HomePSrv"
            string javaScriptSrvName = GetJavaScriptModuleName(controller);

            StringBuilder builder = new StringBuilder();
            //Beschriftung einfügen das es sich um ein automatisch generiertes Dokument handelt.
            builder.Append(string.Format(AngularProxyTemplates.AutomaticlyCreated, DateTime.Now.ToShortDateString(), DateTime.Now.ToLongTimeString(), Environment.UserName));
            builder.Append(Environment.NewLine).Append(Environment.NewLine);

            //unsere Funktionsdefinition zusammenbauen und einfüge, z.B. "function HomePSrv($http, $log) { ..."
            builder.Append(string.Format(AngularProxyTemplates.ServerFunctionDefinition, javaScriptSrvName));
            builder.Append(Environment.NewLine).Append(Environment.NewLine);

            //Alle Methoden durchgehen und die entsprechenden Parameter ermitteln und den passenden
            //POST bzw. GET Aufruf zusammenbauen als Prototypefunktion für unsere Funktion.
            foreach (MethodInfo info in methodInfos)
            {
                string methodName = info.Name;
                string functionParameters = GetFunctionParameters(info);
                string methodCall = BuildHttpCall(info, controller);

                //Unseren jeweiligen Methodenaufruf zusammenbauen ob POST oder GET
                string fctCall = string.Format(AngularProxyTemplates.BasicSuccessServerCall,
                    javaScriptSrvName, methodName, functionParameters, methodCall);
                builder.Append(fctCall).Append(Environment.NewLine).Append(Environment.NewLine);
            }

            //Unsere ModulDefinition hinzufügen, z.B. 'angular.module("app.HomePSrv", []).service("HomePSrv", HomePSrv);'
            builder.Append(string.Format(AngularProxyTemplates.ModuleDefinition, javaScriptSrvName));

            string proxy = builder.ToString();
            //Die Proxy Dateien ins Dateisystem schreiben
            SaveProxy(proxy, string.Format(@"{0}.js", javaScriptSrvName));
        }


        /// <summary>
        /// Ablegen der Dateien im DateiSystem
        /// </summary>
        /// <param name="fileContent">Inhalt der Datei als String (JavaScript)</param>
        /// <param name="fileName">Der Name der Datei</param>
        private void SaveProxy(string fileContent, string fileName)
        {
            //Prüfen ob ein Ausgabeverzeichnis angegeben wurde.
            if (string.IsNullOrEmpty(OutputDirectory))
            {
                //Wenn nicht das StandardAusgabeverzeichnsi für JavaScript wählen.
                OutputDirectory = "Scripts";
            }

            string path = HttpContext.Current.Server.MapPath(OutputDirectory);
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path);
            }

            string completePath = System.IO.Path.Combine(path, fileName);
            System.IO.File.WriteAllText(completePath, fileContent);
        }


        /// <summary>
        /// Sucht einfach nur die Parameternamen der aktuell übergebenen Methode heraus
        /// </summary>
        private string GetFunctionParameters(MethodInfo methodInfo)
        {
            StringBuilder builder = new StringBuilder();
            //Zusammenbauen der PrameterInfos für die übergebene Methode.
            foreach (ParameterInfo info in methodInfo.GetParameters())
            {
                builder.Append(info.Name).Append(",");
            }

            return builder.ToString().TrimEnd(',');
        }

        /// <summary>
        /// Den passenden HttpCall zusammenbauen und prüfen ob Post oder Get verwendet werden soll
        /// </summary>
        private string BuildHttpCall(MethodInfo methodInfo, Type controller)
        {
            //Wie genau das Post oder Geht aussieht, hängt von den gewünschten Parametern ab.
            //Aktuell gehen wir von einer StandardRoute aus und wenn ein "id" in den Parametern ist, dann
            //Handelt es sich z.B. um den Letzten Parameter in der StandardRoute.
            //Beispiele:
            //.post("/Home/GetAutosByHerstellerId/" + id, message)
            //.post("/ControllerName/GetAutosByHerstellerId/", message)
            //get("/Home/GetSuccessMessage")
            //get("/Home/GetSuccessMessage/" + id + "?name=" + urlencodestring + "&test=2")

            //Alle ParameterInfos für uns "Aufarbeiten" zur besseren Auswertung
            List<ProxyParameterInfos> infos = GetMethodParameterInfos(methodInfo);
            StringBuilder builder = new StringBuilder();
            //Prüfen ob ein complexer Typ verwendet wird.
            if (infos.Count(p => p.IsComplexeType) == 0)
            {
                //Keine Komplexen Typen, einfacher Get Aufruf.
                builder.Append(string.Format("get('/{0}/{1}'", GetClearControllerName(controller), methodInfo.Name));
                builder.Append(BuildUrlParameterId(infos));
                builder.Append(BuildUrlParameter(infos));
                builder.Append(")");
            }
            else
            {
                builder.Append(string.Format("post('/{0}/{1}'", GetClearControllerName(controller), methodInfo.Name));
                builder.Append(BuildUrlParameterId(infos));
                builder.Append(BuildUrlParameter(infos));
                builder.Append(string.Format(",{0})", infos.First(p => p.IsComplexeType).Name));
            }

            return builder.ToString();
        }

        /// <summary>
        /// Prüfen ob eine Id enthalten ist, diese wird extra an die URL angehängt.
        /// </summary>
        private string BuildUrlParameterId(List<ProxyParameterInfos> infos)
        {
            StringBuilder builder = new StringBuilder();
            //ACHTUNG der Wert mit dem Namen "id" wird direkt an die URL angehängt und nicht als Extra Parameter verwendet
            if (infos.Any(p => p.Name.ToLower() == "id"))
            {
                builder.Append(" + '/' + ").Append(infos.FirstOrDefault(p => p.Name.ToLower() == "id").Name);
            }

            return builder.ToString();
        }

        /// <summary>
        /// Zusammenbauen der passenden URL Parameter ACHTUNG der UrlParameterName entspricht 
        /// auch dem gleichen Namen wie der Parameter der gesetzt wird.
        /// </summary>
        /// <param name="infos">List mit den Typen die als URL Parameter angelegt werden sollen.</param>
        private string BuildUrlParameter(List<ProxyParameterInfos> infos)
        {
            StringBuilder builder = new StringBuilder();
            var allowedInfos = infos.Where(p => !p.IsComplexeType && p.Name.ToLower() != "id");
            if (allowedInfos.Any())
            {
                builder.Append("+ '?");
            }

            bool isFirst = true;

            foreach (ProxyParameterInfos info in allowedInfos)
            {
                //Prüfen ob es sich um einen String handelt der übergeben werden soll,
                //wenn ja wird dieser Url Encoded damit z.B. auch "+" Zeichen übermittelt werden
                string paramValue = info.IsString ? string.Format("encodeURIComponent({0})", info.Name) : info.Name;

                if (isFirst)
                {
                    builder.Append(string.Format("{0}='+{1}", info.Name, paramValue));
                    isFirst = false;
                }
                else
                {
                    builder.Append(string.Format("+'&{0}='+{1}", info.Name, paramValue));
                }
            }

            return builder.ToString();
        }

        /// <summary>
        /// Prüfen ob in den ParameterInfos für die Funkion ein Komplexer Typ enthalten ist.
        /// d.h. eigene Objekte wie "Person" denn diese müssen per Post übergeben werden.
        /// Es wird eine Exception geworfen, sollten mehr wie ein Complexer Typ enthalten sein.
        /// </summary>
        /// <returns>Gibt eine Liste mit ProxyParameterInfos zurück um später die Parameter einfacher zusammenbauen zu können</returns>
        private List<ProxyParameterInfos> GetMethodParameterInfos(MethodInfo methodInfo)
        {
            List<ProxyParameterInfos> customInfos = new List<ProxyParameterInfos>();

            //Alle Parameter der Jeweiligen Controller Methode durchgehen und prüfen um was für eine Art Parameter es sich handelt.
            foreach (ParameterInfo info in methodInfo.GetParameters())
            {
                Type t = info.ParameterType;

                if (t.IsPrimitive || t == typeof(Decimal) || t == typeof(String) || t == typeof(DateTime) || t == typeof(Int16) ||
                    t == typeof(Int32) || t == typeof(Int64) || t == typeof(Boolean) || t == typeof(TimeSpan) ||
                    t == typeof(Decimal?) || t == typeof(DateTime?) || t == typeof(Int16?) ||
                    t == typeof(Int32?) || t == typeof(Int64?) || t == typeof(Boolean?) || t == typeof(TimeSpan?))
                {
                    customInfos.Add(new ProxyParameterInfos() { IsComplexeType = false, Name = info.Name, ParameterInfo = info, IsString = t == typeof(String) });
                }
                else
                {
                    customInfos.Add(new ProxyParameterInfos() { IsComplexeType = true, Name = info.Name, ParameterInfo = info, IsString = false });
                }
            }

            //Es darf nur ein "komplexer" Parameter pro Controller "übergeben" werden.
            if (customInfos.Count(p => p.IsComplexeType) > 1)
            {
                throw new Exception("Achtung mehr wie einen 'komplexen' Parameter entdeckt.");
            }

            //Wenn die Liste leer ist, gibt es keine Parameter!
            return customInfos;
        }

        /// <summary>
        /// Ermittelt den Namen des JavaScript Modules (Service)
        /// </summary>
        private string GetJavaScriptModuleName(Type controller)
        {
            string name = GetClearControllerName(controller);
            //Den Ersten Buchstaben klein schreiben!
            return string.Format("{0}PSrv", Char.ToLowerInvariant(name[0]) + name.Substring(1));
        }

        /// <summary>
        /// Ermittelt den Namen des Controller ohne die Endung "Controller",
        /// da wir diese nie mit angeben müssen.
        /// </summary>
        private string GetClearControllerName(Type controller)
        {
            string name = controller.Name;
            return name.Substring(0, name.LastIndexOf("Controller"));
        }

        /// <summary>
        /// Prüfen der Controllermethoden auf unser Custom Attribut und eine Liste mit den
        /// MethodenInfos zurückgeben bei denen das Attribut gesetzt ist.
        /// </summary>
        private List<MethodInfo> GetControllerMethodsWithCreateProxyAttribute(Type type)
        {
            List<MethodInfo> methodInfos = new List<MethodInfo>();

            //Alle Methoden durchgehen, denn nur die wo auch das Attribut gesetzt ist,
            //darf als JavaScript Funktion erstellt werden
            foreach (MethodInfo info in type.GetMethods())
            {
                if (methodInfos.Any(p => p.Name == info.Name))
                {
                    throw new Exception(string.Format("Achtung, da JavaScript keine Überladung von Methoden unterstützt, bitte eine der Methoden '{0}' umbenennen", info.Name));
                }

                //Alle die MethodenInfos ermitteln, die auch das passenden "AngularCreateProxy" Attribute haben.
                methodInfos.AddRange(from attribute in info.GetCustomAttributes(true) where attribute.GetType() == typeof(AngularCreateProxyAttribute) select info);
            }

            return methodInfos;
        }
        #endregion
    }
}
