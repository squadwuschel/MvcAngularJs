//Achtung diese Datei wurde automatisch erstellt,
//bitte nehmen Sie keine Änderungen daran vor, diese werden
//beim nächsten Erstellen wieder überschrieben.
//Erstellt am 09.06.2014 um 10:51:02 von SquadWuschel.

function accountPSrv($http, $log) { 
      this.log = $log, this.http = $http; 
}

accountPSrv.prototype.GetPersons = function () {
    return this.http.get('/Account/GetPersons').then(function (result) {
        return result.data;
    });
}

accountPSrv.prototype.GetPersonById = function (id) {
    return this.http.get('/Account/GetPersonById' + '/' + id).then(function (result) {
        return result.data;
    });
}

accountPSrv.prototype.SavePerson = function (model) {
    return this.http.post('/Account/SavePerson',model).then(function (result) {
        return result.data;
    });
}

angular.module("accountPSrv", [])
    .service("accountPSrv", ['$http', '$log', accountPSrv]);