function FilterCtrl($log, $scope, demoDataSrv) {
    $log.log(demoDataSrv);


    demoDataSrv.getDemoData().then(function(data) {
        $scope.demoData = data;
        $log.log($scope);
    });

    //Filter direkt im Scope des Controllers erstellen mit dem namen summary
    //https://www.youtube.com/watch?v=fkSXAnUFC4Y
    $scope.summary = function(data) {
        return data.bonus + data.gehalt;
    }

    $log.log($scope);
}

angular.module("app.filterCtrl", ["app.demoDataSrv"])
    .controller("filterCtrl", FilterCtrl);