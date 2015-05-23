//Prüfen ob der String der übergeben wurde leer ist.
function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

//http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


angular.module("number.directives", [])
 /**
* Provide number validation for any input.
*
* html ...
* <input
*   ng-model=""
*   sxp-is-number>
* ...
*/
 .directive('sxpIsNumber', function () {
     return {
         restrict: 'A',
         require: 'ngModel',
         link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (value) {
                 //Ist notwendig für 'ng-required' 
                 if (value === undefined) return '';

                 var transformedInput = value.replace(/[^0-9\,]/g, '');
                 //prüfen ob noch weitere Kommas im String enthalten sind außer dem "ersten"
                 if (transformedInput.indexOf(',') !== transformedInput.lastIndexOf(',')) {
                     var strarray = transformedInput.split('');
                     for (var i = transformedInput.indexOf(',')+1 ; i < strarray.length; i++) {
                         //Jedes weitere Komma nach dem ersten wird entfernt.
                         if (strarray[i] === ',') {
                             strarray.splice(i, 1);
                         }
                     }
                     //Den String wieder zusammenbauen
                     transformedInput = strarray.join('');
                 }

                 if (transformedInput !== value) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }

                 return transformedInput;
             });
         }
     }
     /*
      Provide number validation for any input.
     
      html ...
      <input
        ng-model=""
        sxp-is-single-number>
      ...
     */
 }).directive('sxpIsSingleNumber', function () {
     return {
         restrict: 'A',
         require: 'ngModel',
         link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (value) {
                 //Ist notwendig für 'ng-required' 
                 if (value === undefined) return '';

                 var transformedInput = value.replace(/[^0-9]/g, '');
                 if (transformedInput != value) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }

                 return transformedInput;
             });
         }
     }
 })
/*
Validation Direktive
ngMin: Prüft das die eingegeben Zahl nicht kleiner wie der eingegebene Wert
ng-min="23" oder auch ng-min="0.01" (KEINE KOMMA Verwenden!)
Verwendung:

html...
<input type="text" 
name="alter" 
ng-model="modelVar" 
sxp-min="120" />
...html
*/
 .directive('sxpMin', function () {
     return {
         restrict: 'A',
         require: 'ngModel',
         link: function (scope, elem, attr, ctrl) {
             scope.$watch(attr.sxpMin, function () {
                 ctrl.$setViewValue(ctrl.$viewValue);
             });
             var minValidator = function (value) {
                 var min = scope.$eval(attr.sxpMin) || 0;
                 //Wenn es sich um keine Zahl handelt ist es eine "richtige" Eingabe da wir nicht wissen ob es sich um einen größeren oder kleineren Eintrag handelt.
                 if (!isEmpty(value) && !isNumber(value)) {
                     ctrl.$setValidity('sxpMin', true);
                     return value;
                 }

                 if (!isEmpty(value) && ((value.replace !== undefined && parseFloat(value.replace(',', '.')) < min) || value < min)) {
                     ctrl.$setValidity('sxpMin', false);
                 } else {
                     ctrl.$setValidity('sxpMin', true);
                 }
                 return value;
             };

             ctrl.$parsers.push(minValidator);
             ctrl.$formatters.push(minValidator);
         }
     };
 })
/*
Validation Direktive
ngMax: Prüft das die eingegeben Zahl nicht größer wie der eingegebene Wert
ng-max="23" oder auch ng-max="110.31" (KEINE KOMMA Verwenden!)

Verwendung:

html...
<input type="text" 
name="alter" 
ng-model="modelVar" 
sxp-max="120">
...html
*/
  .directive('sxpMax', function () {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, elem, attr, ctrl) {
              scope.$watch(attr.sxpMax, function () {
                  ctrl.$setViewValue(ctrl.$viewValue);
              });
              var maxValidator = function (value) {
                  var max = scope.$eval(attr.sxpMax) || Infinity;
                  //Wenn es sich um keine Zahl handelt ist es eine "richtige" Eingabe da wir nicht wissen ob es sich um einen größeren oder kleineren Eintrag handelt.
                  if (!isEmpty(value) && !isNumber(value)) {
                      ctrl.$setValidity('sxpMax', true);
                      return value;
                  }

                  //da JavaScript in Dezimalzahlen keine "," erkennt müssen wir dies vor der Prüfung
                  //entsprechend ändern.
                  if (!isEmpty(value) && ((value.replace !== undefined && parseFloat(value.replace(',', '.')) > max) || value > max)) {
                      ctrl.$setValidity('sxpMax', false);
                  } else {
                      ctrl.$setValidity('sxpMax', true);
                  }
                  return value;
              };

              ctrl.$parsers.push(maxValidator);
              ctrl.$formatters.push(maxValidator);
          }
      };
  });