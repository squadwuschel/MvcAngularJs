function MessageCtrl($scope, $log, messageSrv) {
    var that = this, scope = $scope, log = $log;

    $scope.Msg = function(value) {
        alert("Test Meldung " + value);
    }

    $scope.LoadJsonError = function() {
        messageSrv.GetJsonError().then(function (data) {
            scope.JsonError = data;
        });
    }

    $scope.GetInfoMessage = function () {
        messageSrv.GetInfoMessage().then(function (data) {
            scope.InfoMessage = data;
        });
    }

    $scope.GetWarningMessage = function () {
        messageSrv.GetWarningMessage().then(function (data) {
            scope.WarningMessage = data;
        });
    }

    $scope.GetSuccessMessage = function () {
        messageSrv.GetSuccessMessage().then(function (data) {
            scope.SuccessMessage = data;
        });
    }

    $scope.GetErrorMessage = function () {
        messageSrv.GetErrorMessage().then(function (data) {
            scope.ErrorMessage = data;
        });
    }

    log.log($scope);

}

angular.module("app.messageCtrl", ["app.messageSrv"])
    .controller("messageCtrl", MessageCtrl);