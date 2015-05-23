angular.module("testTemplateDirective", [])
    .directive("testTemplate", function() {
        return {
            restrict: 'A',
            replace: true,
            //Funktioniert auch in Virtual Directories wegen dem "<base href='' /> in der _Layout.cshtml
            templateUrl: 'ScriptsApp/directives/Templates/testTemplate.html'
        }
    });