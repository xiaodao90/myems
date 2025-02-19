'use strict';

app.controller('SpaceShopfloorController', function($scope, $translate,	SpaceService, ShopfloorService, SpaceShopfloorService, toaster,SweetAlert) {
  $scope.spaces = [];
  $scope.currentSpaceID = 1;
  $scope.shopfloors = [];
  $scope.spaceshopfloors = [];


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

      angular.element(spacetreewithshopfloor).jstree(treedata);
      //space tree selected changed event handler
      angular.element(spacetreewithshopfloor).on("changed.jstree", function (e, data) {
          $scope.currentSpaceID = parseInt(data.selected[0]);
          $scope.getShopfloorsBySpaceID($scope.currentSpaceID);
      });
    });
  };

	$scope.getShopfloorsBySpaceID = function(id) {
    $scope.spaceshopfloors=[];
    SpaceShopfloorService.getShopfloorsBySpaceID(id, function (response) {
      				if (angular.isDefined(response.status) && response.status === 200) {
      					$scope.spaceshopfloors = $scope.spaceshopfloors.concat(response.data);
      				} else {
                $scope.spaceshopfloors=[];
              }
    			});
		};

	$scope.getAllShopfloors = function() {
		ShopfloorService.getAllShopfloors(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.shopfloors = response.data;
			} else {
				$scope.shopfloors = [];
			}
		});
	};

	$scope.pairShopfloor=function(dragEl,dropEl){
		var shopfloorid=angular.element('#'+dragEl).scope().shopfloor.id;
		var spaceid=angular.element(spacetreewithshopfloor).jstree(true).get_top_selected();
		SpaceShopfloorService.addPair(spaceid,shopfloorid, function (response){
			if (angular.isDefined(response.status) && response.status === 201) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.BIND_SHOPFLOOR_SUCCESS"),
						showCloseButton: true,
					});
					$scope.getShopfloorsBySpaceID(spaceid);
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

	$scope.deleteShopfloorPair=function(dragEl,dropEl){
		if(angular.element('#'+dragEl).hasClass('source')){
			return;
        }
        var spaceshopfloorid = angular.element('#' + dragEl).scope().spaceshopfloor.id;
        var spaceid = angular.element(spacetreewithshopfloor).jstree(true).get_top_selected();

        SpaceShopfloorService.deletePair(spaceid, spaceshopfloorid, function (response) {
            if (angular.isDefined(response.status) && response.status === 204) {
                toaster.pop({
                    type: "success",
                    title: $translate.instant("TOASTER.SUCCESS_TITLE"),
                    body: $translate.instant("TOASTER.UNBIND_SHOPFLOOR_SUCCESS"),
                    showCloseButton: true,
                });
                $scope.getShopfloorsBySpaceID(spaceid);
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

  $scope.getAllSpaces();
	$scope.getAllShopfloors();

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

      angular.element(spacetreewithshopfloor).jstree(true).settings.core.data = treedata['core']['data'];
      angular.element(spacetreewithshopfloor).jstree(true).refresh();
    });
  };

	$scope.$on('handleBroadcastSpaceChanged', function(event) {
    $scope.spaceshopfloors = [];
    $scope.refreshSpaceTree();
	});

});
