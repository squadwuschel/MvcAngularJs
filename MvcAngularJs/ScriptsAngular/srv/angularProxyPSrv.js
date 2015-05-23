//Achtung diese Datei wurde automatisch erstellt,
//bitte nehmen Sie keine Änderungen daran vor, diese werden
//beim nächsten Erstellen wieder überschrieben.
//Erstellt am 16.10.2014 um 18:32:50 von SQUADWUSCHEL$.

function angularProxyPSrv($http, $log) { 
      this.log = $log, this.http = $http; 
}

angularProxyPSrv.prototype.GetJsonError = function () {
    return this.http.get('/AngularProxy/GetJsonError').then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.GetInfoMessage = function () {
    return this.http.get('/AngularProxy/GetInfoMessage').then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.GetWarningMessage = function () {
    return this.http.get('/AngularProxy/GetWarningMessage').then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.GetSuccessMessage = function () {
    return this.http.get('/AngularProxy/GetSuccessMessage').then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.GetErrorMessage = function () {
    return this.http.get('/AngularProxy/GetErrorMessage').then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenOne = function (fullName,age,gehalt) {
    return this.http.get('/AngularProxy/TestDatenOne'+ '?fullName='+encodeURIComponent(fullName)+'&age='+age+'&gehalt='+gehalt).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenTwo = function (id,fullName,age,datum) {
    return this.http.get('/AngularProxy/TestDatenTwo' + '/' + id+ '?fullName='+encodeURIComponent(fullName)+'&age='+age+'&datum='+datum).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenObjectOne = function (name) {
    return this.http.get('/AngularProxy/TestDatenObjectOne'+ '?name='+encodeURIComponent(name)).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenObjectTwo = function (id,hersteller) {
    return this.http.post('/AngularProxy/TestDatenObjectTwo' + '/' + id,hersteller).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenObjectPerson = function (name) {
    return this.http.get('/AngularProxy/TestDatenObjectPerson'+ '?name='+encodeURIComponent(name)).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenObjectPersonSichernOne = function (id,person) {
    return this.http.post('/AngularProxy/TestDatenObjectPersonSichernOne' + '/' + id,person).then(function (result) {
        return result.data;
    });
}

angularProxyPSrv.prototype.TestDatenObjectPersonSichernTwo = function (person) {
    return this.http.post('/AngularProxy/TestDatenObjectPersonSichernTwo',person).then(function (result) {
        return result.data;
    });
}

angular.module("app.angularProxyPSrv", [])
    .service("angularProxyPSrv", ['$http', '$log', angularProxyPSrv]);