/* Direktiven die einfache UI Templates visualisieren und einfache Logiken abbilden. */

angular.module("ui.directives", [])
/* Direktive zum Togglen von Filterdaten. Es wird nur der Wert übergeben, welcher getoggelt werden soll.

VERWENDUNG:
<div sxp-toggle-filter="ctrl.ShowFilter"></div>

*/
    .directive("sxpToggleFilter", function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                sxpToggleFilter: "="
            },
            templateUrl: siteRoot + 'ScriptsApp/directives/templates/ui.directives.toggleFilter.html'
        }
    })
/* Direktive die eine Checkbox erstellt und die die Funktionalität für Select bzw. DeSelectAll bereitstellt.
Es muss nur die Liste mit den Einträgen übergeben werden die ein Bool Property besitzt mit dem Namen "IsSelected" ODER man kann 
den Namen des Properties selbst übergeben über "sxp-property-name" (ACHTUNG den namen des Properties in '' einfache Anführungszeichen setzen!). 

VERWENDUNG:
<div sxp-select-all="ResultModel.Entries" sxp-property-name="'IsSelected'" sxp-is-value-selected="ResultModel.IsValueSelected"></div>

*/
    .directive("sxpSelectAll", function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                sxpSelectAll: "=", //Liste mit den Einträgen die Selectiert werden sollen
                sxpPropertyName: "=", //Der Name des Selected Properties in der Liste Default: "IsSelected" - Optionaler Parameter
                sxpIsValueSelected: "=" //Gibt an ob mindestens ein Wert ausgewählt wurden - Optionaler Parameter
            },
            template: '<input type="checkbox" ng-model="Locals.AllSelected" ng-show="sxpSelectAll.length > 0" ng-click="Fct.SelectAll()"></input>',
            link: function(scope, element, attrs) {
                //Prüfen ob das Property für Selected angegeben wurde und wenn nicht, dann den Defaultnamen setzen.
                var propertyName = "IsSelected";
                if (scope.sxpPropertyName !== undefined && scope.sxpPropertyName !== '') {
                    propertyName = scope.sxpPropertyName;
                }

                scope.Locals = {};
                scope.Locals.AllSelected = false;
                scope.Fct = {};
                //Funktion zum Auswählen bzw. Abwählen Aller Einträge.
                scope.Fct.SelectAll = function() {
                    for (var i = 0; i < scope.sxpSelectAll.length; i++) {
                        //Den Passenden Boolwert für unser Property setzen.
                        scope.sxpSelectAll[i][propertyName] = scope.Locals.AllSelected;
                    }
                }

                //Die Liste auf Änderungen überwachen
                scope.$watch('sxpSelectAll', function () {
                    //Da der Propertyname evtl. später gebunden werden kann, wenn dieser nicht direkt als String übergeben wird
                    //hier später prüfen wie der aktuelle Name ist.
                    if (scope.sxpPropertyName !== undefined && scope.sxpPropertyName !== '') {
                        propertyName = scope.sxpPropertyName;
                    }

                    if (scope.sxpSelectAll !== undefined) {
                        var count = 0;
                        for (var i = 0; i < scope.sxpSelectAll.length; i++) {
                            //Prüfen wie viele Einträge ausgewählt wurden.
                            if (scope.sxpSelectAll[i][propertyName]) {
                                count++;
                            }
                        }

                        scope.Locals.AllSelected = false;
                        scope.sxpIsValueSelected = false;
                        //Sollten Alle Einträge ausgewählt sein, dann auch unsere Checkbox auswählen.
                        if (count === scope.sxpSelectAll.length && scope.sxpSelectAll.length > 0) {
                            scope.Locals.AllSelected = true;
                        }

                        //Prüfen ob mindestens ein Wert ausgewählt wurde.
                        if (count > 0) {
                            scope.sxpIsValueSelected = true;
                        }
                    }
                }, true);
            }
        }
    })
/**
* Equal Heights
* https://gist.github.com/codonnell822/c9e21570a0bc3bee26f6
* Attach this directive to the parent/wrapping element of
* a bunch of elements that are columns. This directive will
* calculate the height of every direct child (one level down)
* then set all of them to be the height of the tallest one.
*
* @example
<ul data-equal-heights>
<li>column1</li>
<li>column2</li>
<li>column3</li>
</ul>
*
*/
    .directive('equalHeights', function($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function($scope, $element, attrs) {
                $timeout(function() {
                    var $children = $element.children(),
                        currentMaxHeight = 0,
                        numImagesLoaded = 0,
                        $images = $element.find('img'),
                        imageCount = $images.length;

                    if (imageCount > 0) {
                        angular.forEach($images, function(image) {
                            if (image.complete) {
                                numImagesLoaded++;
                            }
                        });
                    }

                    if (numImagesLoaded === imageCount) {
                        angular.forEach($children, function(child) {
                            var childHeight = $(child).outerHeight();

                            if (childHeight > currentMaxHeight) {
                                currentMaxHeight = childHeight;
                            }
                        });

                        // set heights
                        $children.css({ height: currentMaxHeight });
                    }
                });
            }
        }
    });
    
