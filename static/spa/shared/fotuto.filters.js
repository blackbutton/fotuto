/**
 * AngularJS filter to convert a number in positive
 */
fotuto.filter('abs', function () {
	return function (num) {
		return Math.abs(num);
	}
});