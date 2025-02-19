'use strict';

app.controller('SpacePointController', function ($scope, $translate, SpaceService, DataSourceService, PointService, SpacePointService,  toaster, SweetAlert) {
    $scope.spaces = [];
    $scope.currentSpaceID = 1;
    $scope.spacepoints = [];
    $scope.datasources = [];
    $scope.points = [];

    $scope.getAllSpaces = function() {
      SpaceService.getAllSpaces(function (response) {
        if (angular.isDefined(response.status) && response.status === 200) {
          $scope.spaces = response.data;
        } else {
          $scope.spaces = [];
        }
        //create space tree
        var treedata = {'core': {'data': [], "multiple" : false,}, "plugins" : [ "wholerow" ]};
        for(var i=0; i < $scope.spaces.length; i++) {
            if ($scope.spaces[i].id == 1) {
              var node = {"id": $scope.spaces[i].id.toString(),
                                  "parent": '#',
                                  "text": $scope.spaces[i].name,
                                  "state": {  'opened' : true,  'selected' : false },
                                 };
            } else {
                var node = {"id": $scope.spaces[i].id.toString(),
                                    "parent": $scope.spaces[i].parent_space.id.toString(),
                                    "text": $scope.spaces[i].name,
                                   };
            };
            treedata['core']['data'].push(node);
        }

        angular.element(spacetreewithpoint).jstree(treedata);
        //space tree selected changed event handler
        angular.element(spacetreewithpoint).on("changed.jstree", function (e, data) {
            $scope.currentSpaceID = parseInt(data.selected[0]);
            $scope.getPointsBySpaceID($scope.currentSpaceID);
        });
      });
    };

    $scope.getAllDataSources = function () {
        DataSourceService.getAllDataSources(function (response) {
            if (angular.isDefined(response.status) && response.status === 200) {
                $scope.datasources = response.data;
                if ($scope.datasources.length > 0) {
                    $scope.currentDataSource = $scope.datasources[0].id;
                    $scope.getPointsByDataSourceID($scope.currentDataSource);
                }
            } else {
                $scope.datasources = [];
            }
        });
    };

    $scope.getPointsByDataSourceID = function (id) {
        PointService.getPointsByDataSourceID(id, function (response) {
            if (angular.isDefined(response.status) && response.status === 200) {
                $scope.points = response.data;
            } else {
                $scope.points = [];
            }
        });
    };

    $scope.getPointsBySpaceID = function (id) {
        SpacePointService.getPointsBySpaceID(id, function (response) {
            if (angular.isDefined(response.status) && response.status === 200) {
                $scope.spacepoints = response.data;
            } else {
                $scope.spacepoints = [];
            }
        });

    };

    $scope.changeDataSource = function (item, model) {
        $scope.currentDataSource = model;
        $scope.getPointsByDataSourceID($scope.currentDataSource);
    };

    $scope.pairPoint = function (dragEl, dropEl) {
        var pointid = angular.element('#' + dragEl).scope().point.id;
        var spaceid = $scope.currentSpaceID;
        SpacePointService.addPair(spaceid, pointid, function (response) {
            if (angular.isDefined(response.status) && response.status === 201) {
                toaster.pop({
                    type: "success",
                    title: $translate.instant("TOASTER.SUCCESS_TITLE"),
                    body: $translate.instant("TOASTER.BIND_POINT_SUCCESS"),
                    showCloseButton: true,
                });
                $scope.getPointsBySpaceID($scope.currentSpaceID);
            } else {
                toaster.pop({
                    type: "error",
                    title: $translate.instant(response.data.title),
                    body: $translate.instant(response.data.description),
                    showCloseButton: true,
                });
            }
        });
    };

    $scope.deletePointPair = function (dragEl, dropEl) {
        if (angular.element('#' + dragEl).hasClass('source')) {
            return;
        }
        var spacepointid = angular.element('#' + dragEl).scope().spacepoint.id;
        var spaceid = $scope.currentSpaceID;
        SpacePointService.deletePair(spaceid, spacepointid, function (response) {
            if (angular.isDefined(response.status) && response.status === 204) {
                toaster.pop({
                    type: "success",
                    title: $translate.instant("TOASTER.SUCCESS_TITLE"),
                    body: $translate.instant("TOASTER.UNBIND_POINT_SUCCESS"),
                    showCloseButton: true,
                });
                $scope.getPointsBySpaceID($scope.currentSpaceID);
            } else {
                toaster.pop({
                    type: "error",
                    title: $translate.instant(response.data.title),
                    body: $translate.instant(response.data.description),
                    showCloseButton: true,
                });
            }
        });
    };

    $scope.getAllDataSources();
    $scope.getAllSpaces();

    $scope.refreshSpaceTree = function() {
      SpaceService.getAllSpaces(function (response) {
        if (angular.isDefined(response.status) && response.status === 200) {
          $scope.spaces = response.data;
        } else {
          $scope.spaces = [];
        }
        //create space tree
        var treedata = {'core': {'data': [], "multiple" : false,}, "plugins" : [ "wholerow" ]};
        for(var i=0; i < $scope.spaces.length; i++) {
            if ($scope.spaces[i].id == 1) {
              var node = {"id": $scope.spaces[i].id.toString(),
                                  "parent": '#',
                                  "text": $scope.spaces[i].name,
                                  "state": {  'opened' : true,  'selected' : false },
                                 };
            } else {
                var node = {"id": $scope.spaces[i].id.toString(),
                                    "parent": $scope.spaces[i].parent_space.id.toString(),
                                    "text": $scope.spaces[i].name,
                                   };
            };
            treedata['core']['data'].push(node);
        }

        angular.element(spacetreewithpoint).jstree(true).settings.core.data = treedata['core']['data'];
        angular.element(spacetreewithpoint).jstree(true).refresh();
      });
    };

  	$scope.$on('handleBroadcastSpaceChanged', function(event) {
      $scope.spacepoints = [];
      $scope.refreshSpaceTree();
  	});
});
