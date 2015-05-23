/// <reference path="../../MvcAngularJs1_3/mvcangularjs1_3/scripts/jasmine.js" />
/// <reference path="../../mvcangularjs1_3/scriptsapp/customjs.js" />
describe('Testen der Calc Funktion', function() {
    var calculator;
    //Wird vor jedem Test ausgeführt
    beforeEach(function() {
        calculator = new calc();
    });

   
    it('2 plus 4 ergibt 6', function () {
        var result = calculator.add(2, 4);
        expect(result).toBe(6);
    });
});