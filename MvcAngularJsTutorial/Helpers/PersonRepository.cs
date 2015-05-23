using System.Collections.Generic;
using System.Linq;

namespace MvcAngularJsTutorial.Helpers
{
    public class PersonRepository
    {
        #region Static Content
        private static PersonRepository _personRepository;

        public static PersonRepository Persons
        {
            get
            {
                if (_personRepository == null)
                {
                    _personRepository = new PersonRepository();
                }

                return _personRepository;
            }
        }
        #endregion

        #region Member
        public List<PersonEntry> Personen { get; set; }

        private int AutoIdCount = 0;
        private int PersonIdCount = 0;

        #endregion

        #region Konstruktor
        private PersonRepository()
        {
            Personen = new List<PersonEntry>();
            Personen.Add(new PersonEntry() { Autos = new List<AutoEntry>() { new AutoEntry() { AutoId = AutoIdCount++, Kennzeichen = "DD-ER-666", Marke = "Skoda" } }, Einkommen = 2500, Nachname = "Rudolf", Vorname = "Fritz", PersonId = PersonIdCount++, Wohnort = "Dresden" });
            Personen.Add(new PersonEntry() { Autos = new List<AutoEntry>() { new AutoEntry() { AutoId = AutoIdCount++, Kennzeichen = "HH-IT-15", Marke = "VW" } }, Einkommen = 2500, Nachname = "Bernhardt", Vorname = "Brink", PersonId = PersonIdCount++, Wohnort = "Hamburg" });
            Personen.Add(new PersonEntry() { Autos = new List<AutoEntry>() { new AutoEntry() { AutoId = AutoIdCount++, Kennzeichen = "AU-RT-198", Marke = "BMW" } }, Einkommen = 2500, Nachname = "Berentz", Vorname = "Heinz", PersonId = PersonIdCount++, Wohnort = "Lauter" });
            Personen.Add(new PersonEntry() { Autos = new List<AutoEntry>() { new AutoEntry() { AutoId = AutoIdCount++, Kennzeichen = "DD-RE-32", Marke = "Fiat" } }, Einkommen = 2500, Nachname = "Hetzner", Vorname = "Karl", PersonId = PersonIdCount++, Wohnort = "Dresden" });
        }
        #endregion

        #region Public Functions

        public List<PersonEntry> GetAllPersons()
        {
            return Personen;
        }

        public void AddPerson(PersonEntry person)
        {
            person.PersonId = PersonIdCount++;
            Personen.Add(person);
        }

        public void AddAuto(int personId, AutoEntry auto)
        {
            var person = Personen.FirstOrDefault(p => p.PersonId == personId);
            if (person != null)
            {
                foreach (PersonEntry entry in Personen)
                {
                    entry.ShowAuto = false;
                }
                
                auto.AutoId = AutoIdCount++;
                person.ShowAuto = true;
                person.Autos.Add(auto);
            }
        }



        public void DeletePerson(int personId)
        {
            var person = Personen.FirstOrDefault(p => p.PersonId == personId);
            if (person != null)
            {
                Personen.Remove(person);
            }
        }

        public void DeleteAuto(int autoId)
        {
            var pers = Personen.FirstOrDefault(p => p.Autos.Any(k => k.AutoId == autoId));
            if (pers != null)
            {
                var auto = pers.Autos.FirstOrDefault(p => p.AutoId == autoId);
                if (auto != null)
                {
                    pers.Autos.Remove(auto);
                }
            }
        }
        #endregion
    }
}