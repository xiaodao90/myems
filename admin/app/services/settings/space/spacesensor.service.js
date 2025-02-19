'use strict';
app.factory('SpaceSensorService', function($http) {
    return {
        addPair: function(spaceID,sensorID,callback) {
            $http.post(getAPI()+'spaces/'+spaceID+'/sensors',{data:{'sensor_id':sensorID}})
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },

        deletePair: function(spaceID,sensorID, callback) {
            $http.delete(getAPI()+'spaces/'+spaceID+'/sensors/'+sensorID)
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },
        getSensorsBySpaceID: function(id, callback) {
            $http.get(getAPI()+'spaces/'+id+'/sensors')
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }
    };
});
