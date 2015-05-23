angular.module("mainCtrl", [])
    .controller("mainCtrl", function ($state) {

        this.MenueAccountActive = function () {
            return $state.includes('Account');
        }

        this.MenueHomeActive = function () {
            return $state.includes('Home');
        }
    });