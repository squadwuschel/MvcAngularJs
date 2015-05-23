
//MainModule
angular.module("app.meineApp", ["ctrl.meinController", "srv.meinService", "srv.deinService"]);

//Passender Controller
angular.module("ctrl.meinController", ["srv.meinService", "srv.deinService"])
    .controller("CtrlDiName", function ($log, SrvDiName, SrvDiDeinName) {
    $log.log("CtrlDiName wurde initialisiert");
});

//Passende Services
angular.module("srv.meinService", [])
    .service("SrvDiName", function($log) {
        $log.log("SrvDiName wurde initialisiert");
});

angular.module("srv.deinService", [])
    .service("SrvDiDeinName", function ($log) {
        $log.log("SrvDiDeinName wurde initialisiert");
    });