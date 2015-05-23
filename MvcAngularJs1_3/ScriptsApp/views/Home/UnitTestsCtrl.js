function UnitTestsCtrl(homePSrv, $scope) {
    var that = this;
    this.homePSrv = homePSrv;
    this.PersonEntry = {};
    this.ViewModel = {};
    this.ViewModel.ShowAddPerson = false;
    this.SearchModel = {};
    this.ResultModel = {};

    $scope.variable = "Test für Scope, obwohl wir den nicht verwenden";

    this.Init();
}

UnitTestsCtrl.prototype.Init = function() {
    var that = this;
    this.homePSrv.InitUnitTestSearchModel().then(function(result) {
        that.SearchModel = result;
        that.Search();
    });
}

UnitTestsCtrl.prototype.Search = function() {
    var that = this;
    this.homePSrv.UnitTestResultModel(that.SearchModel).then(function(result) {
        that.ResultModel = result;
    });
}

UnitTestsCtrl.prototype.ToggleAddPerson = function () {
    var that = this;
    this.ViewModel.ShowAddPerson = !this.ViewModel.ShowAddPerson;

    if (this.ViewModel.ShowAddPerson) {
        this.homePSrv.InitUnitTestPersonEntry().then(function(result) {
            that.PersonEntry = result;
        });
    }
}

UnitTestsCtrl.prototype.AddPerson = function() {
    var that = this;

    if (that.PersonEntry.Age > 21) {
        this.homePSrv.AddUnitTestPerson(that.PersonEntry).then(function (result) {
            that.ToggleAddPerson();
            that.Search();
        });
    }
}

angular.module("unitTestsCtrl", [])
    .controller("unitTestsCtrl", UnitTestsCtrl);











