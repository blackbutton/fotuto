fotuto.directive("fMenu", function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/static/spa/components/fmenus/menu.html',
		controller: ['$scope', '$http', '$attrs', function ($scope, $http, $attrs) {
			$http.get('/api/menus/?position=' + $attrs.position).success(function (data) {
				$scope.menus = data.results
			})
		}]
	}
});