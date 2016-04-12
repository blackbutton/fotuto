fotuto.controller('DeviceController', ['$scope', '$http', function ($scope, $http) {

	/**
	 * Devices
	 *
	 * Example device: {'name':'Door Sensor', 'slug': 'door-sensor', 'address': '0001'}
	 *
	 * @type {Array}
	 */
	$scope.device = {};
	$scope.devices = [];

	$http.get('/api/devices/').success(function (data) {
		$scope.devices = data.results;
	});

	$scope.add = function () {
		$http.post('/api/devices/', $scope.device)
			.success(function (data) {
				$scope.result = data;
				$scope.devices.unshift($scope.device);
				$scope.device = {};
			})
			.error(function (data) {
				$scope.error = data;
			});
	}
}]);