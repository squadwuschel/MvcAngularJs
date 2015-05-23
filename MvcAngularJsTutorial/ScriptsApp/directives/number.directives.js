angular.module("number.directives", [])
 .directive('isNumber', function () {
     return {
         restrict: 'A',
         require: 'ngModel',
         link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (value) {
                 //Ist notwendig für 'ng-required' 
                 if (value === undefined) return '';

                 var transformedInput = value.replace(/[^0-9\,]/g, '');
                 if (transformedInput.indexOf(',') !== transformedInput.lastIndexOf(',')) {
                     transformedInput = transformedInput.replace(/,$/g, '');
                 }

                 if (transformedInput !== value) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }

                 return transformedInput;
             });
         }
     };
 /**
 * Provide number validation for any input.
 *
 * html ...
 * <input
 *   ng-model=""
 *   is-single-number>
 * ...
 */
 }).directive('isSingleNumber', function () {
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
 });