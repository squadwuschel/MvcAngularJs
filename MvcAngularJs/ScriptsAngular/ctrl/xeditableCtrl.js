function XeditableCtrl($scope, $log) {
    $scope.name = "Heinrich M.";
    $scope.age = 12;
}

angular.module("app.xeditableCtrl", [])
    .controller("xeditableCtrl", XeditableCtrl);