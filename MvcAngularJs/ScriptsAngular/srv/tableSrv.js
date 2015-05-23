function TableSrv($log, $http) {
    this.log = $log, this.http = $http;
}

TableSrv.prototype.getAutoHersteller = function () {
    this.log.log("load GetAutoHersteller");
    return this.http.get("GetAutoHersteller").then(function (result) {
        return result.data;
    });
}

TableSrv.prototype.getAutosByHerstellerId = function (value) {
    this.log.log("load GetAutosByHerstellerId");
    return this.http.get("GetAutosByHerstellerId/" + value).then(function (result) {
        return result.data;
    });
}

angular.module("app.tableSrv", [])
    //Minification Ready
    .service("tableSrv", ['$log', '$http', TableSrv]);