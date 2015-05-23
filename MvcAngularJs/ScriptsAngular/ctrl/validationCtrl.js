function ValidationCtrl($log, $scope, homePSrv) {
    $scope.submitted = false;

    homePSrv.ValidationDataModel().then(function (data) {
        $scope.DataModel = data;
    });

    homePSrv.GetLevels().then(function (data) {
        $scope.Levels = data;
    });

    $scope.resetModelData = function () {
        homePSrv.ValidationDataModel().then(function (data) {
            $scope.DataModel = data;
            $scope.submitted = false;
        });
    }

    $scope.submitForm = function () {
        $log.log($scope);
        $scope.submitted = true;
        if ($scope.frm.$valid) {
            homePSrv.SaveValidationModelData($scope.DataModel).then(function(data) {
                $scope.DataModel = data;
            });
        }
    }

    $log.log($scope);

}

//http://scotch.io/tutorials/javascript/angularjs-form-validation
//http://blog.brunoscopelliti.com/form-validation-the-angularjs-way
angular.module("app.validationCtrl", ["app.homePSrv"])
    .controller("validationCtrl", ValidationCtrl);