namespace MvcAngularJs.Helpers.Messages
{
    /// <summary>
    /// Definition einer einzelnen Message
    /// </summary>
    public class Message
    {
        /// <summary>
        /// Der Messagetext der angezeigt werden soll
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Der MessageTyp als String (CSS Klassenname)
        /// </summary>
        public string Type
        {
            get { return MessageType.ToString(); }
        }

        /// <summary>
        /// Der MessageTyp - get ist Protected, damit dieser nicht mit im JSON Serealisiert wird.
        /// </summary>
        public MessageType MessageType { protected get; set; }
    }
}