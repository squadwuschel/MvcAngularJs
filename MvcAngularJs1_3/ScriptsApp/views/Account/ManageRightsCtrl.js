angular.module("ManageRightsCtrl", [])
    .controller("ManageRightsCtrl", function ($stateParams) {

        this.ViewModel = {};
        //Die URL Parameter auslesen
        this.ViewModel.IdToEdit = $stateParams.personId;
        this.ViewModel.Name = $stateParams.Name;

    });