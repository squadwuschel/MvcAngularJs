using System;

namespace MvcAngularJs.Helpers
{
    public class ValidationDataModel
    {
        public int BenutzerLevel { get; set; }
        public string Email { get; set; }
        public string Vorname { get; set; }
        public int Alter { get; set; }
        public decimal Gehalt { get; set; }
        public DateTime Startdatum { get; set; }
        public DateTime Enddatum { get; set; }
        public string Passwort { get; set; }
        public string PasswortCheck { get; set; }
        public bool RememberLogin { get; set; }

        public ValidationDataModel()
        {
            BenutzerLevel = -1;
            Email = string.Empty;
            Alter = 0;
            Gehalt = 0;
            Startdatum = DateTime.Now.AddDays(-7);
            Enddatum = DateTime.Now.AddYears(1);
            Passwort = string.Empty;
            RememberLogin = true;
        }
    }
}