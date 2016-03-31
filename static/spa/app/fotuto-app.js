var fotuto = angular.module('fotuto', ['ngRoute']);

// TODO: Refactor urls by components
fotuto.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	// Component: config-wizard
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