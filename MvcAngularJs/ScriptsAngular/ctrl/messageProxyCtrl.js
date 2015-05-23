function MessageCtrl($scope, $log, AngularProxyPSrv) {
    var that = this, scope = $scope, log = $log;

    $scope.Msg = function(value) {
        alert("Test Meldung " + value);
    }

    $scope.LoadJsonError = function() {
        AngularProxyPSrv.GetJsonError().then(function (data) {
            scope.JsonError = data;
        });
    }

    $scope.GetInfoMessage = function () {
        AngularProxyPSrv.GetInfoMessage().then(function (data) {
            scope.InfoMessage = data;
        });
    }

    $scope.GetWarningMessage = function () {
        AngularProxyPSrv.GetWarningMessage().then(function (data) {
            scope.WarningMessage = data;
        });
    }

    $scope.GetSuccessMessage = function () {
        AngularProxyPSrv.GetSuccessMessage().then(function (data) {
            scope.SuccessMessage = data;
        });
    }

    $scope.GetErrorMessage = function () {
        AngularProxyPSrv.GetErrorMessage().then(function (data) {
            scope.ErrorMessage = data;
        });
    }

    log.log($scope);

}

angular.module("app.messageCtrl", ["app.AngularProxyPSrv"])
    .controller("messageCtrl", MessageCtrl);