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

fotuto.controller('VarController', ['$scope', '$http', function ($scope, $http) {

	/**
	 * Variables
	 *
	 * Example variable: {'name':'Door Status', 'device': 1, 'var_type': 'digital'}
	 *
	 * @type {Array}
	 */
	$scope.var = {};
	$scope.vars = [];
	$scope.devices = []; // TODO: Optimize: devices should be shared with DeviceController

	$http.get('/api/vars/').success(function (data) {
		$scope.vars = data.results;
	});

	// TODO: Optimize: devices are shared this request don't needed
	$http.get('/api/devices/').success(function (data) {
		$scope.devices = data.results;
	});

	$scope.add = function () {
		$http.post('/api/vars/', $scope.var)
			.success(function (data) {
				$scope.result = data;
				$scope.vars.unshift($scope.var);
				$scope.var = {};
			})
			.error(function (data) {
				$scope.error = data;
			});
	}
}]);
