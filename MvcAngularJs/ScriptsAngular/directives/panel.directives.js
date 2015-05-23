angular.module("panel.directives", [])
    .directive("panelWithHeader", function () {
        return {
            restrict: 'EAC',
            //replace: true,
            transclude: true,
            templateUrl: siteRoot + "/ScriptsAngular/directives/HtmlTemplates/PanelTemplate.html",
            scope: {
                panelTitle: '='
            }
        }
    });