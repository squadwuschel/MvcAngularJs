﻿
angular.module("app.XeditableView", [
                "xeditable",
                "app.numberDirectives",
                "app.xeditableCtrl"])
.run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});