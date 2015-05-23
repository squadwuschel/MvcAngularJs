function DirectivesCtrl($scope, $log) {
    $scope.budget = 1000;
    $scope.money = 666.23;
}

angular.module("app.directivesCtrl", [])
    .controller("directivesCtrl", DirectivesCtrl);