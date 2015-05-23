function indexCtrl($log, $scope, homePSrv) {

    //Auf dem Scope ein Personen Objekt anlegen
    $scope.person = {};
    $scope.person.firstname = "Squad";
    $scope.person.lastname = "Wuschel";
    $scope.person.age = 2;
    $scope.person.birthdate = "01.01.2014";
        
    $scope.loadData = function() {
        //Vom Controller das die passende Personenliste abrufen
        homePSrv.GetDashboardPersons().then(function (data) {
            $scope.personList = data;
        });
    }
    
    
    
    $scope.listenFilter = "Ütz";
}

angular.module("indexCtrl", ["homePSrv"])
    .controller("indexCtrl", indexCtrl);