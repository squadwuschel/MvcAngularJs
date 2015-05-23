//ACHTUNG unter Chrome mit dem Plugin Batarang - verhindert das "::" One Time binding funktioniert
//kann z.b. auch für CSS Klassen verwendet werden die nur einmal zusammengebaut werden

angular.module("ModelBinderOhneWatchCtrl", [])
//https://docs.angularjs.org/guide/production#disabling-debug-data
//DebugInfos fürLive Version deaktivieren
.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}])

.controller("ModelBinderOhneWatchCtrl", ["$scope", function ($scope) {
    $scope.Name = "Squad";
    $scope.Vorname = "Wuschel";
    $scope.persons = [{ Name: 'Squad', Vorname: 'Wuschel' }, { Name: 'Master', Vorname: 'Mind' }, { Name: 'Mega', Vorname: 'Cool' }, { Name: 'Total', Vorname: 'Toll' }];

    $scope.Fct = {};
    $scope.Fct.AddPerson = function () {
        $scope.persons.push({ Name: 'Neues', Vorname: 'Element' });
    }

    $scope.anzeigen1 = true;
    $scope.anzeigen2 = true;
    $scope.Fct.HideDiv = function () {
        $scope.anzeigen2 = false;
    }
}]);