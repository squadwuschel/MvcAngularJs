angular.module("select.directives", [])
/*
Direktive zum Anzeigen einer MultiSelect Box als Dropdownliste. Achtung Es wird hier ebenfalls AnguluarUi benötigt!
Es werden die Properties "Selected" und "Text" benötigt in der übergebenen Anzeigeliste, damit die Multiselect Liste richtig funktioniert.

Verwendung:

html ...
<div sq-multiselect ng-model="ModelData.Listendaten" value-changed="LogChange(selectedValue)" required></div>
... html
*/
    .directive("sqMultiselect", function () {
        return {
            restrict: 'AE',
            replace: true,
            require: 'ngModel',
            scope: {
                listEntries: "=ngModel", //unsere Liste mit den Einträgen
                valueChanged: "&" //Funktion die aufgerufen wird, wenn sich der Wert geändert hat.
            },
            //ACHTUNG funktioniert nur in Verbindung mit AngularUi und dem dort enthaltenen "dropdown" Control!
            //dies muss auch mit in den Abhängigkeiten geladen werden mit "ui.bootstrap".
            template: '<div class="sq-dropdown bootstrap-select btn-group" dropdown>' +
                '<button type="button" class="btn btn-default dropdown-toggle form-control" title="{{Fct.selectedString(listEntries)}}">' +
                '<span class="filter-option" ng-bind="Fct.selectedString(listEntries)"></span>&nbsp;' +
                '<span class="caret"></span></button>' +
                '<ul class="dropdown-menu dropdown-multiselect" role="menu">' +
                '<li ng-show="listEntries.length > 0"><a href="" ng-click="Fct.selectAll(listEntries)">' +
                '<span style="margin-right: 30px;"><strong ng-bind="Locals.selectAll"></strong></span>' +
                '<i ng-show="Fct.allSelected(listEntries)" class="fa fa-check ddl-icon"></i>' +
                '</a>' +
                '</li>' +
                '<li ng-repeat="item in listEntries">' +
                '<a ng-click="item.Selected = !item.Selected" href="">' +
                '<span style="margin-right: 30px;" ng-bind="item.Text"></span> ' +
                '<i ng-show="item.Selected" class="fa fa-check ddl-icon"></i>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</div>',
            link: function (scope, elem, attr, ngModel) {
                scope.Fct = {};
                scope.Locals = {};
                scope.Locals.selectAll = "Alle auswählen";

                //String zusammenbauen für die ausgewählten Elemente
                scope.Fct.selectedString = function (data) {
                    var anz = "-- Bitte wählen --", count = 0;
                    if (data !== undefined && data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            //Nur wenn das Element auch ausgewählt wurde anzeigen.
                            if (data[i].Selected) {
                                if (count === 0) {
                                    anz = "";
                                }
                                if (anz.length > 0) {
                                    anz += "; ";
                                }
                                //Text zusammenbauen
                                anz += data[i].Text;
                                count++;
                            }
                        }
                    }
                    return anz;
                };

                //Funktion die alle Werte auswählt und wenn alle Werte ausgewählt wurden, dann
                //werden alle wieder abgewählt
                scope.Fct.selectAll = function (data) {
                    var select = true;
                    //Wenn alle ausgewählt sind, dann alle abwählen.
                    if (scope.Fct.allSelected(data)) {
                        select = false;
                    }
                    if (data !== undefined && data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            data[i].Selected = select;
                        }
                    }
                };

                //Gibt zurück ob alle Werte in der Liste ausgewählt wurden.
                scope.Fct.allSelected = function (data) {
                    if (data !== undefined && data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            if (!data[i].Selected) {
                                return false;
                            }
                        }
                    }
                    return true;
                };

                //Gibt True zurück, wenn kein Wert in der Liste ausgewählt wurde.
                scope.Fct.noneSelected = function (data) {
                    if (data !== undefined && data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].Selected) {
                                return false;
                            }
                        }
                    }
                    return true;
                }

                //Custom Validation einbinden für Required - Das value ist hier ngModel was immer übergeben wird.
                //vom $parsers bzw. $formatters
                var validator = function (value) {
                    //Einbinden einer Required Validierung, es wird das "required" Attribut unterstützt
                    //und nur wenn auch ein Wert im ngModel (selectedValue) gesetzt ist, ist die Validation True!
                    if (attr.required !== undefined) {
                        if (scope.Fct.noneSelected(value)) {
                            ngModel.$setValidity("required", false);
                        } else {
                            ngModel.$setValidity("required", true);
                        }
                    }
                    //WICHTIG den Eingabewert auch zurückgeben, sonst landet im Model kein Wert mehr!
                    return value;
                }

                //Unseren Validator den passenden Listen hinzufügen.
                ngModel.$parsers.unshift(validator); //view-to-model direction
                ngModel.$formatters.unshift(validator); //model-to-view direction

                //Prüfen ob sich die Liste ändert
                //http://www.bennadel.com/blog/2566-scope-watch-vs-watchcollection-in-angularjs.htm
                scope.$watch('listEntries', function (newVal, oldVal) {
                    if (newVal !== undefined && newVal !== oldVal) {
                        //Wenn die Werte unterschiedlich sind, dann ebenfalls die Methode für Change aufrufen!
                        scope.valueChanged();
                        //Wenn der Wert einfach nur "geändert" wird, muss auch $dirty und $pristine "gesetzt" werden
                        //dies passiert automatisch über "ngModel.$setViewValue(ngModel.$viewValue);"
                        ngModel.$setViewValue(ngModel.$viewValue);
                    }
                }, true); //TRUE NOTWENDIG!
            }
        };
    })
/*
Direktive zum Anzeigen einer SingleSelect Box als Dropdownliste. Achtung Es wird hier ebenfalls AnguluarUi benötigt!
Es werden die Properties "Selected" und "Text" und "Value" benötigt in der übergebenen Anzeigeliste.

Verwendung:

html ...
<div sq-select name="personSelect" value-changed="LogChange(selectedValue)" ng-model="selectedValue" list-entries="userList" required></div>
... html
*/
    .directive("sqSelect", function () {
        return {
            restrict: 'AE',
            replace: true,
            require: 'ngModel',
            scope: {
                listEntries: "=", //Die Listeneinträge die angezeigt werden sollen
                selectedValue: "=ngModel", //Property in dem extra noch abgelegt wird welcher Eintrag ausgewählt wurde
                valueChanged: "&" //Funktion die aufgerufen wird, wenn sich der Wert geändert hat.
            },
            //ACHTUNG funktioniert nur in Verbindung mit AngularUi und dem dort enthaltenen "dropdown" Control!
            //dies muss auch mit in den Abhängigkeiten geladen werden mit "ui.bootstrap".
            template: '<div class="sq-dropdown bootstrap-select btn-group" dropdown>' +
                '<button type="button" class="btn btn-default dropdown-toggle" title="{{Fct.selectedString(listEntries)}}">' +
                '<span class="filter-option" ng-bind="Fct.selectedString(listEntries)"></span>&nbsp;' +
                '<span class="caret"></span></button>' +
                '<ul class="dropdown-menu dropdown-multiselect" role="menu">' +
                '<li ng-repeat="item in listEntries">' +
                '<a ng-click="Fct.selectEntry(item)" href="#">' +
                '<span style="margin-right: 30px;" ng-bind="item.Text"></span> ' +
                '<i ng-show="item.Selected" class="fa fa-check ddl-icon"></i>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</div>',
            link: function (scope, elem, attr, ngModel) {
                scope.Fct = {};
                //String zusammenbauen für das ausgewählte Element
                scope.Fct.selectedString = function (data) {
                    var anz = "-- Bitte wählen --";
                    if (data !== undefined && data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].Selected) {
                                //Text extrahieren und zurückgeben, es kann ja nur ein Wert ausgewählt sein
                                return data[i].Text;
                            }
                        }
                    }
                    //Kein Text gefunden, dann wurde nichts ausgewählt
                    return anz;
                }

                //Auswählen des übergebenen Wertes in der Liste und alle restlichen Listenwerte werden zurückgesetzt!
                scope.Fct.selectEntry = function (item) {
                    if (item !== undefined && item !== null) {
                        var isSingleItem = true;

                        //Prüfen ob der Selected Value nur ein Wert ist oder ob er ein Property mit dem Namen Selected enthält
                        if (scope.selectedValue.Selected !== undefined) {
                            item.Selected = false;
                            isSingleItem = false;
                        }

                        //Alle Werte in der Liste abwählen und wenn das Item für die Übergabe gefunden wurde
                        //die entsprechenden Werte setzten.
                        for (var i = 0; i < scope.listEntries.length; i++) {
                            scope.listEntries[i].Selected = false;
                            //Zwei Objekte werden verglichen - Es ist KEIN Property Value notwendig.
                            if (scope.listEntries[i] === item && !isSingleItem) {
                                item.Selected = true;
                                scope.selectedValue = item;
                                //Beim Selected Value handelt es sich nur um einen "WERT" und KEIN Objekt!
                                //Dann muss das Property "Value" Vorhanden sein.
                            } else if (scope.listEntries[i].Value === item) {
                                scope.listEntries[i].Selected = true;
                                scope.selectedValue = item;
                            } else if (scope.listEntries[i].Value === item.Value) {
                                scope.listEntries[i].Selected = true;
                                scope.selectedValue = item.Value;
                            }
                        }
                    }
                }

                //Den Aktuellen Selected Value überwachen
                scope.$watch('selectedValue', function (newVal, oldVal) {
                    if (newVal !== undefined && newVal !== oldVal) {
                        //Wenn die Werte unterschiedlich sind, dann ebenfalls die Methode für Change aufrufen!
                        scope.valueChanged();

                        //Direkt zum Start alle Einträge zurücksetzten und den passenden
                        //SelectedValue übergeben der ausgewählt werden soll.
                        scope.Fct.selectEntry(scope.selectedValue);

                        //Wenn der Wert einfach nur "geändert" wird, muss auch $dirty und $pristine "gesetzt" werden
                        //dies passiert automatisch über "ngModel.$setViewValue(ngModel.$viewValue);"
                        ngModel.$setViewValue(ngModel.$viewValue);
                    }
                }, true);

                //Custom Validation einbinden für Required
                var validator = function (value) {
                    //Einbinden einer Required Validierung, es wird das "required" Attribut unterstützt
                    //und nur wenn auch ein Wert im ngModel (selectedValue) gesetzt ist, ist die Validation True!
                    if (attr.required !== undefined) {
                        if (scope.selectedValue === undefined || scope.selectedValue === null) {
                            ngModel.$setValidity("required", false);
                        } else {
                            ngModel.$setValidity("required", true);
                        }
                    }
                    //WICHTIG den Eingabewert auch zurückgeben, sonst landet im Model kein Wert mehr!
                    return value;
                }

                //Unseren Validator den passenden Listen hinzufügen.
                ngModel.$parsers.unshift(validator); //view-to-model direction
                ngModel.$formatters.unshift(validator); //model-to-view direction
            }
        }
    })
    .directive("sqMultiselectInput", function () {
        return {
            restrict: 'AE',
            replace: true,
            require: 'ngModel',
            transclude: true,
            scope: {
                listEntries: "=ngModel", //unsere Liste mit den Einträgen
                valueChanged: "&" //Funktion die aufgerufen wird, wenn sich der Wert geändert hat.
            },
            //ACHTUNG funktioniert nur in Verbindung mit AngularUi und dem dort enthaltenen "dropdown" Control!
            //dies muss auch mit in den Abhängigkeiten geladen werden mit "ui.bootstrap".
            template: '<div class="sq-dropdown bootstrap-select btn-group" dropdown>' +
                '<button type="button" class="btn btn-default dropdown-toggle form-control" title="{{Fct.selectedString(listEntries)}}">' +
                '<span class="filter-option" ng-bind="Fct.selectedString(listEntries)"></span>&nbsp;' +
                '<span class="caret"></span></button>' +
                '<ul class="dropdown-menu dropdown-multiselect" role="menu">' +
                '<li ng-show="listEntries.length > 0"><a href="" ng-click="Fct.selectAll(listEntries)">' +
                '<span style="margin-right: 30px;"><strong ng-bind="Locals.selectAll"></strong></span>' +
                '<i ng-show="Fct.allSelected(listEntries)" class="fa fa-check ddl-icon"></i>' +
                '</a>' +
                '</li>' +
                '<li ng-click="Fct.toggleDropdown($event)" ><input type="text" class="form-control" />' +
                '</li>' +
                '<li class="may-transclude-here" ng-repeat="item in listEntries">' +
                '<a ng-click="item.Selected = !item.Selected" href="">' +
                '<span style="margin-right: 30px;" ng-bind="item.Text"></span> ' +
                '<i ng-show="item.Selected" class="fa fa-check ddl-icon"></i>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</div>',
            link:  function (scope, element, attrs, controllers, transcludeFn) {
                if (attrs.bars !== undefined) {
                    transcludeFn(scope, function (nodes) {
                        element.find('.may-transclude-here')
                          .empty()
                          .append(nodes);
                    });
                }
                    
                    //scope.Fct.toggleDropdown = function($event) {
                    //    $event.preventDefault();
                    //}

                    ////String zusammenbauen für die ausgewählten Elemente
                    //scope.Fct.selectedString = function (data) {
                    //    var anz = "-- Bitte wählen --", count = 0;
                    //    if (data !== undefined && data !== null) {
                    //        for (var i = 0; i < data.length; i++) {
                    //            //Nur wenn das Element auch ausgewählt wurde anzeigen.
                    //            if (data[i].Selected) {
                    //                if (count === 0) {
                    //                    anz = "";
                    //                }
                    //                if (anz.length > 0) {
                    //                    anz += "; ";
                    //                }
                    //                //Text zusammenbauen
                    //                anz += data[i].Text;
                    //                count++;
                    //            }
                    //        }
                    //    }
                    //    return anz;
                    //};

                    ////Funktion die alle Werte auswählt und wenn alle Werte ausgewählt wurden, dann
                    ////werden alle wieder abgewählt
                    //scope.Fct.selectAll = function (data) {
                    //    var select = true;
                    //    //Wenn alle ausgewählt sind, dann alle abwählen.
                    //    if (scope.Fct.allSelected(data)) {
                    //        select = false;
                    //    }
                    //    if (data !== undefined && data !== null) {
                    //        for (var i = 0; i < data.length; i++) {
                    //            data[i].Selected = select;
                    //        }
                    //    }
                    //};

                    ////Gibt zurück ob alle Werte in der Liste ausgewählt wurden.
                    //scope.Fct.allSelected = function (data) {
                    //    if (data !== undefined && data !== null) {
                    //        for (var i = 0; i < data.length; i++) {
                    //            if (!data[i].Selected) {
                    //                return false;
                    //            }
                    //        }
                    //    }
                    //    return true;
                    //};

                    ////Gibt True zurück, wenn kein Wert in der Liste ausgewählt wurde.
                    //scope.Fct.noneSelected = function (data) {
                    //    if (data !== undefined && data !== null) {
                    //        for (var i = 0; i < data.length; i++) {
                    //            if (data[i].Selected) {
                    //                return false;
                    //            }
                    //        }
                    //    }
                    //    return true;
                    //}

                    ////Custom Validation einbinden für Required - Das value ist hier ngModel was immer übergeben wird.
                    ////vom $parsers bzw. $formatters
                    //var validator = function (value) {
                    //    //Einbinden einer Required Validierung, es wird das "required" Attribut unterstützt
                    //    //und nur wenn auch ein Wert im ngModel (selectedValue) gesetzt ist, ist die Validation True!
                    //    if (attr.required !== undefined) {
                    //        if (scope.Fct.noneSelected(value)) {
                    //            ngModel.$setValidity("required", false);
                    //        } else {
                    //            ngModel.$setValidity("required", true);
                    //        }
                    //    }
                    //    //WICHTIG den Eingabewert auch zurückgeben, sonst landet im Model kein Wert mehr!
                    //    return value;
                    //}

                    ////Unseren Validator den passenden Listen hinzufügen.
                    //ngModel.$parsers.unshift(validator); //view-to-model direction
                    //ngModel.$formatters.unshift(validator); //model-to-view direction

                    ////Prüfen ob sich die Liste ändert
                    ////http://www.bennadel.com/blog/2566-scope-watch-vs-watchcollection-in-angularjs.htm
                    //scope.$watch('listEntries', function (newVal, oldVal) {
                    //    if (newVal !== undefined && newVal !== oldVal) {
                    //        //Wenn die Werte unterschiedlich sind, dann ebenfalls die Methode für Change aufrufen!
                    //        scope.valueChanged();
                    //        //Wenn der Wert einfach nur "geändert" wird, muss auch $dirty und $pristine "gesetzt" werden
                    //        //dies passiert automatisch über "ngModel.$setViewValue(ngModel.$viewValue);"
                    //        ngModel.$setViewValue(ngModel.$viewValue);
                    //    }
                    //}, true); //TRUE NOTWENDIG!
                }
            }
    });