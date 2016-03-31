describe('', function () {
	var scope = {};
	beforeEach(function () {
		module('fotuto');
		inject(function ($controller) {
			$controller('DeviceController', {$scope: scope});
		});

		scope.add({
			'name': 'Alarm Controller',
			'slug': 'alarm-controller',
			'address': '0001'
		});
		scope.add({
			'name': 'Door Sensor',
			'slug': 'door-sensor',
			'address': '0002'
		});
	});

	it('Should Controller add Devices', function () {
		expect(scope.devices[0].name).toBe('Door Sensor');
		expect(scope.devices[1].name).toBe('Alarm Controller');
	});

	it('Should clean Controller add form', function () {
		expect(scope.device).toEqual({});
	});
});