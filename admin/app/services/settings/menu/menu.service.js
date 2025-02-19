'use strict';
app.factory('MenuService', function($http) {
    return {
        getAllMenus:function(callback){
            $http.get(getAPI()+'menus')
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },
        getMenuChildren:function(menuid, callback){
            $http.get(getAPI()+'menus/'+menuid+'/children')
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },
        editMenu: function(menu, callback) {
            $http.put(getAPI()+'menus/'+menu.id,{data:menu})
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }
    };
});
