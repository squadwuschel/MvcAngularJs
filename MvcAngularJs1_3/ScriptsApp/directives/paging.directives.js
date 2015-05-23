angular.module("paging.directives", [])
/*  
  Achtung aufpassen das die Reinen Strings die übergeben werden wie der header-name noch 
  einmal Extra als String "markiert" werden mit den Einfachen Anführungszeichen, sonst denkt Angular 
  es sucht nach einer Funktion!
  
  Verwendung:

  <div sxp-sort-header
       header-name="'Header Anzeigename'" 
       sort-filter="Fct.SetSortFilter('@SortColumnNamesEnum.Portal.ToString()')" 
       sort-name="'@SortColumnNamesEnum.Portal.ToString()'"
       current-sort-name="'AktuellerSortHeaderName'" 
       is-asc="true" >
  </div>
*/
    .directive("sxpSortHeader", function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                sortFilter: "&", //Die Funktion die aufgerufen wird, wenn auf den Header geklickt wird um danach zu sortieren.
                sortName: "=", //Der Eigene Header Name des aktuell angezeigten Headers
                currentSortName: "=", //Der Name des Headers nach dem aktuell sortiert wird
                isAsc: "=", //Bool der angibt ob die aktuelle Sortierung "asc" oder "desc" ist
                headerName: "=" //Der name der Angezeigt werden soll
            },
            template: '<span class="linkCursor" ng-click="sortFilter()">' +
                '<span ng-bind="headerName"></span>&nbsp;' +
                '<i class="fa" ng-class="{\'fa-caret-down\': !isAsc, \'fa-caret-up\': isAsc}" ng-if="sortName === currentSortName">' +
                '</i></span>'
        };
    })
/* 
 Header anzeige für eine Tabellarische Ansicht. Vorraussetzung ist hier, das das Interface IPagingHelper im aktuellen FilterModel verwendet wird.

 Verwendung:
    <sxp-simple-sort-header
         search-model="FilterModel"
         search-function="Fct.StartSearch()"
         sort-property-name="Vorname"
         header-name="First Name">
    </sxp-simple-sort-header>
*/
    .directive("sxpSimpleSortHeader", function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                searchModel: "=", //Der Aktuelle Paging Helper wird übergeben, der auch im Objektmodel vorhanden ist.
                searchFunction: "&", //Die Funktion die aufgerufen wird, wenn auf den Header geklickt wird um danach zu sortieren. - Meist handelt es sich direkt um die Filter Funktion!
                sortPropertyName: "=", //Der Name des Properties nach dem für diese Spalte sortiert werden soll
                headerName: "=" //Der name der Angezeigt werden soll in der Tabelle.
            },
            templateUrl: siteRoot + 'ScriptsApp/directives/templates/paging.directives.simpleSortHeader.html',
            link: function(scope, elem, attr) {
                //ACHUTNG:
                //Bitte das .NET Model 'StandardSearchModel' verwenden, denn hier sind die Properties 'OrderDirection' und 'OrderByColumn' bereits vorhanden. 

                scope.Fct = {};
                //Funktion die ausgefährt wird, wenn man auf den Header klickt.
                scope.Fct.SortHeader = function() {
                    //Die Sortierrichtung wird nur geändert, wenn der Header auf den Geklickt wurde, 
                    //dem entspricht, den man sich gerade anschaut, beim Wechsel des Headers wird die Sortierrichtung nicht geändert!
                    if (scope.searchModel.OrderByColumn === scope.sortPropertyName) {
                        if (scope.searchModel.OrderDirection === 0) {
                            scope.searchModel.OrderDirection = 1;
                        } else {
                            scope.searchModel.OrderDirection = 0;
                        }
                    } else {
                        //Den Namen festlegen nach dem sortiert werden soll
                        scope.searchModel.OrderByColumn = scope.sortPropertyName;
                    }

                    //Wenn auch das Paging vorhanden ist und Filterchanged, dann prüfen ob die Seitenauswahl zurückgesetzt werden muss.
                    if (scope.searchModel.PagingParameter !== undefined && scope.searchModel.FilterChanged !== undefined) {
                        if (scope.searchModel.FilterChanged !== undefined && scope.searchModel.FilterChanged) {
                            scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                        }
                    }

                    scope.searchFunction();
                };
            }
        };
    })
/*
Anzeige eines einfachen Paging Element "<< | erste Seite | 3/34 | letzte Seite | >>"

Verwendung:
<sxp-simple-paging 
     search-model="FilterModel"
     search-function="Fct.StartSearch()">
</sxp-simple-paging>
*/
    .directive("sxpSimplePaging", function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                searchModel: "=", //Der Aktuelle Paging Helper wird übergeben, der auch im Objektmodel vorhanden ist.
                searchFunction: "&" //Die Funktion die aufgerufen wird, um die seitendaten anhand der aktuellen Paging Infos neu zu laden - meist handelt es sich hier um die Filterfunktion
            },
            templateUrl: siteRoot + 'ScriptsApp/directives/templates/paging.directives.simplePaging.html',
            link: function(scope, element, attr) {
                //ACHTUNG
                //Member 'PagingParameter' im Model verwenden - bitte in .NET 'PagingParameter' oder 'StandardSearchModel' verwenden."

                scope.Fct = {};
                scope.Fct.firstPage = function() {
                    if (scope.searchModel.PagingParameter.CurrentPage > 1) {
                        scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                        scope.searchFunction();
                    }
                };

                scope.Fct.lastPage = function() {
                    if (scope.searchModel.PagingParameter.CurrentPage !== scope.searchModel.PagingParameter.TotalPages) {
                        scope.searchModel.PagingParameter.CurrentPageIndex = scope.searchModel.PagingParameter.TotalPages-1;
                        //Sollte der Filter sich geändert haben, hier auf die Seite 0 zurückstellen
                        if (scope.searchModel.FilterChanged !== undefined && scope.searchModel.FilterChanged) {
                            scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                        }

                        scope.searchFunction();
                    }
                };

                scope.Fct.nextPage = function() {
                    if (scope.searchModel.PagingParameter.HasNextPage && scope.searchModel.PagingParameter.CurrentPage !== scope.searchModel.PagingParameter.TotalPages) {
                        scope.searchModel.PagingParameter.CurrentPageIndex++;

                        //Sollte der Filter sich geändert haben, hier auf die Seite 0 zurückstellen
                        if (scope.searchModel.FilterChanged !== undefined && scope.searchModel.FilterChanged) {
                            scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                        }

                        scope.searchFunction();
                    }
                };

                scope.Fct.prevPage = function() {
                    if (scope.searchModel.PagingParameter.HasPreviousPage && scope.searchModel.PagingParameter.CurrentPage > 1) {
                        scope.searchModel.PagingParameter.CurrentPageIndex--;

                        //Sollte der Filter sich geändert haben, hier auf die Seite 0 zurückstellen
                        if (scope.searchModel.FilterChanged !== undefined && scope.searchModel.FilterChanged) {
                            scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                        }

                        scope.searchFunction();
                    }
                };
            }
        };
    })
/* 
Auswahl der Seitengröße für das Paging.

 Verwendung:
    <sxp-simple-pagesize
         search-model="FilterModel"
         search-function="Fct.StartSearch()"
         stepsize-array="[15,30,50,100]">
    </sxp-simple-pagesize>
*/
    .directive("sxpSimplePagesize", function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                searchModel: "=", //Der Aktuelle Paging Helper wird übergeben, der auch im Objektmodel vorhanden ist.
                searchFunction: "&", //Die Funktion die aufgerufen wird wenn eine andere Pagegröße ausgewählt wurde Meist handelt es sich direkt um die Suchenfunktion!
                stepsizeArray   : "=" //Array mit den Stepsize eintragen die angezeigt werden sollen. z.B. [15,30,50,100]
            },
            templateUrl: siteRoot + 'ScriptsApp/directives/templates/paging.directives.simplePagesize.html',
            link: function(scope, elem, attr) {
                //ACHUTNG:
                //Bitte das .NET Model 'StandardSearchModel' verwenden, denn hier sind die Properties 'OrderDirection' und 'OrderByColumn' bereits vorhanden. 

                scope.Fct = {};
                scope.Fct.SelectionChanged = function() {
                    scope.searchModel.PagingParameter.CurrentPageIndex = 0;
                    scope.searchFunction();
                }
            }
        };
    });