function TestDataProxyCtrl($log, $scope, angularProxyPSrv) {

    angularProxyPSrv.TestDatenOne("Meier Max + Großeltern", 2312).then(function (data) {
        $scope.TestDataOne_1 = data;
    });

    angularProxyPSrv.TestDatenOne("Karl der Große Übermann", 1223).then(function (data) {
        $scope.TestDataOne_2 = data;
    });

    //Wenn man ein Datum per GET übergeben will, dann muss dieses zwingen dermaßen im Folgenden Format übertragen werden:
    //yyyy-MM-dd
    //http://stackoverflow.com/questions/8910482/passing-a-datetime-to-controller-via-url-causing-error-in-asp-net-mvc-3-cultur
    angularProxyPSrv.TestDatenTwo(124334, "Meier Fritz", 12, "2014-03-21").then(function (data) {
        $scope.TestDataTwo_1 = data;
    });

    //Abrufen der Passenden .NET Objekte
    angularProxyPSrv.TestDatenObjectOne("Karl der Große").then(function (data) {
        $scope.TestDataObjectOne_1 = data;
        //wieder senden der passenden .NET Objekte
        angularProxyPSrv.TestDatenObjectTwo(12, JSON.stringify(data)).then(function (daten) {
            $scope.TestDataObjectTwo_1 = daten;
        });
    });

    //Abrufen der Passenden .NET Objekte
    angularProxyPSrv.TestDatenObjectPerson("nur Pers").then(function (data) {
        $scope.TestDataObjectPerson_1 = data;
        //wieder senden der passenden .NET Objekte
        angularProxyPSrv.TestDatenObjectPersonSichernOne(12, data).then(function (daten) {
            $scope.TestDataObjectPerson_2 = daten;
        });

        angularProxyPSrv.TestDatenObjectPersonSichernTwo(data).then(function (daten) {
            $scope.TestDataObjectPerson_3 = daten;
        });
    });

    $log.log($scope);

}

angular.module("app.testDataProxyCtrl", ["app.angularProxyPSrv"])
    .controller("testDataProxyCtrl", TestDataProxyCtrl);