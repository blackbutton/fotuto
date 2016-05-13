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
		return function (list, slug_value) {
			var list_filtered = list.filter(function (item) {
				return item.slug == slug_value;
			});
			return list_filtered[0];
		}
	}
);


/**
 * Filter to check in an element exist in an array
 */
fotuto.filter('contains', function() {
  return function (array, needle) {
    return array.indexOf(needle) >= 0;
  };
});