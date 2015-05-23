angular.module("app.index", [
               "indexCtrl",
               "homePSrv"
]).run(function($log) {
    $log.log("app.index initialized");
})