//MessageWindow Directive
angular.module("message.directives", [])
    .directive('messageWindow', function () { //Aus "messageWindow" wird "message-Window", wenn es im DOM definiert wird.
        return {
            restrict: 'EAC', // "A" = Attribut | "E" = Element | "C" = Class (css)
            replace: 'true',
            scope: {
                //sucht nach einem Attribut in der Definition mit dem Namen "messages" 
                //und stellt dessen "Inhalt" im Scope der Direktive zur Verfügung
                //Ist aktuell nicht notwendig, da wir die Message direkt aus dem RootScope zuweisen im controller der Direktive
                //messages: '=',
            },
            template: '<ul class="nav navbar-nav navbar-right" ng-if="SxpMessage.hasMessages()">' +
                         '<li class="dropdown" ng-class="{\'open\': SxpMessage.alertOpen}">' +
                           '<a href="#" class="" ng-click="SxpMessage.toggleAlertOpen()"><i class="fa fa-info-circle fa-lg" ng-class="{\'text-primary\': SxpMessage.hasErrorMessage()}"></i></a>' +
                           '<ul class="dropdown-menu alert-menue">' +
                               '<li>' +
                                 '<table class="table table-condensed table-hover">' +
                                    '<tr ng-repeat="row in SxpMessage.messages" ng-class="row.typ">' +
                                        '<td ng-bind="row.Message"></td>' +
                                        '<td style="width: 20px;" ng-click="SxpMessage.closeMessage(row.Message)">' +
                                            '<i class="fa fa-trash-o linkCursor"></i>' +
                                        '</td>' +
                                     '</tr>' +
                                     '<tr class="linkCursor" ng-if="SxpMessage.hasErrorMessage()" ng-click="SxpMessage.deleteAllMessages()">' +
                                        '<td class="text-right"><small>Alle Einträge löschen</small></td>' +
                                        '<td style="width: 20px;"><i class="fa fa-trash-o linkCursor"></i></td>' +
                                    '</tr>' +
                                 '</table>' +
                               '</li>' +
                           '</ul>' +
                         '</li>' +
                      '</ul>',
            controller: function ($log, $scope) {
                //Unserem Directiven Scope die Liste aus dem RootScope zuweisen/verknüpfen.
                //$scope.CloseMessage = $scope.$root.SxpMessage.CloseMessage;
                $scope.SxpMessage = $scope.$root.SxpMessage;
            },
            link: function (scope, element, attributes) {
                //Hier können z.B: DOM Manipulationen oder noch weitere Klick Events hinzugefügt werden!
            }
        };
    });