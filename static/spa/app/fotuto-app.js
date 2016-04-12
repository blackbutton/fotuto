var fotuto = angular.module('fotuto', ['ngRoute', 'ngCookies', 'fotuto.auth.directives']);

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

fotuto.run(function ($rootScope, $log, $http, $cookies) {
	// Add header param in url requests to use CSRF token
	csrftoken = $cookies.get('csrftoken');
	if (csrftoken) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + csrftoken;
	}
});

