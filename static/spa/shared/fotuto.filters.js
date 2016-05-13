/**
 * AngularJS filter to convert a number in positive
 */
fotuto.filter('abs', function () {
	return function (num) {
		return Math.abs(num);
	}
});

/**
 * Filter to get an element from a list by its `slug` property value
 *
 * This filter is usefull for get objects in Vars, Devices, etc
 *
 * Example usage:
 *
 *     vars | getItem:'some-slug'
 *
 * @param (array) list: The list to look for an item
 * @param (string) slug_value: The value to look for
 *
 */
fotuto.filter('getItem',
	function () {
		return function (list, param) {
			// TODO: Refactor this function

			function filter_function(item) {
				var key, value;
				if (typeof param == 'object') {
					key = Object.keys(param)[0];
					var key_arr = key.split('__');
					if (key_arr.length == 2 && key_arr[1] == 'startswith') {
						return item[key_arr[0]].indexOf(param[key]) == 0;
					} else {
						return item[key_arr[0]] == param[key];
					}
				}
				return item.slug == param;
			}

			return list.filter(filter_function)[0];
		}
	}
);


/**
 * Filter to check in an element exist in an array
 */
fotuto.filter('contains', function () {
	return function (array, needle) {
		return array.indexOf(needle) >= 0;
	};
});