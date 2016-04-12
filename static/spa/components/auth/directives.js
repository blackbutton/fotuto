angular.module('fotuto.auth.directives', [])
	.directive('login', function ($http, $cookies) {
		return {
			restrict: 'A',
			templateUrl: 'components/auth/login-form.html',
			link: function (scope, elem, attrs) {
				elem.bind('submit', function () {
					var user_data = {
						"username": scope.user.username,
						"password": scope.user.password
					};
					// Clear current token
					delete $http.defaults.headers.common['Authorization'];
					// Request for new token
					$http.post("/api/token/", user_data)
						.success(function (response) {
							$cookies.put('csrftoken', response.token);
							$http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
						});
				})
			}
		}
	});
