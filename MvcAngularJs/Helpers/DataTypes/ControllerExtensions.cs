using System.Globalization;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace MvcAngularJs.Helpers.DataTypes
{
    /// <summary>
    /// Controller Extensions um einfacher auf unser Custom JsonResult zugreifen zu können.
    /// </summary>
    public static class ControllerExtensions
    {
        /// <summary>
        /// Umwandeln der übergebenen Daten in ein passenden JSON Objekt.
        /// </summary>
        /// <param name="data">Die Daten die umgewandelt werden sollen</param>
        public static JsonNetResult JsonEx(this Controller controller, object data)
        {
            return new JsonNetResult(data);
        }

        /// <summary>
        /// Umwandeln der übergebenen Daten in ein passenden JSON Objekt.
        /// </summary>
        /// <param name="data">Die Daten die umgewandelt werden sollen</param>
        /// <param name="culture">Die Länderinformationen die bei der Umwandlung verwendet werden sollen</param>
        public static JsonNetResult JsonEx(this Controller controller, object data, CultureInfo culture)
        {
            return new JsonNetResult(data, culture);
        }

        /// <summary>
        /// Umwandeln der übergebenen Daten in ein passenden JSON Objekt.
        /// </summary>
        /// <param name="data">Die Daten die umgewandelt werden sollen</param>
        /// <param name="settings">Die Serializer Settings die man hier Individuell angeben kann</param>
        public static JsonNetResult JsonEx(this Controller controller, object data, JsonSerializerSettings settings)
        {
            return new JsonNetResult(data, settings);
        }
    }
}