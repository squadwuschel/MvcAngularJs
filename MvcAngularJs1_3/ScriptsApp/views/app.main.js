angular.module("app.main", [
        "ui.router",
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "mgcrea.ngStrap",
        "number.directives",
        "mainCtrl",
        "app.homePSrv",
        "AngularStrapModalCtrl",
        "DirectiveTestsCtrl",
        "FormValidationCtrl",
        "HighChartsCtrl",
        "ModelBinderOhneWatchCtrl",
        "TemplateUrlTestCtrl",
        "testTemplateDirective",
        "PersonListCtrl",
        "ManageRightsCtrl",
        "ngPatternCtrl",
        "unitTestsCtrl"
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //http://scotch.io/tutorials/javascript/angular-routing-using-ui-router

        //$urlRouterProvider.when('/Home', '/home/index');
        //$urlRouterProvider.otherwise("/Home/HighCharts");
        //$locationProvider.html5Mode(true);

        $stateProvider
            //Home Controller
            .state("Home", {
                url: "/Home",
                templateUrl: "Home/Submenue"
            })
            .state("Home.HighCharts", {
                url: "/HighCharts",
                templateUrl: "Home/HighCharts"
            })
            .state("Home.Formvalidation", {
                url: "/Formvalidation",
                templateUrl: "Home/Formvalidation"
            })
            .state("Home.ModelBinderOhneWatch", {
                url: "/ModelBinderOhneWatch",
                templateUrl: "Home/ModelBinderOhneWatch"
            })
            .state("Home.DirectiveTests", {
                url: "/DirectiveTests",
                templateUrl: "Home/DirectiveTests"
            })
            .state("Home.AngularStrapModal", {
                url: "/AngularStrapModal",
                templateUrl: "Home/AngularStrapModal"
            })
            .state("Home.TemplateUrlTest", {
                url: "/TemplateUrlTest",
                templateUrl: "Home/TemplateUrlTest"
            })
            .state("Home.NgPattern", {
                url: "/NgPattern",
                templateUrl: "Home/NgPattern"
            })
            .state("Home.UnitTests", {
                url: "/UnitTests",
                templateUrl: "Home/UnitTests"
            })
            //Account Controller
            .state("Account", {
                url: "/Account",
                templateUrl: "Account/AccountSubmenue"
            })
            .state("Account.PersonsList", {
                url: "/Persons",
                templateUrl: "Account/PersonsList"
            })
            .state("Account.ManageRights", {
                url: "/Rights/:personId?Name",
                templateUrl: "Account/ManageRights"
            })
            .state("Account.AddPerson", {
                url: "/Add",
                templateUrl: "Account/AddPerson"
            });
    }
    ]);