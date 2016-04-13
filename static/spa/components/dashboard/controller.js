fotuto.controller('DashboardController', ['$scope', '$http', '$interval', '$filter', '$log',
	function ($scope, $http, $interval, $filter, $log) {

		$scope.scenes = [];
		$scope.last_update = new Date();
		$scope.updating = false;

		$http.get('/api/windows/').success(function (data) {
			$scope.scenes = data.results;
			try {
				$scope.showScene($scope.scenes[0].id)
			} catch (err) {
				$log.warn("There is no scene to display")
			}
		});

		$scope.showScene = function (scene_id) {
			$scope.scene = $filter('filter')($scope.scenes, {id: scene_id}, true)[0];
			$http.get('/api/mimics/?window=' + scene_id).success(function (data) {
				$scope.scene.mimics = data.results;
			});
		};

		// Update values
		if ($scope.scene) {
			$interval(function () {
				// TODO: Display/hide the "updating..." indicator
				/* TODO: Optimize: it should be better if api provide the endpoint `/api/windows/<window.pk>/values/` with in
				 results field the list of variable values i.e. [{"slug": "some-var", "value": 0.5}]
				 */
				$scope.updating = true;
				$http.get('/api/vars/?mimic__window=' + $scope.scene.id).then(function (response) {
					// TODO: Use this date from the server to not depend of the client date
					// Update variables's values by finding it on each mimic in the current scene
					$scope.scene.mimics.forEach(function (mimic, index) {
						mimic.vars.forEach(function (variable, index) {
							variable.value = $filter('filter')(response.data.results, {slug: variable.slug}, true)[0].value;
						});
					});

					$scope.last_update = new Date();
					$scope.updating = false;
				}, function (err) {
					throw err;
				});
			}, 3000); // TODO: Move this interval to a settings page
		}
	}
]);
