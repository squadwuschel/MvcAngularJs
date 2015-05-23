function DemoDataSrv($log, $http) {
    this.log = $log, this.http = $http;
}

DemoDataSrv.prototype.getDemoData = function () {
    var config = {
        params: {
            'rows': 50,
            'id': '{index}',
            'fname': '{firstName}',
            'lname': '{lastName}',
            'tel': '{phone|format}',
            'gehalt': '{randomNumberLength}',
            'bonus': '{randomNumberLength|3}',
            'birthdate' : '{date}',
            'callback': "JSON_CALLBACK"
        }
    }
    //https://www.youtube.com/watch?v=fkSXAnUFC4Y
    return this.http.jsonp("http://www.filltext.com", config, {}).then(function (result) {
        return result.data;
    });
}

angular.module("app.demoDataSrv", [])
        .service('demoDataSrv', DemoDataSrv);