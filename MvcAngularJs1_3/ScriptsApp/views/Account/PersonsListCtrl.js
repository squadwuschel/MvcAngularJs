angular.module("PersonListCtrl", [])
    .controller("PersonListCtrl", function () {

        this.persons = [{ Name: "Blubb", Alter: 12, Id: 1 }, { Name: "Test", Alter: 23, Id: 2 }, { Name: "Wurst", Alter: 33, Id: 3 }, { Name: "Pflanze", Alter: 52, Id: 4 }];

    });