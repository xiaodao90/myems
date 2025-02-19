'use strict';

app.controller('SpaceTenantController', function($scope, $translate,	SpaceService, TenantService, SpaceTenantService, toaster,SweetAlert) {
  $scope.spaces = [];
  $scope.currentSpaceID = 1;
  $scope.tenants = [];
  $scope.spacetenants = [];


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

      angular.element(spacetreewithtenant).jstree(treedata);
      //space tree selected changed event handler
      angular.element(spacetreewithtenant).on("changed.jstree", function (e, data) {
          $scope.currentSpaceID = parseInt(data.selected[0]);
          $scope.getTenantsBySpaceID($scope.currentSpaceID);
      });
    });
  };

	$scope.getTenantsBySpaceID = function(id) {
    $scope.spacetenants=[];
    SpaceTenantService.getTenantsBySpaceID(id, function (response) {
      				if (angular.isDefined(response.status) && response.status === 200) {
      					$scope.spacetenants = $scope.spacetenants.concat(response.data);
      				} else {
                $scope.spacetenants=[];
              }
    			});
		};

	$scope.getAllTenants = function() {
		TenantService.getAllTenants(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.tenants = response.data;
			} else {
				$scope.tenants = [];
			}
		});
	};

	$scope.pairTenant=function(dragEl,dropEl){
		var tenantid=angular.element('#'+dragEl).scope().tenant.id;
		var spaceid=angular.element(spacetreewithtenant).jstree(true).get_top_selected();
		SpaceTenantService.addPair(spaceid,tenantid, function (response){
			if (angular.isDefined(response.status) && response.status === 201) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.BIND_TENANT_SUCCESS"),
						showCloseButton: true,
					});
					$scope.getTenantsBySpaceID(spaceid);
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

	$scope.deleteTenantPair=function(dragEl,dropEl){
		if(angular.element('#'+dragEl).hasClass('source')){
			return;
        }
        var spacetenantid = angular.element('#' + dragEl).scope().spacetenant.id;
        var spaceid = angular.element(spacetreewithtenant).jstree(true).get_top_selected();

        SpaceTenantService.deletePair(spaceid, spacetenantid, function (response) {
            if (angular.isDefined(response.status) && response.status === 204) {
                toaster.pop({
                    type: "success",
                    title: $translate.instant("TOASTER.SUCCESS_TITLE"),
                    body: $translate.instant("TOASTER.UNBIND_TENANT_SUCCESS"),
                    showCloseButton: true,
                });
                $scope.getTenantsBySpaceID(spaceid);
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
	$scope.getAllTenants();

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

      angular.element(spacetreewithtenant).jstree(true).settings.core.data = treedata['core']['data'];
      angular.element(spacetreewithtenant).jstree(true).refresh();
    });
  };

	$scope.$on('handleBroadcastSpaceChanged', function(event) {
    $scope.spacetenants = [];
    $scope.refreshSpaceTree();
	});

});
