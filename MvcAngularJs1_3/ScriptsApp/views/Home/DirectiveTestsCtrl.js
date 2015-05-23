angular.module("DirectiveTestsCtrl", [])
.controller("DirectiveTestsCtrl", function () {
    this.name = "testName";
    this.Person = {};
    this.nummer = 12;

    this.Person.Name = "Johannes";
    this.Person.Alter = 32;

})
.directive("testDirective", function () {
    return {
        restrict: 'A',
        scope: {
            testName: '=',
            testPerson: '='
        },
        template: '<div><input type="text" ng-model="testName" /><br/><input type="text" ng-model="testPerson.Alter" /><br/><input type="text" ng-model="testPerson.Name"><br/>{{testPerson}}</div>',
        link: function (scope, elem, attr) {

        }
    }
});