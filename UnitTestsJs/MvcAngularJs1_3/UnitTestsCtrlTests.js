/// <reference path="../../MvcAngularJs1_3/mvcangularjs1_3/scripts/jasmine.js" />
/// <reference path="../../mvcangularjs1_3/scripts/jquery-2.1.1.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular.js" />
/// <reference path="../../mvcangularjs1_3/scripts/angular-mocks.js" />
/// <reference path="../../mvcangularjs1_3/scriptsapp/views/home/unittestsctrl.js" />

//Test App erstellen die nur unseren Controller als Abhängigkeit hat und alle restlichen Abhängigkeiten der "app.main" entfallen
angular.module("app.unitTest", ["unitTestsCtrl"]);

describe('Tests für den Controller: "UnitTestsCtrl"', function() {
    var ctrl, $scope;
    var mockHomePSrv;

    //Vor jedem Test ausführen um alle Abhängigkeiten für für diesen Controller zu laden.
    beforeEach(function() {
        mockHomePSrv = jasmine.createSpyObj('homePSrv', ['InitUnitTestPersonEntry', 'InitUnitTestSearchModel', 'UnitTestResultModel', 'AddUnitTestPerson' ]);
        //Unsere Main App laden
        module('app.unitTest');

        inject(function (_$rootScope_, $controller, $q) {
            //einen neuen Scope erstellen
            $scope = _$rootScope_.$new();

            //Unseren Service Mocken und alle verwendeten Aufrufe.
            mockHomePSrv.UnitTestResultModel.and.returnValue($q.when('UnitTestResultModelData'));
            mockHomePSrv.InitUnitTestPersonEntry.and.returnValue($q.when('InitUnitTestPersonEntryData'));
            mockHomePSrv.AddUnitTestPerson.and.returnValue($q.when('AddUnitTestPersonData'));
            mockHomePSrv.InitUnitTestSearchModel.and.returnValue($q.when('InitUnitTestSearchModelData'));

            //spyOn(UnitTestsCtrl.prototype, 'Init');

            ctrl = $controller('unitTestsCtrl', {
                homePSrv: mockHomePSrv,
                $scope: $scope
            });

        });
    });

    describe('$scope und this variablen Tests', function() {

        it('should have the value: "Test für Scope, obwohl wir den nicht verwenden"', function () {
            expect($scope.variable).toEqual('Test für Scope, obwohl wir den nicht verwenden');
        });

        it('should be initialized: homePSrv', function() {
            expect(ctrl.homePSrv).not.toBeNull();
            expect(ctrl.homePSrv).not.toBeUndefined();
        });

        it('should be initialized: PersonEntry', function () {
            expect(ctrl.PersonEntry).not.toBeNull();
            expect(ctrl.PersonEntry).not.toBeUndefined();
        });

        it('should be initialized: ViewModel', function () {
            expect(ctrl.ViewModel).not.toBeNull();
            expect(ctrl.ViewModel).not.toBeUndefined();

            expect(ctrl.ViewModel.ShowAddPerson).toBeFalsy();
            expect(ctrl.ViewModel.ShowAddPerson).toBeFalsy();
        });

        it('should be initialized: ViewModel', function () {
            expect(ctrl.SearchModel).not.toBeNull();
            expect(ctrl.SearchModel).not.toBeUndefined();
        });

        it('should be initialized: ResultModel', function () {
            expect(ctrl.ResultModel).not.toBeNull();
            expect(ctrl.ResultModel).not.toBeUndefined();
        });
    });

    describe('Test für Funktionen des Controller', function () {

        it('Funktion "Init" wird aufgerufen wenn der Controller initialisiert wird.', function () {
            //Da auchder Service aufgerufen wird beim Init, einfach prüfen ob der Service auch aufgerufen wurde.
            expect(mockHomePSrv.InitUnitTestSearchModel).toHaveBeenCalled();
            //expect(ctrl.Init).toHaveBeenCalled();
        });

        it('Funktion "Init" wird aufgerufen', function () {
            spyOn(ctrl, 'Search');
            spyOn(ctrl, 'Init');
            ctrl.Init();
            $scope.$digest();
            expect(ctrl.Init).toHaveBeenCalled();
            expect(ctrl.Search).toHaveBeenCalled();
            expect(ctrl.SearchModel).toMatch('InitUnitTestSearchModelData');
        });

        it('Funktion "Search" wird aufgerufen', function () {
            $scope.$digest();
            spyOn(ctrl, 'Search');
            ctrl.Search();
            expect(ctrl.Search).toHaveBeenCalled();
            expect(ctrl.ResultModel).toMatch('UnitTestResultModelData');
        });

        it('Funktion "ToggleAddPerson" wird aufgerufen', function() {
            expect(ctrl.ViewModel.ShowAddPerson).toBeFalsy();
            ctrl.ToggleAddPerson();
            $scope.$digest();
            expect(mockHomePSrv.InitUnitTestPersonEntry).toHaveBeenCalled();
            expect(ctrl.PersonEntry).toMatch('InitUnitTestPersonEntryData');
            expect(ctrl.ViewModel.ShowAddPerson).toBeTruthy();
            ctrl.ToggleAddPerson();
            expect(ctrl.ViewModel.ShowAddPerson).toBeFalsy();
        });

        it('Funktion "AddPerson" wird aufgerufen Age == 19', function () {
            ctrl.PersonEntry.Age = 19;
            spyOn(ctrl, 'ToggleAddPerson');
            spyOn(ctrl, 'Search');
            ctrl.AddPerson();
            expect(ctrl.Search).not.toHaveBeenCalled();
            expect(ctrl.ToggleAddPerson).not.toHaveBeenCalled();

        });

        it('Funktion "AddPerson" wird aufgerufen Age == 22', function () {
            ctrl.PersonEntry.Age = 22;
            spyOn(ctrl, 'ToggleAddPerson');
            spyOn(ctrl, 'Search');
            ctrl.AddPerson();
            $scope.$digest();
            expect(ctrl.Search).toHaveBeenCalled();
            expect(ctrl.ToggleAddPerson).toHaveBeenCalled();
        });
    });
   
});
