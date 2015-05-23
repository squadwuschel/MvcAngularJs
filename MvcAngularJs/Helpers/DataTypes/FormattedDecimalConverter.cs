using System;
using System.Globalization;
using Newtonsoft.Json;

namespace MvcAngularJs.Helpers.DataTypes
{
    /// <summary>
    /// Benutzerdefinierter Converter für Dezimalzahlen, damit man je nach Sprache die passenden Trennzeichen verwendet werden können.
    /// </summary>
    class FormattedDecimalConverter : JsonConverter
    {
        private CultureInfo culture;

        public FormattedDecimalConverter(CultureInfo culture)
        {
            if (culture == null)
            {
                culture = new CultureInfo("De-de");
            }

            this.culture = culture;
        }

        public override bool CanConvert(Type objectType)
        {
            return (objectType == typeof(decimal) ||
                    objectType == typeof(double) ||
                    objectType == typeof(float));
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(Convert.ToString(value, culture));
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}