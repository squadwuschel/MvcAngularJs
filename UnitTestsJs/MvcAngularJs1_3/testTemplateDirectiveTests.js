/// <template path="../../MvcAngularJs1_3/ScriptsApp/directives/Templates/testTemplate.html" /> 
/// <reference path="../../mvcangularjs1_3/scripts/jquery-2.1.1.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular-mocks.js" />
/// <reference path="../../mvcangularjs1_3/scriptsapp/directives/testtemplatedirective.js" />

var siteRoot = "";

angular.module("app.testtmplate", ["testTemplateDirective"]);

describe("Unit Tests für die Direktive 'testTemplateDirective' ", function() {
    var $rootScope, $compile;

    beforeEach(function() {

        //Unsere Main App laden
        module('app.testtmplate');

        inject(function(_$rootScope_, _$compile_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        });
    });

    describe('Tests für Direktive "testTemplateDirective"', function () {
        beforeEach(function () {
            inject(function ($templateCache) {
                //Unserem Template eine passende Klasse zuweisen die wir hier finden und dann das Template
                //Dem Cache zuweisen - Geht nur mit Chutzpah mit Resharper schlägt der Test fehl, da in Chutzpah
                //über die Referenzierung von "template" der HTML Code im Test abgelegt wird bei Resharper nicht!
                var template = jQuery(".templateTestTemplate")[0].outerHTML;
                $templateCache.put("ScriptsApp/directives/Templates/testTemplate.html", template);
            });
        });

        it('Es wurde ein H1 mit dem Text "Template Test" angelegt', function () {
            var element = $compile("<div><div test-template></div>")($rootScope);
            $rootScope.$digest();

            expect(element.html()).toContain("<h1>Tempalte Test</h1>");
            expect(element.find("h1").length).toBe(1);
        });
    });
})