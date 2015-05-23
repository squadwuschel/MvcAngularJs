using MvcAngularJs.Helpers.Messages;

namespace MvcAngularJs.Helpers
{
    public class Autos : BaseMessageModel
    {
        public string Name { get; set; }

        public int Price { get; set; }

        public int LieferzeitInWochen { get; set; }
    }
}