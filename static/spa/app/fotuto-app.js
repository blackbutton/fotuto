var fotuto = angular.module('fotuto', ['ngRoute']);

fotuto.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/config/intro', {
			templateUrl: 'components/config-wizard/intro.html'
		})
		.when('/config/steps/1', {
			templateUrl: 'components/config-wizard/step-devices.html',
			controller: 'DeviceController'
		})
		.otherwise({
			redirectTo: '/config/intro'
		});
}]);