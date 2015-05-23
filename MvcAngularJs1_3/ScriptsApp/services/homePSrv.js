//Achtung diese Datei wurde automatisch erstellt,
//bitte nehmen Sie keine Änderungen daran vor, diese werden
//beim nächsten Erstellen wieder überschrieben.
//Erstellt am 04.04.2015 um 21:32:31 von SquadWuschel.

function homePSrv($http, $log) { 
      this.log = $log, this.http = $http; 
}

homePSrv.prototype.InitUnitTestPersonEntry = function () {
    return this.http.get('/Home/InitUnitTestPersonEntry').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.InitUnitTestSearchModel = function () {
    return this.http.get('/Home/InitUnitTestSearchModel').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.UnitTestResultModel = function (searchModel) {
    return this.http.post('/Home/UnitTestResultModel',searchModel).then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.AddUnitTestPerson = function (entry) {
    return this.http.post('/Home/AddUnitTestPerson',entry).then(function (result) {
        return result.data;
    });
}

angular.module("app.homePSrv", [])
    .service("homePSrv", ['$http', '$log', homePSrv]);