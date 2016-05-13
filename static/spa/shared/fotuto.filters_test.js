describe("Fotuto filters", function () {

	beforeEach(module('fotuto'));

	describe("getItem Filter", function () {

		it("Should has the getItem filter", inject(function ($filter) {
			expect($filter('getItem')).not.toBeNull();
		}));

		it("Should return the Item", inject(function (getItemFilter) {
			var some_var = {'slug': 'some-var', 'name': 'Some Var'};
			var other_var = {'slug': 'other-var', 'name': 'Other Var'};
			var vars = [some_var, other_var];

			expect(getItemFilter(vars, 'other-var')).toEqual(other_var);
			expect(getItemFilter(vars, 'non-exist')).toBeUndefined();
			expect(getItemFilter(vars, 'some-var')).toEqual(some_var);
		}));

	});

	describe("contains Filter", function () {

		it("Should has the contains filter", inject(function ($filter) {
			expect($filter('contains')).not.toBeNull();
		}));

		it("Should return true if a number exist in array", inject(function (containsFilter) {
			var test_array = [1, 2, 3, 4];
			expect(containsFilter(test_array, 1)).toBeTrue();
			expect(containsFilter(test_array, 5)).toBeFalse();
		}));

		it("Should return true if a string exist in array", inject(function (containsFilter) {
			var test_array = ["A", "B", "C"];
			expect(containsFilter(test_array, "A")).toBeTrue();
			expect(containsFilter(test_array, "Z")).toBeFalse();
		}));
	});

});