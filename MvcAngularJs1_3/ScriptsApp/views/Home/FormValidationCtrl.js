angular.module("FormValidationCtrl", [])
    .controller("FormValidationCtrl", function () {
    var that = this;
    this.Email = "";
    this.Age = 12;
    this.submitted = false;


    this.submitForm = function () {
        that.submitted = true;
    }
});