angular.module("alertCtrl", [])
    .controller("alertCtrl", function($scope, $rootScope, $log) {
    $scope.counter = 0;
        $scope.addAllert = function() {
            $scope.counter++;
            $rootScope.SxpMessage.AddManualMessage("Es ist ein Fehler aufgetreten mit der Nr." + $scope.counter, 3);
        }

        $scope.addSuccess = function () {
            $scope.counter++;
            $rootScope.SxpMessage.AddManualMessage("Das Speichern des DS war erfolgreich mit der Id." + $scope.counter, 1);
        }
    });