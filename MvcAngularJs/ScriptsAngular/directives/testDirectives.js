angular.module("app.testDirectives", [])
       .directive("sqFullname", function() {
            return {
                restrict: 'E',
                //http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
                scope: true, //Muss auf True gesetzt, denn sonst wird in allen "sq-fullname" der gleiche Inhalt angezeigt.
                replace: true, //Ersetzt unser eigenes "sq-fullname" Tag durch das hier angegebene "h1"
                link: function (scope, element, attr) {
                    //Die Attribute direkt auslesen und verwenden
                    scope.fullName = attr.first + ' ' + attr.last;
                },
                template: "<h1>{{fullName}}</h1>"
            }
       })
    .directive("sqTranscludeDirective", function() {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div ng-transclude> </div>'
        }
})
   