'use strict';

app.controller('EnergyFlowDiagramController', function($scope, $translate, $uibModal, EnergyFlowDiagramService, toaster,SweetAlert) {

	$scope.getAllEnergyFlowDiagrams = function() {
		EnergyFlowDiagramService.getAllEnergyFlowDiagrams(function (response) {
			if (angular.isDefined(response.status) && response.status === 200) {
				$scope.energyflowdiagrams = response.data;
			} else {
				$scope.energyflowdiagrams = [];
			}
		});
	};

	$scope.addEnergyFlowDiagram = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/energyflowdiagram/energyflowdiagram.model.html',
			controller: 'ModalAddEnergyFlowDiagramCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(energyflowdiagram) {
			EnergyFlowDiagramService.addEnergyFlowDiagram(energyflowdiagram, function (response) {
				if (angular.isDefined(response.status) && response.status === 201) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.SUCCESS_ADD_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
						showCloseButton: true,
					});
					$scope.getAllEnergyFlowDiagrams();
					$scope.$emit('handleEmitEnergyFlowDiagramChanged');
				} else {
					toaster.pop({
						type: "error",
						title: $translate.instant("TOASTER.ERROR_ADD_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
						body: $translate.instant(response.data.description),
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editEnergyFlowDiagram = function(energyflowdiagram) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/energyflowdiagram/energyflowdiagram.model.html',
			controller: 'ModalEditEnergyFlowDiagramCtrl',
			resolve: {
				params: function() {
					return {
						energyflowdiagram: angular.copy(energyflowdiagram)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedEnergyFlowDiagram) {
			EnergyFlowDiagramService.editEnergyFlowDiagram(modifiedEnergyFlowDiagram, function (response) {
				if (angular.isDefined(response.status) && response.status === 200) {
					toaster.pop({
						type: "success",
						title: $translate.instant("TOASTER.SUCCESS_TITLE"),
						body: $translate.instant("TOASTER.SUCCESS_UPDATE_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
						showCloseButton: true,
					});
					$scope.getAllEnergyFlowDiagrams();
					$scope.$emit('handleEmitEnergyFlowDiagramChanged');
				} else {
					toaster.pop({
						type: "error",
						title: $translate.instant("TOASTER.ERROR_UPDATE_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
						body: $translate.instant(response.data.description),
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteEnergyFlowDiagram=function(energyflowdiagram){
		SweetAlert.swal({
		        title: $translate.instant("SWEET.TITLE"),
		        text: $translate.instant("SWEET.TEXT"),
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: $translate.instant("SWEET.CONFIRM_BUTTON_TEXT"),
		        cancelButtonText: $translate.instant("SWEET.CANCEL_BUTTON_TEXT"),
		        closeOnConfirm: true,
		        closeOnCancel: true },
		    function (isConfirm) {
		        if (isConfirm) {
		            EnergyFlowDiagramService.deleteEnergyFlowDiagram(energyflowdiagram, function (response) {
		            	if (angular.isDefined(response.status) && response.status === 204) {
							toaster.pop({
								type: "success",
								title: $translate.instant("TOASTER.SUCCESS_TITLE"),
								body: $translate.instant("TOASTER.SUCCESS_DELETE_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
								showCloseButton: true,
							});
							$scope.getAllEnergyFlowDiagrams();
							$scope.$emit('handleEmitEnergyFlowDiagramChanged');
		            	} else {
							toaster.pop({
								type: "error",
								title: $translate.instant("TOASTER.ERROR_DELETE_BODY", {template: $translate.instant("COMMON.ENERGY_FLOW_DIAGRAM")}),
								body: $translate.instant(response.data.description),
								showCloseButton: true,
							});
		            	}
		            });
		        }
		    });
	};
	$scope.getAllEnergyFlowDiagrams();
});

app.controller("ModalAddEnergyFlowDiagramCtrl", function(  $scope,  $uibModalInstance) {
  $scope.operation = "ENERGY_FLOW_DIAGRAM.ADD_ENERGY_FLOW_DIAGRAM";
  $scope.ok = function() {
    $uibModalInstance.close($scope.energyflowdiagram);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});

app.controller("ModalEditEnergyFlowDiagramCtrl", function($scope, $uibModalInstance,  params) {
  $scope.operation = "ENERGY_FLOW_DIAGRAM.EDIT_ENERGY_FLOW_DIAGRAM";
  $scope.energyflowdiagram = params.energyflowdiagram;

  $scope.ok = function() {
    $uibModalInstance.close($scope.energyflowdiagram);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});
