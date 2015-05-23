function TableCtrl($log, $scope, tableSrv) {
    var that = this, scope = $scope, log = $log;

    //Laden unserer Herstellerliste
    tableSrv.getAutoHersteller().then(function (data) {
        log.log("Autohersteller geladen: ");
        //Die Herstellerliste dem Scope zuweisen.
        scope.Hersteller = data;
    });

    //Die passenden Autos für den ausgewählten Hersteller laden.
    $scope.loadAutosByHerstellerId = function (id) {
        log.log("loadAutosByHerstellerId: " + id);
        //Per Ajax die passenden Autos anhand der ID laden.
        tableSrv.getAutosByHerstellerId(id).then(function (data) {
            //Alle Hersteller durchgehen und den passenden Hersteller mit der ID ermitteln
            for (var i = 0; i < scope.Hersteller.length; i++) {
                if (scope.Hersteller[i].Id == id) {
                    //Dann jeden einzelnen Array Eintrag unserem AutoTypen Array hinzugügen
                    for (var j = 0; j < data.length; j++) {
                        scope.Hersteller[i].AutoTypen.push(data[j]);
                    }
                    break;
                }
            }
        });
    };

    //Entfernen der Autotypen für die übergebene Hersteller Id
    $scope.removeAutosByHerstellerId = function (id) {
        log.log("removeAutosByHerstellerId: " + id);
        for (var i = 0; i < scope.Hersteller.length; i++) {
            if (scope.Hersteller[i].Id == id) {
                //Wenn der Hersteller gefunden wurde diesen wieder entfernen.
                scope.Hersteller[i].AutoTypen = [];
                break;
            }
        }
    };
}


angular.module("app.tableCtrl", ["app.tableSrv"])
    //Minification Ready
    .controller("tableCtrl", ['$log', '$scope', 'tableSrv', TableCtrl]);