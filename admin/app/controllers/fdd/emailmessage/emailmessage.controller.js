'use strict';

app.controller('EmailMessageController', function($scope, $timeout,$translate,
	EmailMessageAnalysisService,
	toaster, SweetAlert) {

    $scope.$on('handleBroadcastEmailMessageOptionChanged', function (event, data) {
        if (angular.isDefined(data.load)) {
            $scope.tabledata = [];
            $timeout(function () {
                angular.element('#emailmessageTable').trigger('footable_redraw');
            }, 0);
        } else {
            $scope.tabledata = data;
            $timeout(function () {
                angular.element('#emailmessageTable').trigger('footable_redraw');
            }, 0);
        }

    });

	
	$scope.deleteEmailMessage = function(emailmessage) {
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
					EmailMessageAnalysisService.deleteEmailMessage(emailmessage, function(response) {
						if (angular.isDefined(response.status) && response.status === 204) {
                            toaster.pop({
                                type: "success",
                                title: $translate.instant("TOASTER.SUCCESS_TITLE"),
                                body: $translate.instant("TOASTER.SUCCESS_DELETE_BODY", {template: $translate.instant("FDD.EMAIL_MESSAGE")}),
                                showCloseButton: true,
                            });
							$scope.$emit('handleEmitEmailMessageTableChanged');
						} else {
                            toaster.pop({
                                type: "error",
                                title: $translate.instant("TOASTER.ERROR_DELETE_BODY", {template: $translate.instant("FDD.EMAIL_MESSAGE")}),
                                body: $translate.instant(response.data.description),
                                showCloseButton: true,
                            });

						}
					});
				}
			});
	};

});