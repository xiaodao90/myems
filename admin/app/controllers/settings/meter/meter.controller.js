'use strict';

app.controller('MeterController', function($scope,  $translate, $uibModal, MeterService, CategoryService, CostCenterService, EnergyItemService,toaster, SweetAlert) {

	$scope.getAllCostCenters = function() {
		CostCenterService.getAllCostCenters(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.costcenters = response.data;
			} else {
				$scope.costcenters = [];
			}
		});
	};

	$scope.getAllCategories = function() {
		CategoryService.getAllCategories(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.categories = response.data;
			} else {
				$scope.categories = [];
			}
		});

	};

	$scope.getAllEnergyItems = function() {
		EnergyItemService.getAllEnergyItems(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.energyitems = response.data;
			} else {
				$scope.energyitems = [];
			}
	});

};
	$scope.getAllMeters = function() {
		MeterService.getAllMeters(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.meters = response.data;
				$scope.parentmeters = response.data;
			} else {
				$scope.meters = [];
				$scope.parentmeters = [];
			}
			//create meter tree
			var treedata = {'core': {'data': [], "multiple" : false,}, "plugins" : [ "wholerow" ]};
			for(var i=0; i < $scope.meters.length; i++) {
					if ($scope.meters[i].master_meter == null) {
						var node = {"id": $scope.meters[i].id.toString(),
																"parent": '#',
																"text": $scope.meters[i].name,
																"state": {  'opened' : true,  'selected' : false },
															 };
					} else {
							var node = {"id": $scope.meters[i].id.toString(),
																	"parent": $scope.meters[i].master_meter.id.toString(),
																	"text": $scope.meters[i].name,
																 };
					};
					treedata['core']['data'].push(node);
			}

			angular.element(metertree).jstree(treedata);
			//meter tree selected changed event handler
			angular.element(metertree).on("changed.jstree", function (e, data) {
				$scope.currentMeterID = parseInt(data.selected[0]);
				$scope.getMeterSubmeters($scope.currentMeterID);
			});
		});

	};

	$scope.refreshMeterTree = function() {
		MeterService.getAllMeters(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.meters = response.data;
				$scope.parentmeters = response.data;
			} else {
				$scope.meters = [];
				$scope.parentmeters = [];
			}
			//create meter tree
			var treedata = {'core': {'data': [], "multiple" : false,}, "plugins" : [ "wholerow" ]};
			for(var i=0; i < $scope.meters.length; i++) {
				if ($scope.meters[i].master_meter == null) {
					var node = {"id": $scope.meters[i].id.toString(),
								"parent": '#',
								"text": $scope.meters[i].name,
								"state": {  'opened' : true,  'selected' : false },
								};
				} else {
					var node = {"id": $scope.meters[i].id.toString(),
								"parent": $scope.meters[i].master_meter.id.toString(),
								"text": $scope.meters[i].name,
								};
				};
				treedata['core']['data'].push(node);
			}
			var metertree = document.getElementById("metertree");
			angular.element(metertree).jstree(true).settings.core.data = treedata['core']['data'];
			angular.element(metertree).jstree(true).refresh();
		});
	};

	$scope.getMeterSubmeters = function(meterid) {
		MeterService.getMeterSubmeters(meterid, function (response) {
		if (angular.isDefined(response.status) && response.status === 200) {
			$scope.currentMeterSubmeters = response.data;
		} else {
			$scope.currentMeterSubmeters = [];
		}
		});
	};

	$scope.addMeter = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/meter/meter.model.html',
			controller: 'ModalAddMeterCtrl',
			windowClass: "animated fadeIn",
			resolve: {
				params: function() {
					return {
						meters: angular.copy($scope.meters),
						parentmeters: angular.copy($scope.parentmeters),
						categories: angular.copy($scope.categories),
						costcenters: angular.copy($scope.costcenters),
						energyitems: angular.copy($scope.energyitems),
					};
				}
			}
		});
		modalInstance.result.then(function(meter) {
			meter.energy_category_id = meter.energy_category.id;
			meter.cost_center_id = meter.cost_center.id;
			if(angular.isDefined(meter.energy_item)) {
				meter.energy_item_id = meter.energy_item.id;
			} else {
				meter.energy_item_id = undefined;
			}
			if(angular.isDefined(meter.master_meter)) {
				meter.master_meter_id = meter.master_meter.id;
			} else {
				meter.master_meter_id = undefined;
			}
			MeterService.addMeter(meter, function (response) {
				if (angular.isDefined(response.status) && response.status === 201) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.SUCCESS_ADD_BODY", {template: $translate.instant("SETTING.METER")}),
						showCloseButton: true,
					});
					$scope.getAllMeters();
					$scope.$emit('handleEmitMeterChanged');
				} else {
					toaster.pop({
						type: "error",
						title: $translate.instant("TOASTER.ERROR_ADD_BODY", {template: $translate.instant("SETTING.METER")}),
						body: $translate.instant(response.data.description),
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editMeter = function(meter) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/meter/meter.model.html',
			controller: 'ModalEditMeterCtrl',
			resolve: {
				params: function() {
					return {
						meter: angular.copy(meter),
						meters: angular.copy($scope.meters),
						parentmeters: angular.copy($scope.parentmeters),
						categories: angular.copy($scope.categories),
						costcenters: angular.copy($scope.costcenters),
						energyitems: angular.copy($scope.energyitems),
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedMeter) {
			modifiedMeter.energy_category_id = modifiedMeter.energy_category.id;
			modifiedMeter.cost_center_id = modifiedMeter.cost_center.id;
			if (modifiedMeter.energy_item != null && modifiedMeter.energy_item.id != null ) {
				modifiedMeter.energy_item_id = modifiedMeter.energy_item.id;
			} else {
				modifiedMeter.energy_item_id = undefined;
			}
			if (modifiedMeter.master_meter != null && modifiedMeter.master_meter.id != null ) {
				modifiedMeter.master_meter_id = modifiedMeter.master_meter.id;
			} else {
				modifiedMeter.master_meter_id = undefined;
			}
			MeterService.editMeter(modifiedMeter, function (response) {
				if (angular.isDefined(response.status) && response.status === 200) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.SUCCESS_UPDATE_BODY", {template: $translate.instant("SETTING.METER")}),
						showCloseButton: true,
					});
					$scope.getAllMeters();
					$scope.$emit('handleEmitMeterChanged');
				} else {
					toaster.pop({
						type: "error",
						title: $translate.instant("TOASTER.ERROR_UPDATE_BODY", {template: $translate.instant("SETTING.METER")}),
						body: $translate.instant(response.data.description),
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteMeter = function(meter) {
		SweetAlert.swal({
				title: $translate.instant("SWEET.TITLE"),
				text: $translate.instant("SWEET.TEXT"),
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: $translate.instant("SWEET.CONFIRM_BUTTON_TEXT"),
				cancelButtonText: $translate.instant("SWEET.CANCEL_BUTTON_TEXT"),
				closeOnConfirm: true,
				closeOnCancel: true
			},
			function(isConfirm) {
				if (isConfirm) {
					MeterService.deleteMeter(meter, function (response) {
						if (angular.isDefined(response.status) && response.status === 204) {
							toaster.pop({
								type: "success",
								title: $translate.instant("TOASTER.SUCCESS_TITLE"),
								body: $translate.instant("TOASTER.SUCCESS_DELETE_BODY", {template: $translate.instant("SETTING.METER")}),
								showCloseButton: true,
							});
							$scope.getAllMeters();
							$scope.$emit('handleEmitMeterChanged');
						} else {
							toaster.pop({
								type: "error",
								title: $translate.instant("TOASTER.ERROR_DELETE_BODY", {template: $translate.instant("SETTING.METER")}),
								body: $translate.instant(response.data.description),
								showCloseButton: true,
							});
						}
					});
				}
			});
	};

	$scope.getAllMeters();
	$scope.getAllCategories();
	$scope.getAllCostCenters();
    $scope.getAllEnergyItems();

	$scope.$on('handleBroadcastMeterChanged', function(event) {
		$scope.refreshMeterTree();
	});

});

app.controller('ModalAddMeterCtrl', function($scope, $uibModalInstance, params) {

	$scope.operation = "SETTING.ADD_METER";
	$scope.categories = params.categories;
	$scope.costcenters = params.costcenters;
	$scope.energyitems = params.energyitems;
	$scope.parentmeters = params.parentmeters;
	$scope.meter = {
		is_counted: false
	};
	$scope.ok = function() {
		$uibModalInstance.close($scope.meter);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditMeterCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "SETTING.EDIT_METER";
	$scope.meter = params.meter;
	$scope.meters = params.meters;
	$scope.parentmeters = params.parentmeters;
	$scope.categories = params.categories;
	$scope.costcenters = params.costcenters;
	$scope.energyitems = params.energyitems;
	$scope.ok = function() {
		$uibModalInstance.close($scope.meter);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
