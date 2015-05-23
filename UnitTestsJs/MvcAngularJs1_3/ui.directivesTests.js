/// <template path="../../MvcAngularJs1_3/ScriptsApp/directives/Templates/ui.directives.toggleFilter.html" /> 
/// <reference path="../../MvcAngularJs1_3/mvcangularjs1_3/scripts/jasmine.js" />
/// <reference path="../../mvcangularjs1_3/scripts/jquery-2.1.1.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular-mocks.js" />
/// <reference path="../../mvcangularjs1_3/scriptsapp/directives/ui.directives.js" />

//ACHTUNG: Ein Teil dieser Tests schlägt mit Resharper fehl und es muss zwingend Chutzpah verwendet werden, da wir hier directiven mit "TemplateUrl" verwenden.

//Angular Modul definieren in dem unsere Directive enthalten ist die wir testen wollen
angular.module("app.uiDirectives", ["ui.directives"]);

//siteRoot Definieren, denn das Template greift bei der TemplateURL auf diese Variable zu.
var siteRoot = "";

describe('Testen der "ui.directives"', function () {
    var element, $rootScope, directiveScope, $compile;

    beforeEach(function () {
        //Unsere Main App laden
        angular.mock.module("app.uiDirectives");
        angular.mock.inject(function (_$rootScope_, _$compile_) {
            //Compiler und RootScope laden
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('"sxpToggleFilter" Direktive testen', function () {
        beforeEach(function () {
            inject(function ($templateCache) {
                //Unserem Template eine passende Klasse zuweisen die wir hier finden und dann das Template
                //Dem Cache zuweisen - Geht nur mit Chutzpah mit Resharper schlägt der Test fehl, da in Chutzpah
                //über die Referenzierung von "template" der HTML Code im Test abgelegt wird bei Resharper nicht!
                var template = jQuery(".sxp-toggle-filter")[0].outerHTML;
                $templateCache.put("ScriptsApp/directives/templates/ui.directives.toggleFilter.html", template);
            });
        });

        beforeEach(function () {
            element = angular.element('<div><div id="toggleFilter" sxp-toggle-filter="locals.ShowFilter"></div></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(sxpToggleFilter) ShowFilter Startwert ist "true"', function () {
            $rootScope.$apply(function () { //manuelles Apply anstoßen.
                $rootScope.locals = { ShowFilter: true }; //Unserer Variablen den Wert zuweisen.
            });
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#toggleFilter", element).hasClass("btn-primary")).toBeTruthy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-default")).toBeFalsy();
        });

        it('(sxpToggleFilter) ShowFilter Startwert ist "false"', function () {
            $rootScope.$apply(function () { //manuelles Apply anstoßen.
                $rootScope.locals = { ShowFilter: false }; //Unserer Variablen den Wert zuweisen.
            });
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#toggleFilter", element).hasClass("btn-default")).toBeTruthy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-primary")).toBeFalsy();
        });

        it('(sxpToggleFilter) ShowFilter Startwert ist "false" Toggeln der Werte prüfen', function () {
            $rootScope.$apply(function () { //manuelles Apply anstoßen.
                $rootScope.locals = { ShowFilter: false }; //Unserer Variablen den Wert zuweisen.
            });
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#toggleFilter", element).hasClass("btn-default")).toBeTruthy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-primary")).toBeFalsy();
            $("#toggleFilter", element).click();
            expect($rootScope.locals.ShowFilter).toBeTruthy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-default")).toBeFalsy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-primary")).toBeTruthy();
            $("#toggleFilter", element).click();
            expect($rootScope.locals.ShowFilter).toBeFalsy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-default")).toBeTruthy();
            expect(jQuery("#toggleFilter", element).hasClass("btn-primary")).toBeFalsy();
        });
    });

    describe('"sxpSelectAll" Direktive testen', function () {
        beforeEach(function () {
            element = angular.element('<div><div id="selectAllId" sxp-select-all="locals.Entries" sxp-property-name="locals.SelectedPropertyName" sxp-is-value-selected="locals.IsValueSelected"></div></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(sxpSelectAll) No Entry selected and the SelectAll Checkbox is Clicked then every Entry is selected', function () {
            //manuelles Apply anstoßen.
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IsSelected: false }, { Text: "test2", IsSelected: false }, { Text: "test3", IsSelected: false }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IsSelected'
            }
            });

            //das Click Event muss direkt auf der Checkbox ausgeführt werden.
            ("#selectAllId", element)[0].firstChild.click();
            expect($rootScope.locals.Entries[0].IsSelected).toBeTruthy();
            expect($rootScope.locals.Entries[1].IsSelected).toBeTruthy();
            expect($rootScope.locals.Entries[2].IsSelected).toBeTruthy();
            expect($rootScope.locals.IsValueSelected).toBeTruthy();
        });

        it('(sxpSelectAll) Only one Entry is selected and the SelectAll Checkbox is Clicked then every Entry is selected', function () {
            //manuelles Apply anstoßen.
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IsSelected: true }, { Text: "test2", IsSelected: false }, { Text: "test3", IsSelected: false }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IsSelected'
            }
            });

            //das Click Event muss direkt auf der Checkbox ausgeführt werden.
            ("#selectAllId", element)[0].firstChild.click();
            expect($rootScope.locals.Entries[0].IsSelected).toBeTruthy();
            expect($rootScope.locals.Entries[1].IsSelected).toBeTruthy();
            expect($rootScope.locals.Entries[2].IsSelected).toBeTruthy();
            expect($rootScope.locals.IsValueSelected).toBeTruthy();
        });

        it('(sxpSelectAll) No entry selected and only two entries out of 3 are selected', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IsSelected: false }, { Text: "test2", IsSelected: false }, { Text: "test3", IsSelected: false }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IsSelected'
            }
            });

            $rootScope.locals.Entries[0].IsSelected = true;
            $rootScope.locals.Entries[1].IsSelected = true;
            $rootScope.$apply();
            expect($rootScope.locals.IsValueSelected).toBeTruthy();
        });

        it('(sxpSelectAll) All Entries are selected and the SelectAll Checkbox is Clicked then no Entry is selected', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IsSelected: true }, { Text: "test2", IsSelected: true }, { Text: "test3", IsSelected: true }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IsSelected'
            }
            });

            //das Click Event muss direkt auf der Checkbox ausgeführt werden.
            ("#selectAllId", element)[0].firstChild.click();
            expect($rootScope.locals.Entries[0].IsSelected).toBeFalsy();
            expect($rootScope.locals.Entries[1].IsSelected).toBeFalsy();
            expect($rootScope.locals.Entries[2].IsSelected).toBeFalsy();
            expect($rootScope.locals.IsValueSelected).toBeFalsy();
        });

        it('(sxpSelectAll) Two tree entries are deselected and one is selected', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IsSelected: true }, { Text: "test2", IsSelected: true }, { Text: "test3", IsSelected: true }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IsSelected'
            }
            });

            $rootScope.locals.Entries[0].IsSelected = false;
            $rootScope.locals.Entries[2].IsSelected = false;
            $rootScope.$apply();
            expect($rootScope.locals.IsValueSelected).toBeTruthy();
        });

        it('(sxpSelectAll) The Selected Properties name is "IstAusgewaehlt" and the SelectAll Button is Clicked and alle Entries get selected', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [{ Text: "test1", IstAusgewaehlt: false }, { Text: "test2", IstAusgewaehlt: false }, { Text: "test3", IstAusgewaehlt: false }],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IstAusgewaehlt'
                }
            });

            ("#selectAllId", element)[0].firstChild.click();
            expect($rootScope.locals.Entries[0].IstAusgewaehlt).toBeTruthy();
            expect($rootScope.locals.Entries[1].IstAusgewaehlt).toBeTruthy();
            expect($rootScope.locals.Entries[2].IstAusgewaehlt).toBeTruthy();
            expect($rootScope.locals.IsValueSelected).toBeTruthy();
        });

        it('(sxpSelectAll) The Selected All Checkbox is hidden, when the List "Entries" has no entries', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = {
                    Entries: [],
                    IsValueSelected: false,
                    SelectedPropertyName: 'IstAusgewaehlt'
                }
            });

            var e = ("#selectAllId", element)[0].firstChild;
            expect(jQuery(e).hasClass("ng-hide")).toBeTruthy();
        });

        describe('Extended Test - alternatives Template in dem der Propertyname als Text übergeben wird.', function () {
            beforeEach(function () {
                //Den Propertynamen hier als String übergeben und nicht als Angular Property.
                element = angular.element('<div><div id="selectAllId" sxp-select-all="locals.Entries" sxp-property-name="\'IstAusgewaehlt\'" sxp-is-value-selected="locals.IsValueSelected"></div></div>');
                $compile(element)($rootScope);
                directiveScope = element.isolateScope();
                $rootScope.$digest();
            });

            it('(sxpSelectAll) The Selected Properties name is "IstAusgewaehlt" and the SelectAll Button is Clicked and alle Entries get selected', function () {
                $rootScope.$apply(function () {
                    $rootScope.locals = {
                        Entries: [{ Text: "test1", IstAusgewaehlt: false }, { Text: "test2", IstAusgewaehlt: false }, { Text: "test3", IstAusgewaehlt: false }],
                        IsValueSelected: false
                    }
                });

                ("#selectAllId", element)[0].firstChild.click();
                expect($rootScope.locals.Entries[0].IstAusgewaehlt).toBeTruthy();
                expect($rootScope.locals.Entries[1].IstAusgewaehlt).toBeTruthy();
                expect($rootScope.locals.Entries[2].IstAusgewaehlt).toBeTruthy();
                expect($rootScope.locals.IsValueSelected).toBeTruthy();
            });
        });
    });
});

