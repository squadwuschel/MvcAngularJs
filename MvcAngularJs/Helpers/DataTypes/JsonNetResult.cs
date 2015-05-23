using System;
using System.Diagnostics;
using System.Globalization;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MvcAngularJs.Helpers.DataTypes
{
    /// <summary>
    /// Benutzerdefiniertes Json Result um z.B. Dezimalwerte Länderspezisch zurückzugeben
    /// http://yobriefca.se/blog/2010/11/20/better-json-serialisation-for-asp-dot-net-mvc/
    /// </summary>
    public class JsonNetResult : ActionResult
    {
        #region Konstruktor
        public JsonNetResult()
        {
        }

        public JsonNetResult(object data)
        {
            Data = data;
        }

        public JsonNetResult(object data, CultureInfo culture)
        {
            CultureInfo = culture;
            Data = data;
        }

        public JsonNetResult(object data, JsonSerializerSettings settings)
            : base()
        {
            Data = data;
            Settings = settings;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Die aktuellen Ländereinstellungen Default ist "De-de", z.B. für das Umwandeln
        /// von Dezimalzahlen notwendig
        /// </summary>
        public CultureInfo CultureInfo { get; set; }

        /// <summary>
        /// Gets or sets the serialiser settings
        /// </summary> 
        public JsonSerializerSettings Settings { get; set; }

        /// <summary>
        /// Gets or sets the encoding of the response
        /// </summary> 
        public Encoding ContentEncoding { get; set; }

        /// <summary>
        /// Gets or sets the content type for the response
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>Gets or sets the body of the response</summary> 
        public object Data { get; set; }

        /// <summary>
        /// Gets the formatting types depending on whether we are in debug mode
        /// </summary> 
        private Formatting Formatting
        {
            get
            {
                return Debugger.IsAttached ? Formatting.Indented : Formatting.None;
            }
        }
        #endregion

        #region Override
        /// <summary> 
        /// Serialises the response and writes it out to the response object 
        /// </summary> 
        /// <param name="context">The execution context</param> 
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = !string.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

            // set content encoding 
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }

            //Setzen der passenden Sprache
            if (CultureInfo == null)
            {
                CultureInfo = new CultureInfo("De-de");
            }

            if (Settings == null)
            {
                Settings = new JsonSerializerSettings();
                //Setzen der Standard Converter um z.B. bei Dezimalzahlen
                //statt "." eine "," als Seperator zu verwenden
                Settings.Converters.Add(new FormattedDecimalConverter(CultureInfo));
                //Den passenden Datetime Konverter einstellen
                //http://james.newtonking.com/archive/2009/02/20/good-date-times-with-json-net
                Settings.Converters.Add(new IsoDateTimeConverter());
                //Enum Converter einstellen, das nicht Int sondern der String versendet wird
                //Settings.Converters.Add(new StringEnumConverter());
            }

            if (Data != null)
            {
                JsonTextWriter writer = new JsonTextWriter(response.Output) { Formatting = Formatting };
                JsonSerializer serializer = JsonSerializer.Create(Settings);
                serializer.Converters.Add(new FormattedDecimalConverter(CultureInfo));

                serializer.Serialize(writer, Data);
                writer.Flush();
            }
        }
        #endregion
    }
}
