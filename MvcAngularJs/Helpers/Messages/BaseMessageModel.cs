using System.Collections.Generic;

namespace MvcAngularJs.Helpers.Messages
{
    /// <summary>
    /// Abstrakte Basisklasse für die Models die mit Message arbeiten sollen.
    /// Diese Models müssen von diesem Basismodel erben.
    /// </summary>
    public abstract class BaseMessageModel
    {
        /// <summary>
        /// Liste der Messages, die ausgegeben werden soll
        /// Nach dem Namen dieses Properties wird in jedem Request auf der Webseite gesucht
        /// und wenn das Property vorhanden ist, dann werden die Messages ausgelesen und angezeigt!
        /// </summary>
        public List<Message> MessageList { get; set; }

        public BaseMessageModel()
        {
            MessageList = new List<Message>();
        }
    }
}