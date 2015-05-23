function DropDownlistSrv($log, $http) {
    this.log = $log, this.http = $http;
}

DropDownlistSrv.prototype.loadLevelsData = function () {
    this.log.warn("load LevelData");
    return this.http.get("GetLevels").then(function (result) {
        return result.data;
    });
}

angular.module("app.dropDownlistSrv", [])
    .service("dropDownlistSrv", DropDownlistSrv);