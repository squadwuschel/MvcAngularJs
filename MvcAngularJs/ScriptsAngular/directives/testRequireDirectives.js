var app = angular.module("testRequireDirectives", []);

app.directive("sqMotor", function () {
    return {
        restrict: "A",
        controller: function ($scope, $log) {
            $scope.ComponentName = "Motor";
            this.showComponent = function () {
                $log.log("Ich bin ein Motor");
            }
        }
    }
});

app.directive("sqRadio", function () {
    return {
        restrict: "A",
        controller: function ($scope, $log) {
            $scope.ComponentName = "Radio";
            //Da wir das Property mit this versehen - können wir später im Car darauf zugreifen
            this.showComponent = function () {
                $log.log("Ich bin ein Radio");
            }
        }
    }
});

app.directive("sqCar", function ($log) {
    return {
        restrict: "E",
        replace: true,
        // Das "^" bedeutet, das nach dieser Direktive nicht nur auf der aktuellen Elementebene gesucht wird, sondern
        //das Attribut oder Element kann auch weiter oben im DOM vorhanden sein
        //Das "?" bedeutet, das es sich hier um ein Optionales Element handelt und wenn es nicht übergeben wird, steht im Array dann "undefined"
        require: ["^?sqMotor", "sqRadio"], 
        link: function(scope, elem, attr, ctrls) {
            $log.log("Ich bin ein Auto");
            //Da wir mehrere Requires haben, kann man hier auf die Elemente entsprechend zugreifen
            //oder mit einem angular.foreach durchgehen.
            ctrls[0].showComponent();
            ctrls[1].showComponent();
        }
    }
});