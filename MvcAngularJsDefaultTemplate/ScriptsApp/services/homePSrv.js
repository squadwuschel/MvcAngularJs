//Achtung diese Datei wurde automatisch erstellt,
//bitte nehmen Sie keine Änderungen daran vor, diese werden
//beim nächsten Erstellen wieder überschrieben.
//Erstellt am 09.06.2014 um 10:51:02 von SquadWuschel.

function homePSrv($http, $log) { 
      this.log = $log, this.http = $http; 
}

homePSrv.prototype.GetDashboardPersons = function () {
    return this.http.get('/Home/GetDashboardPersons').then(function (result) {
        return result.data;
    });
}

angular.module("homePSrv", [])
    .service("homePSrv", ['$http', '$log', homePSrv]);