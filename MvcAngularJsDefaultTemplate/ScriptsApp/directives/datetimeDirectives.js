angular.module("app.datetimeDirectives", [])
       .directive("datetimeInputTwoWayFilter", function ($log) {
           return {
               //Damit das ISO Format Datum was wir per JSON von MVC bekommen
               //auch im Standard Format angezeigt wird, kann man keinen Standard
               //Filter verwenden bei "ng-model". Sondern man muss über die Direktive gehen.
               //Die direktive wird als Attribut beim passenden Inputfeld gesetzt.
               //Wir verwenden momentJs um das Datum aus dem ISO Format zu parsen und dann
               //wieder entsprechend anzuzeigen beim "formater" und beim "parser" geben wir wieder
               //das passende ISO Format an unser Model zurück.
               require: "ngModel",
               link: function (scope, element, attrs, ngModelCtrl) {
                   //http://java.dzone.com/articles/parsers-and-formatters-custom
                   ngModelCtrl.$parsers.push(function (data) {
                       //convert data from view format to model format
                       var time = new moment(data, "DD.MM.YYYY");
                       //Wieder ins ISO Format zurückkonvertieren
                       return time.format(); //converted
                   });

                   ngModelCtrl.$formatters.push(function (data) {
                       //das Datum vom ISO in das unten angegebene Format überführen.
                       var time = new moment(data);
                       data = time.format("DD.MM.YYYY");
                       //convert data from model format to view format
                       return data; //converted
                   });
               }
           }
       })