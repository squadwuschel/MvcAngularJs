
//MessageWindow Directive
angular.module("directives.messages", [])
    .directive('messageWindow', function() {
        return {
            restrict: 'EAC', // "A" = Attribut | "E" = Element | "C" = Class (css)
            scope: {
                //sucht nach einem Attribut in der Definition mit dem Namen "messages" 
                //und stellt dessen "Inhalt" im Scope der Direktive zur Verfügung
               // messages: '=',
            },
            template: '<div class="row" ng-hide="messages.length === 0">' +
                '<div class="col-md-12" ng-repeat="message in messages">' +
                '<div class="alert alert-{{message.Type}}"> ' +
                '<label ng-bind="message.Text"></label>' +
                '<button type="button" class="close" data-dismiss="alert" ng-click="CloseMessage(message.Text)" aria-hidden="true">&times;</button>' +
                '</div></div></div>',
            controller: function($log, $scope) {
                //Damit unsere CloseMessage Funkion auch hier funktioniert, muss
                //diese hier "zugewiesen" werden, denn irgendwie schaut die Direktive nicht automatisch 
                //im rootscope nach ob die Funktion dort existiert.
                $scope.messages = $scope.$root.MessageList;
                $scope.CloseMessage = $scope.$root.CloseMessage;
            },
            link: function(scope, element, attributes) {
                //Hier können z.B: DOM Manipulationen oder noch weitere Klick Events hinzugefügt werden!
            }
        };
    });