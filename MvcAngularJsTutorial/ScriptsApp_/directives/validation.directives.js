//http://www.ng-newsletter.com/posts/validations.html
//http://www.benlesh.com/2012/12/angular-js-custom-validation-via.html
angular.module("validation.directives", [])
    .directive("sqPasswordsEqual", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, modelCtrl) {
                var validator = function (value) {
               
                    //Aus den Attributen: 'sq-passwords-equal="inputPassword3" sq-frm-name="frm"'
                    //das passende Eingabefeld suchen und beide Werte überprüfen
                    //am sichersten ist es hier direkt auf die Form Controls zuzugreifen.
                    var pw1 = scope[attr.sqFrmName][attr.sqPasswordsEqual];
                    if (pw1.$modelValue === value) {
                        //"passwordsequal" als neue "$error" Variable zur Verfügung stellen die dann 
                        //auf der Webseite überprüft werden kann.
                        modelCtrl.$setValidity('passwordsequal', true);
                    } else {
                        modelCtrl.$setValidity('passwordsequal', false);
                    }

                    //WICHTIG den Eingabewert auch zurückgeben, sonst landet im Model kein Wert mehr!
                    return value;
                }

                //Unseren Validator den passenden Listen hinzufügen.
                modelCtrl.$parsers.unshift(validator);    //view-to-model direction
                modelCtrl.$formatters.unshift(validator); //model-to-view direction
            }
        }
    }).directive("sqEmailExists", ["$http", function($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, modelCtrl) {
                var validator = function (value) {
                    //Die passende ajax Funktion aufrufen und das entsprechende Ergebnis auswerten.
                    $http.get("/Home/CheckEmailExists?mail=" + encodeURIComponent(value)).then(function(result) {
                        if (result.data == "true") {
                            modelCtrl.$setValidity('emailexists', false);
                        } else {
                            modelCtrl.$setValidity('emailexists', true);
                        }
                    });

                    //WICHTIG den Eingabewert auch zurückgeben, sonst landet im Model kein Wert mehr!
                    return value;
                }

                //Unseren Validator den passenden Listen hinzufügen.
                modelCtrl.$parsers.unshift(validator);    //view-to-model direction
                modelCtrl.$formatters.unshift(validator); //model-to-view direction
            }
        }
}]);