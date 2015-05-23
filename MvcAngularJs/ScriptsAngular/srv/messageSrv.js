function MessageSrv($http, $log) {
    this.log = $log, this.http = $http;
}

MessageSrv.prototype.GetJsonError = function () {
    this.log.log("load GetJsonError");
    return this.http.get("GetJsonError").then(function (result) {
        return result.data;
    });
}

MessageSrv.prototype.GetInfoMessage = function () {
    this.log.log("load GetInfoMessage");
    return this.http.get("GetInfoMessage").then(function (result) {
        return result.data;
    });
}

MessageSrv.prototype.GetWarningMessage = function () {
    this.log.log("load GetWarningMessage");
    return this.http.get("GetWarningMessage").then(function (result) {
        return result.data;
    });
}

MessageSrv.prototype.GetSuccessMessage = function () {
    this.log.log("load GetSuccessMessage");
    return this.http.get("/Home/GetSuccessMessage").then(function (result) {
        return result.data;
    });
}

MessageSrv.prototype.GetErrorMessage = function () {
    this.log.log("load GetErrorMessage");
    return this.http.get("GetErrorMessage").then(function (result) {
        return result.data;
    });
}


angular.module("app.messageSrv", [])
    .service("messageSrv", MessageSrv);