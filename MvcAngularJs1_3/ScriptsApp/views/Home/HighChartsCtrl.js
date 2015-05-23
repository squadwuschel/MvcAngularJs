angular.module("HighChartsCtrl", [])
.controller("HighChartsCtrl", function ($http) {
    var that = this;
    this.ViewModel = {};
    this.ViewModel.Age = 25;
    this.ViewModel.IllnessDays = 1;

    $http.get('/Home/LoadTempratureChartData').then(function (result) {
        that.ViewModel.Temperature = result.data;
    });

    $http.get('/Home/LoadIllnessChartData').then(function (result) {
        that.ViewModel.Illness = result.data;
    });


    this.AddIllness = function (name) {
        for (var i = 0; i < that.ViewModel.Illness.series.length; i++) {
            if (that.ViewModel.Illness.series[i].name === name) {
                var data = [that.ViewModel.Age, that.ViewModel.IllnessDays];
                that.ViewModel.Illness.series[i].data.push(data);
                break;
            }
        }
    }

})
.directive("sqChart", function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            chartData: "="
        },
        link: function (scope, element, attr) {
            scope.$watch('chartData.series', function () {
                if (scope.chartData !== undefined && scope.chartData.series !== undefined) {
                    element.highcharts(scope.chartData);
                }
            }, true);
        }
    }
});