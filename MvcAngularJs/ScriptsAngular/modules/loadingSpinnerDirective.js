
//MessageWindow Directive
angular.module("app.directives.loadingSpinner", [])
    .directive('loadingSpinner', function() {
        return {
            restrict: 'EAC', // "A" = Attribut | "E" = Element | "C" = Class (css)
            scope: {
                //sucht nach einem Attribut in der Definition mit dem Namen "messages" 
                //und stellt dessen "Inhalt" im Scope der Direktive zur Verfügung
                spinner: '=',
            },
            template: '<div class="row" ng-show="spinner > 0">' +
                '<div class="col-md-12">' +
                '<div class="alert alert-info text-center">' +
                '<i class="fa fa-spinner fa-spin"></i> Loading <i class="fa fa-spinner fa-spin"></i>' +
                '</div></div></div>',
            controller: function($log, $scope) {
                //spinner kann nicht im controller gesetzt werden, hier wurde die Variable nicht aktualisiert.
            },
            link: function(scope, element, attributes) {
                //Hier können z.B: DOM Manipulationen oder noch weitere Klick Events hinzugefügt werden!
            }
        };
    });