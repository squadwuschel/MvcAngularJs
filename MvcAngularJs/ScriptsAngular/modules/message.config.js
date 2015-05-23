function MessageConfig($provide, $httpProvider) {
    //http://djds4rce.wordpress.com/2013/08/13/understanding-angular-http-interceptors/
    // Intercept http calls um Meldungen und Spinner Variable hinzuzufügen.
    $provide.factory('MyHttpMessageInterceptor', function ($q, $log, $injector, $rootScope, $interval) {
        $log.log("MessageModule initialized");
        $rootScope.SxpMessage = {};
        $rootScope.SxpMessage.config = {};
        //TimeOut für das Entfernen der Meldungen
        $rootScope.SxpMessage.config.removeTimeOut = 2 * 1000;
        //Wenn sich mehr wie 50 Meldungen in der Liste befinden wird die älteste Meldung entfernt.
        $rootScope.SxpMessage.config.maxMessages = 50;
        var that = this, timer;
        this.msg = $rootScope.SxpMessage;

        //Unser Error Array vom RootScope
        if (that.msg.messages === undefined) {
            that.msg.messages = [];
        }

        //Prüfen ob sich Fehlermeldungen in den Messages befinden.
        that.msg.hasErrorMessage = function() {
            for (var i = 0; i < that.msg.messages.length; i++) {
                var msg = that.msg.messages[i];
                if (msg.typ === that.msg.GetCssStyleName(3)) {
                    return true;
                }
            }
            return false;
        }

        that.msg.alertOpen = false;
        that.msg.toggleAlertOpen = function () {
            that.msg.alertOpen = !that.msg.alertOpen;
        }

        //Prüfen ob sich überhaupt Meldungen in unseren Messages befinden.
        that.msg.hasMessages = function() {
            return that.msg.messages.length > 0;
        }

        //Löschen aller Meldungen aus der Liste.
        that.msg.deleteAllMessages = function () {
            that.msg.messages = [];
        }

        //automatisches Entfernen der Meldungen
        var removeMessages = function () {
            //Wenn bereits ein Timer definiert wurde, nichts "unternehmen"
            if (angular.isDefined(timer)) return;

            //Den Timer starten und die Items entfernen
            timer = $interval(function () {
                var messageIdx = undefined;
                //Alles außer Fehler aus der Liste heraussuchen, denn Fehler werden nicht automatisch ausgeblendet
                for (var i = 0; i < that.msg.messages.length; i++) {
                    if (that.msg.messages[i].NotificationType !== 3) {
                        //Immer den Index des ersten Items ohne Fehler ermitteln
                        messageIdx = i;
                        break;
                    }
                }
                
                //Prüfen ob eine entsprechende Meldung mit Deleted Property im "zweiten" Durchlauf existiert, denn das Property wird erst später hinzugefügt
                if (that.msg.messages.length > 0 && messageIdx !== undefined && that.msg.messages[messageIdx].Deleted !== undefined && that.msg.messages[messageIdx].Deleted) {
                    that.msg.messages.splice(messageIdx, 1);
                }

                //Damit wir die Ng-If Animation starten, setzten wir ein neuen Property "Deleted"
                //leeren String - dann wird Ng-If aktiviert und wir können eine Animation über ngAnimate starten.
                if (that.msg.messages.length > 0 && that.msg.messages[messageIdx] !== undefined) {
                    that.msg.messages[messageIdx].Deleted = true;
                }
                
                //Wenn keine Items mehr außer maximal Fehler enthalten sind, den Timer wieder löschen
                //denn Fehler werden nicht automatisch aus der Liste entfernt.
                if (messageIdx === undefined) {
                    //Meldungsfenster schliessen
                    that.msg.alertOpen = false;
                    $interval.cancel(timer);
                    timer = undefined;
                }
            }, that.msg.config.removeTimeOut);
        }

        //Funktion zu schließen einer Meldung - es wird der Meldungstext übergeben nach diesem wird in
        //der Messageliste gesucht und dann geschlossen.
        that.msg.closeMessage = function (messageText) {
            //Alle Messages durchgehen und dann die mit dem passenden Text aus dem Array entfernen.
            for (var i = 0; i < that.msg.messages.length; i++) {
                if (that.msg.messages[i].Message === messageText) {
                    that.msg.messages.splice(i, 1);
                    break;
                }
            }
        }

        //CustomMessage hinzufügen, z.b. direkt im JS
        that.msg.AddManualMessage = function (messageText, cssTyp) {
            if (!that.msg.IsMessageIncluded(messageText)) {
                that.msg.CheckMaxMessages();
                //Prüfen ob als CSS Typ eine ID übergeben wurde oder direkt der passende Typ.
                if (isNaN(cssTyp)) {
                    that.msg.messages.unshift({ Message: messageText, typ: cssTyp });
                } else {
                    that.msg.messages.unshift({ Message: messageText, typ: that.msg.GetCssStyleName(cssTyp), NotificationType: cssTyp });
                }
            }

            that.msg.alertOpen = true;
            //Das automatische Entfernen der Meldungen starten
            removeMessages();
        }

        that.msg.AddMessage = function (completeMessageObj) {
            //Wenn kein Property mit dem Namen Messages gefunden werden kann, dann sind keine
            //Messages vom Controller übergeben worden.
            if (completeMessageObj.Messages === undefined) return;

            //Es wurden Messages übergeben, diese jetzt entsprechend unserer Liste mit Meldungen hinzufügen.
            for (var i = 0; i < completeMessageObj.Messages.length; i++) {
                if (!that.msg.IsMessageIncluded(completeMessageObj.Messages[i].Message)) {
                    //Weiteres Property unserer Message hinzufügen - um den CSS Stylenamen für die Meldung zu setzen.
                    completeMessageObj.Messages[i].typ = that.msg.GetCssStyleName(completeMessageObj.Messages[i].NotificationType);
                    that.msg.CheckMaxMessages();
                    that.msg.messages.unshift(completeMessageObj.Messages[i]);
                }
            }
         
            that.msg.alertOpen = true;
            //Das automatische Entfernen der Meldungen starten
            removeMessages();
        }

        //Prüft ob bereits das Maximum an Meldungen in der Liste enthalten ist, wenn ja 
        //wird die letzte Meldung automatisch entfernt.
        that.msg.CheckMaxMessages = function() {
            if (that.msg.messages.length === that.msg.config.maxMessages) {
                that.msg.messages.pop();
            }
        }

        //Prüfen ob die Message bereits in den Messages vorhanden ist.
        that.msg.IsMessageIncluded = function (messageText) {
            for (var i = 0; i < that.msg.messages.length; i++) {
                if (that.msg.messages[i].Message === messageText) {
                    return true;
                }
            }
            return false;
        };

        //Da wir im JSon nur eine MessageTypeId übergeben bekommen, müssen wir hier 
        //die ID in den passenden String für den Anzeigetyp umwandeln.
        that.msg.GetCssStyleName = function (messageType) {
            switch (messageType) {
                case 0:
                    return 'info'; //Information
                case 1:
                    return 'success'; //Success
                case 2:
                    return 'warning'; //Warning
                case 3:
                    return 'danger'; //Error
                default: return 'danger';
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
                that.msg.AddMessage(response.data);
                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {
                $rootScope.spinner--;
                that.msg.AddMessage(rejection.data);
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
angular.module("message.config", [])
    .config(MessageConfig);