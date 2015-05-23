//Achtung diese Datei wurde automatisch erstellt,
//bitte nehmen Sie keine Änderungen daran vor, diese werden
//beim nächsten Erstellen wieder überschrieben.
//Erstellt am 16.10.2014 um 18:32:50 von SQUADWUSCHEL$.

function homePSrv($http, $log) { 
      this.log = $log, this.http = $http; 
}

homePSrv.prototype.ValidationDataModel = function () {
    return this.http.get('/Home/ValidationDataModel').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.SaveValidationModelData = function (model) {
    return this.http.post('/Home/SaveValidationModelData',model).then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetJsonError = function () {
    return this.http.get('/Home/GetJsonError').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetInfoMessage = function () {
    return this.http.get('/Home/GetInfoMessage').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetWarningMessage = function () {
    return this.http.get('/Home/GetWarningMessage').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetSuccessMessage = function () {
    return this.http.get('/Home/GetSuccessMessage').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetErrorMessage = function () {
    return this.http.get('/Home/GetErrorMessage').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetLevels = function () {
    return this.http.get('/Home/GetLevels').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetAutoHersteller = function () {
    return this.http.get('/Home/GetAutoHersteller').then(function (result) {
        return result.data;
    });
}

homePSrv.prototype.GetAutosByHerstellerId = function (id) {
    return this.http.get('/Home/GetAutosByHerstellerId' + '/' + id).then(function (result) {
        return result.data;
    });
}

angular.module("app.homePSrv", [])
    .service("homePSrv", ['$http', '$log', homePSrv]);