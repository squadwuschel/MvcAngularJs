function DropDownlistCtrl($log, $scope, dropDownlistSrv) {
    var scope = $scope, log = $log;

    $scope.selectedIndex = -1;

    $scope.ValueChanger = function () {
        //Im selectedIndex liegt unser Komplettes "Objekt", daher können wir hier auch auf Text und Value zugreifen.
        return "Text: " + scope.selectedIndex.Text + " Value: " + scope.selectedIndex.Value;
    };

    // http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/
    $scope.$watch('selectedIndex', function () {
        // log.log("Watch called");
    });


    //http://stackoverflow.com/questions/13047923/working-with-select-using-angulars-ng-options
    $scope.LoadListData = function () {
        dropDownlistSrv.loadLevelsData().then(function (data) {
            scope.Levels = data;
            log.log(scope.Person);
        });
    };

    $scope.ResetListData = function () {
        scope.selectedIndex = -1;
    }
}


angular.module("app.dropDownlistCtrl", ["app.dropDownlistSrv"])
    .controller("dropDownlistCtrl", DropDownlistCtrl);