'use strict';
app.factory('ShopfloorMeterService', function($http) {
    return {
        addPair: function(shopfloorID,meterID, metertype,callback) {
            var meter={};
            if(metertype=='meters'){
                meter={'meter_id':meterID};
            }else if(metertype=='virtualmeters'){
                meter={"virtual_meter_id":meterID};
            }else{
                meter={'offline_meter_id':meterID};
            }

            $http.post(getAPI()+'shopfloors/'+shopfloorID+'/'+metertype,{data:meter})
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },

        deletePair: function(shopfloorID,meterID, metertype, callback) {
            $http.delete(getAPI()+'shopfloors/'+shopfloorID+'/'+metertype+'/'+meterID)
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },
        getMetersByShopfloorID: function(id, metertype, callback) {
            $http.get(getAPI()+'shopfloors/'+id+'/'+metertype)
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }
    };
});
