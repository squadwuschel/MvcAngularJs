function MessageConfig($provide, $httpProvider) {
    //var scope = undefined, logging = undefined;
    //http://djds4rce.wordpress.com/2013/08/13/understanding-angular-http-interceptors/
    // Intercept http calls.
    $provide.factory('MyHttpMessageInterceptor', function ($q, $log, $injector, $rootScope) {
        var log = $log,
            rootScope = $rootScope,
            that = this;

        //Prüfen ob im Scope bereits eine MessageListe "initialisiert" wurde.
        if (rootScope.MessageList === undefined) {
            rootScope.MessageList = []; //MessageListe "initialisieren"
        }

        //Schließen der aktuellen Message - es wird nach dem Text gesucht
        $rootScope.CloseMessage = function (messageText) {
            if (rootScope.MessageList !== undefined) {
                for (var i = 0; i < $rootScope.MessageList.length; i++) {
                    if (rootScope.MessageList[i].Text === messageText) {
                        //Eintrag aus dem Array löschen!
                        rootScope.MessageList.splice(i, 1);
                        break;
                    }
                }
            }
        };

        //Prüfen, ob bereits eine Meldung mit dem übergebenen Text in der aktuellen Messageliste enthalten ist
        this.MessageListContainsMessage = function (messageText) {
            for (var i = 0; i < rootScope.MessageList.length; i++) {
                //Wenn der Text bereits in der Liste enthalten ist True zurückgeben.
                if (rootScope.MessageList[i].Text === messageText) {
                    return true;
                }
            }
            return false;
        }

        //Meldung unserer Meldungsliste hinzufügen - Kann später auch von anderen Modulen aufgerufen werden, da
        //diese Funktion im RootScope abgelegt wird!
        $rootScope.AddMessage = function (data) {
            //Prüfen ob unsere Response Daten auch eine MessageListe enthalten
            if (data.MessageList !== undefined) {
                //Die Liste mit den Übergebenen Meldungen durchgehen und jede einzelne Meldung
                //unserer Fehlerliste Hinzufügen, wenn es die gleiche Meldung nicht bereits gibt.
                for (var i = 0; i < data.MessageList.length; i++) {
                    if (!that.MessageListContainsMessage(data.MessageList[i].Text)) { //Prüfen ob die Meldung bereits existiert.
                        rootScope.MessageList.push(data.MessageList[i]); //Meldung unserer Meldungsliste hinzufügen
                    }
                }
            }
        }

        //Unseren Requestzähler nutzen um einen Spinner anzuzeigen.
        $rootScope.spinner = 0;

        //Auswerten der Requests, bzw. Responses
        return {
            // On request success
            request: function (config) {
                //Den Spinner bei Bedarf "nullen"/zurücksetzen
                if ($rootScope.spinner < 0) {
                    $rootScope.spinner = 0;
                }
                //Wenn ein Request ausgelöst wird, den spinner hochzählen
                $rootScope.spinner++;

                // Return the config or wrap it in a promise if blank.
                return config || $q.when(config);
            },

            // On request failure
            requestError: function (rejection) {
                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                $rootScope.spinner--;
                $rootScope.AddMessage(response.data);
                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {
                $rootScope.spinner--;
                $rootScope.AddMessage(rejection.data);
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    });

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('MyHttpMessageInterceptor');
};

//Modul für Meldungen - Einfach als Abhängigkeit dem Hauptprogramm hinzufügen
//und den "rest" der Arbeit übernimmt das Modul von "allein" Hinzufügen der Meldungen zu Meldungsliste.
angular.module("app.Messages", [])
    .config(MessageConfig);