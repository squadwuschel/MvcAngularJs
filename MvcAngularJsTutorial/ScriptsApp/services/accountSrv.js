function accountSrv($http, $log) {
    $log.log("accountSrv initialisiert");
    this.log = $log, this.http = $http;
}

accountSrv.prototype.GetAllPersons = function() {
    return this.http.get('/Account/GetAllPersons').then(function (result) {
        return result.data;
    });
};

accountSrv.prototype.GetPersonModelData = function () {
    return this.http.get('/Account/GetPersonModelData').then(function (result) {
        return result.data;
    });
};

accountSrv.prototype.GetAutModelData = function () {
    return this.http.get('/Account/GetAutModelData').then(function (result) {
        return result.data;
    });
};

accountSrv.prototype.AddPerson = function (person) {
    return this.http.post('/Account/AddPerson', person).then(function (result) {
        return result.data;
    });
}

accountSrv.prototype.DeletePerson = function (personId) {
    return this.http.post('/Account/DeletePerson/' + personId).then(function (result) {
        return result.data;
    });
}

accountSrv.prototype.DeleteAuto = function (autoId) {
    return this.http.post('/Account/DeleteAuto/' + autoId).then(function (result) {
        return result.data;
    });
}

accountSrv.prototype.AddAuto = function (auto, personId) {
    return this.http.post('/Account/AddAuto/' + personId, auto).then(function (result) {
        return result.data;
    });
}

angular.module("accountSrv", [])
    .service("accountSrv", accountSrv);
