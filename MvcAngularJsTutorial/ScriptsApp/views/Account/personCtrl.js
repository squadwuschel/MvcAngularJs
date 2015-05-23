function personCtrl($log, $scope, accountSrv) {
    $log.log("personCtrl initialisiert");
    $scope.ModelData = {};
    $scope.ViewData = {};
    $scope.Fct = {};
    $scope.Locals = {};

    //Funktionen definieren
    //Ein "leeres" Auto Model vom Server holen
    $scope.Fct.GetClearAutoModel = function () {
       return accountSrv.GetAutModelData().then(function (data) {
            $scope.ModelData.Auto = data;
        });
    }

    //Ein "leeres" Personen Model vom Server holen
    $scope.Fct.GetClearPersonModel = function() {
        accountSrv.GetPersonModelData().then(function (data) {
            $scope.ModelData.Person = data;
        });
    }

    //Eine Person zur Liste hinzufügen
    $scope.Fct.AddPerson = function() {
        accountSrv.AddPerson($scope.ModelData.Person).then(function (data) {
            $scope.ViewData = data;
            $scope.Fct.GetClearPersonModel();
        });
    }
    
    //Ein Auto zur Liste hinzufügen
    $scope.Fct.AddAuto = function (personId) {
        accountSrv.AddAuto($scope.ModelData.Auto, personId).then(function (data) {
            $scope.ViewData = data;
        });
    }

    //Die Person mit der übergebenen Id löschen
    $scope.Fct.DeletePerson = function(personId) {
        accountSrv.DeletePerson(personId).then(function (data) {
            $scope.ViewData = data;
        });
    }

    //Das Auto mit der übergebenen Id löschen
    $scope.Fct.DeleteAuto = function (autoId) {
        accountSrv.DeleteAuto(autoId).then(function (data) {
            $scope.ViewData = data;
        });
    }

    //Logik die ausgeführt, wird wenn man die Formulardaten anzeigen will
    //wenn man ein neues Auto hinzufügen will
    $scope.Fct.OpenAutoEdit = function (personItem) {
        var show = !personItem.ShowAutoAddEntry;
        //Alle anderen Bearbeiteneinträge schließen!
        for (var i = 0; i < $scope.ViewData.length; i++) {
            $scope.ViewData[i].ShowAutoAddEntry = false;
        }

        $scope.Fct.GetClearAutoModel().then(function() {
            personItem.ShowAutoAddEntry = show;
        });
    }

    //Gibt an ob der Button zum Hinzufügen einer neuen Person aktiviert oder deaktiviert ist.
    $scope.Fct.IsAddPersonDisabled = function() {
        if ($scope.ModelData.Person !== undefined) {
            var pers = $scope.ModelData.Person;
            if (pers.Vorname.length > 0 && pers.Nachname.length > 0 && pers.Wohnort.length > 0 && pers.Einkommen > 0) {
                return false;
            }
        }
            return true;
    }
    
    //Gibt an ob der Button zum anlegen eines neuen Autos aktiviert oder deaktiviert ist.
    $scope.Fct.IsAddAutoDisabled = function () {
        if ($scope.ModelData.Auto !== undefined) {
            var auto = $scope.ModelData.Auto;
            if (auto.Kennzeichen.length > 0 && auto.Marke.length > 0) {
                return false;
            }
        }
        return true;
    }



    //Init
    $scope.Fct.GetClearAutoModel();
    $scope.Fct.GetClearPersonModel();

    //Abrufen unserer Listendaten für alle Personen
    accountSrv.GetAllPersons().then(function (data) {
        $scope.ViewData = data;
    });
}

angular.module("personCtrl", ["accountSrv"])
    .controller("personCtrl", personCtrl);

