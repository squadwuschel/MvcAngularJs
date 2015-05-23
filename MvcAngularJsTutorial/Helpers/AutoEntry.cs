namespace MvcAngularJsTutorial.Helpers
{
    public class AutoEntry
    {
        public AutoEntry()
        {
            Kennzeichen = string.Empty;
            Marke = string.Empty;
            AutoId = 0;
        }

        public string Kennzeichen { get; set; }

        public string Marke { get; set; }

        public int AutoId { get; set; }
    }
}