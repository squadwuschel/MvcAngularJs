/// <reference path="../../MvcAngularJs1_3/mvcangularjs1_3/scripts/jasmine.js" />
/// <reference path="../../mvcangularjs1_3/scripts/jquery-2.1.1.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular-mocks.js" />
/// <reference path="../../mvcangularjs1_3/scriptsapp/directives/number.directives.js" />

//Angular Modul definieren in dem unsere Directive enthalten ist die wir testen wollen
angular.module("app.numberDirectives", ["number.directives"]);

describe('Testen der sxpMax Directive', function () {
    var element, $rootScope, directiveScope, $compile;

    beforeEach(function () {
        //Unsere Main App laden
        angular.mock.module("app.numberDirectives");
        angular.mock.inject(function (_$rootScope_, _$compile_) {
            //Compiler und RootScope laden
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('Allgemeine Eingabe testen mit festem sxp-max Wert', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.max" sxp-max="90"/></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(ngMax) Inputfeld enthält keinen Wert und ist Valide', function () {
            $rootScope.$apply(function () { //manuelles Apply anstoßen.
                $rootScope.locals = { max: "" }; //Unserer Variablen den Wert zuweisen.
            });
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#alter", element).val()).toMatch("");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "10" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: 10 };
            });
            expect(jQuery("#alter", element).val()).toMatch("10");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "90" und sxpMax ist auch "90" und die Eingabe ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: 90 };
            });
            expect(jQuery("#alter", element).val()).toMatch("90");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält keine Zahl sondern Test "12ab32" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: "12ab32" };
            });
            expect(jQuery("#alter", element).val()).toMatch("12ab32");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "10,56" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: "10,56" };
            });
            expect(jQuery("#alter", element).val()).toMatch("10,56");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "10.56" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: "10.56" };
            });
            expect(jQuery("#alter", element).val()).toMatch("10.56");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "100" und ist InValide da ngMax=90 ist', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: 100 };
            });
            expect(jQuery("#alter", element).val()).toMatch("100");
            expect($rootScope.testFrm.$invalid).toBeTruthy();
            expect($rootScope.testFrm.$error.sxpMax[0].$invalid).toBeTruthy();
        });
    });

    describe('Eingabe testen mit einer Expression in sxp-max Wert', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.max" sxp-max="locals.maxVal"/></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(ngMax) Inputfeld enthält die Zahl "15" MaxVal ist "50", der Wert ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: 15, maxVal: 50 };
            });
            expect(jQuery("#alter", element).val()).toMatch("15");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMax) Inputfeld enthält die Zahl "60" MaxVal ist "50", der Wert ist nicht mehr Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { max: 60, maxVal: 50 };
            });
            expect(jQuery("#alter", element).val()).toMatch("60");
            expect($rootScope.testFrm.$invalid).toBeTruthy();
            expect($rootScope.testFrm.$error.sxpMax[0].$invalid).toBeTruthy();
        });

    });
});

describe('Testen der sxpMin Directive', function () {
    var element, $rootScope, directiveScope, $compile;
    beforeEach(function () {
        //Unsere Main App laden
        angular.mock.module("app.numberDirectives");
        angular.mock.inject(function (_$rootScope_, _$compile_) {
            //Compiler und RootScope laden
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('Allgemeine Eingabe testen mit festem sxp-min Wert', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.min" sxp-min="20"/></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(ngMin) Inputfeld enthält keinen Wert und ist Valide', function () {
            $rootScope.$apply(function () { //manuelles Apply anstoßen.
                $rootScope.locals = { min: "" }; //Unserer Variablen den Wert zuweisen.
            });
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#alter", element).val()).toMatch("");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "30" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: 30 };
            });
            expect(jQuery("#alter", element).val()).toMatch("30");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "20" und sxpMin ist auch "20" und die Eingabe ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: 20 };
            });
            expect(jQuery("#alter", element).val()).toMatch("20");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält keine Zahl sondern Test "12ab32" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: "12ab32" };
            });
            expect(jQuery("#alter", element).val()).toMatch("12ab32");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "20,56" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: "20,56" };
            });
            expect(jQuery("#alter", element).val()).toMatch("20,56");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "20.56" und ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: "20.56" };
            });
            expect(jQuery("#alter", element).val()).toMatch("20.56");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "10" und ist InValide da ngMin=20 ist', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: 10 };
            });
            expect(jQuery("#alter", element).val()).toMatch("10");
            expect($rootScope.testFrm.$invalid).toBeTruthy();
            expect($rootScope.testFrm.$error.sxpMin[0].$invalid).toBeTruthy();
        });
    });

    describe('Eingabe testen mit einer Expression in sxp-min Wert', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.min" sxp-min="locals.minVal"/></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(ngMin) Inputfeld enthält die Zahl "60" MinVal ist "50", der Wert ist Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: 60, minVal: 50 };
            });
            expect(jQuery("#alter", element).val()).toMatch("60");
            expect($rootScope.testFrm.$valid).toBeTruthy();
        });

        it('(ngMin) Inputfeld enthält die Zahl "40" MinVal ist "50", der Wert ist nicht mehr Valide', function () {
            $rootScope.$apply(function () {
                $rootScope.locals = { min: 40, minVal: 50 };
            });
            expect(jQuery("#alter", element).val()).toMatch("40");
            expect($rootScope.testFrm.$invalid).toBeTruthy();
            expect($rootScope.testFrm.$error.sxpMin[0].$invalid).toBeTruthy();
        });
    });
});

describe('Testen der sxpIsNumber Directive', function () {
    var element, $rootScope, directiveScope, $compile;
    beforeEach(function () {
        //Unsere Main App laden
        angular.mock.module("app.numberDirectives");
        angular.mock.inject(function (_$rootScope_, _$compile_) {
            //Compiler und RootScope laden
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('Allgemeine Eingabe testen für sxpIsNumber', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.nummer" sxp-is-number /></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(sxpIsNumber) In das Inputfeld wird "12ab" eingegeben und es wird aber nur "12" angezeigt!', function () {
            //http://stackoverflow.com/questions/17626604/how-to-trigger-ng-change-in-directive-test-in-angularjs
            //http://stackoverflow.com/questions/26372729/setting-view-value-an-input-field-in-a-unit-test-of-an-angular-form-directive
            //Das Element finden und den Inhalt manuell einfügen und den Trigger auslösen der sagt das etwas eingefügt wurde.
            element.find('input').val("12ab").trigger('input');
            $rootScope.$apply();
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#alter", element).val()).toMatch("12");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12ab09" eingegeben und es wird aber nur "1209" angezeigt!', function () {
            element.find('input').val("12ab09").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("1209");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12,09" eingegeben und es wird aber nur "12,09" angezeigt!', function () {
            element.find('input').val("12,09").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("12,09");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12,09,56" eingegeben und es wird aber nur "12,0956" angezeigt!', function () {
            element.find('input').val("12,09,56").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("12,0956");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12,09,56,456," eingegeben und es wird aber nur "12,0956456" angezeigt!', function () {
            element.find('input').val("12,09,56,456,").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("12,0956456");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12,09ab,56ab,456," eingegeben und es wird aber nur "12,0956456" angezeigt!', function () {
            element.find('input').val("12,09ab,56ab,456,").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("12,0956456");
        });
    });
});

describe('Testen der sxpIsSingleNumber Directive', function () {
    var element, $rootScope, directiveScope, $compile;
    beforeEach(function () {
        //Unsere Main App laden
        angular.mock.module("app.numberDirectives");
        angular.mock.inject(function (_$rootScope_, _$compile_) {
            //Compiler und RootScope laden
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('Allgemeine Eingabe testen für sxpIsSingleNumber', function () {
        beforeEach(function () {
            element = angular.element('<div><form name="testFrm"><input type="text" id="alter" ng-model="locals.nummer" sxp-is-single-number /></form></div>');
            $compile(element)($rootScope);
            directiveScope = element.isolateScope();
            $rootScope.$digest();
        });

        it('(sxpIsSingleNumber) In das Inputfeld wird "12ab" eingegeben und es wird aber nur "12" angezeigt!', function () {
            //Das Element finden und den Inhalt manuell einfügen und den Trigger auslösen der sagt das etwas eingefügt wurde.
            element.find('input').val("12ab").trigger('input');
            $rootScope.$apply();
            //Unser Element suchen und prüfen ob der Gesetzt Wert über den Scope auch im Feld steht.
            expect(jQuery("#alter", element).val()).toMatch("12");
        });

        it('(sxpIsSingleNumber) In das Inputfeld wird "12ab09" eingegeben und es wird aber nur "1209" angezeigt!', function () {
            element.find('input').val("12ab09").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("1209");
        });

        it('(sxpIsSingleNumber) In das Inputfeld wird "12,09" eingegeben und es wird aber nur "1209" angezeigt!', function () {
            element.find('input').val("12,09").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("1209");
        });

        it('(sxpIsSingleNumber) In das Inputfeld wird "12,09,56" eingegeben und es wird aber nur "120956" angezeigt!', function () {
            element.find('input').val("12,09,56").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("120956");
        });

        it('(sxpIsNumber) In das Inputfeld wird "12,09ab,56ab,456," eingegeben und es wird aber nur "120956456" angezeigt!', function () {
            element.find('input').val("12,09ab,56ab,456,").trigger('input');
            $rootScope.$apply();
            expect(jQuery("#alter", element).val()).toMatch("120956456");
        });
    });
});