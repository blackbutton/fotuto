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
		.when('/config/steps/2', {
			templateUrl: 'components/config-wizard/step-vars.html',
		})
		.when('/config/steps/3', {
			templateUrl: 'components/config-wizard/step-scenes.html',
		})
		.otherwise({
			redirectTo: '/config/intro'
		});
}]);

fotuto.run(function ($rootScope, $log, $http, $cookies) {
	// Add header param in url requests to use CSRF token
	$http.defaults.xsrfCookieName = 'csrftoken';
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	csrftoken = $cookies.get('csrftoken');
	if (csrftoken) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + csrftoken;
	}
});
