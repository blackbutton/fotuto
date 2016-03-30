describe('', function () {
	var scope = {};
	beforeEach(function () {
		module('fotuto');
		inject(function ($controller) {
			$controller('DeviceController', {$scope: scope});
		});
		scope.add({
			'name': 'Door Sensor',
			'slug': 'door-sensor',
			'address': '0002'
		});
	});
	it('Controller add', function () {
		expect(scope.devices[0].name).toBe('Door Sensor');
	});
});