angular.module("ngPatternCtrl", [])
    .controller("ngPatternCtrl", function() {

    this.ViewModel = {
        CamelCaseName: "Test",
        CamelCasePattern: /^((^[A-Z][a-z0-9]+)([A-Z][a-z0-9]+)*)$/
    };

});