fotuto.directive("fMenu", function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/static/spa/components/fmenus/menu.html',
		controller: ['$scope', '$http', '$attrs', function ($scope, $http, $attrs) {
			$http.get('/api/menus/?position=' + $attrs.position).success(function (data) {
				$scope.menus = data.results
			});

			$scope.open_menu = function (has_submenu, $mdOpenMenu, $event) {
				if (has_submenu) {
					$event.preventDefault();
					$mdOpenMenu($event)
				}
			}
		}]
	}
});