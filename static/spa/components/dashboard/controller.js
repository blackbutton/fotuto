fotuto.controller('DashboardController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

	$scope.scenes = [];

	$http.get('/api/windows/').success(function (data) {
		$scope.scenes = data.results;
		$scope.showScene($scope.scenes[0].id)
	});

	$scope.showScene = function (scene_id) {
		$scope.scene = $filter('filter')($scope.scenes, {id: scene_id}, true)[0];
		$http.get('/api/mimics/?window=' + scene_id).success(function (data) {
			$scope.scene.mimics = data.results;
		});
	};
}]);

