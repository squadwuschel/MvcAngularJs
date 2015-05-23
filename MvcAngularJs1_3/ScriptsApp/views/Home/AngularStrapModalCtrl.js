angular.module("AngularStrapModalCtrl", [])
    .controller("AngularStrapModalCtrl", function ($modal, $scope, modalCtrl) {
    $scope.modal = {
        testModalCtrl: modalCtrl
    };
})
.controller("modalCtrl", function () {

    this.name = "testname";

});