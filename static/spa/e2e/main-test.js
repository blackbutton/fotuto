describe("Fotuto App", function () {
	var base_url = 'static/spa/index.html';

	// TODO: Add alternative flows

	describe("Given I am access to the Fotuto site", function () {
		beforeEach(function () {
			// Assemble
			browser.get(base_url);
		});

		it("Should display Fotuto in page title", function () {
			expect(browser.getTitle()).toMatch(/Fotuto.*$/);
		});

		// TODO: display login form first
		//Assert
		// Since there is no any windows, the configuration wizard intro is shown
		it("Should redirect index.html to index.html#/config/intro", function () {
			browser.getLocationAbsUrl().then(function (url) {
				expect(url).toEqual('/config/intro');
			});
		});
	});

	describe("Given I am access to the configuration wizard", function () {
		beforeEach(function () {
			// TODO: Login as an operator
			// Assemble
			browser.get(base_url + '#/config/intro');
		});

		// TODO: Logged in user should be an operator to access to configuration
		it("Should display configuration wizard intro page", function () {
			// Config Wizard Intro page
			var wizard_step_view = element(by.css('#ConfigWizardIntroView'));
			expect(wizard_step_view.isPresent()).toBeTruthy();

			// TODO: Should display Configuration in page title
			// expect(browser.getTitle()).toMatch(/Fotuto - Configuration$/);

			// Check page title as Configuration Wizard
			var page_heading = element.all(by.tagName('h2')).first();
			// TODO: If the logged in user not have enough permissions instead config wizard it should display "No windows configured" message
			expect(page_heading.getText()).toBe('Configuration Wizard');
		});

		it("Should I allow to go inside the wizard", function () {
			// Click start wizard button
			var start_wizard_button = element.all(by.linkText("Start now!"));
			expect(start_wizard_button.count()).toBe(1);
			start_wizard_button.click();

			// Now I'm on the wizard step 1
			var expected_url = '/config/steps/1';
			browser.getLocationAbsUrl().then(function (url) {
				expect(url).toEqual(expected_url);
			});
		});
	});

	// Start wizard
	// Now user is on wizard step 1
	describe("Given I am started the first step of the configuration wizard", function () {
		beforeEach(function () {
			// TODO: Login as an operator
			// Assemble
			browser.get(base_url + '#/config/steps/1');
		});

		// TODO: Logged in user should be an operator to access to configuration
		it("Should display configuration wizard step 1 page", function () {
			// Config Wizard Device page
			var view_wizard_step = element(by.css('#ConfigWizardStepDevicesView'));
			expect(view_wizard_step.isPresent()).toBeTruthy();

			// TODO: Notice the step navigator
			// TODO: Wizard navigator only have step 1 active and other steps deactivated

			// Notice the Devices subtitle
			var page_subheading = element.all(by.tagName('h3')).first();
			expect(page_subheading.getText()).toBe('Devices');

			// Notice there is an empty list of devices
			var list_devices = element.all(by.repeater('device in devices'));
			expect(list_devices.count()).toBe(0);

			// TODO: Notice Device form
			// TODO: Notice Next step button (disabled since there is no device)
		});

		it("Should allow me to add devices", function () {
			// Enter new device data
			// Device fields
			var input_name = $("input[name='name']");
			input_name.sendKeys('Alarm Controller');
			// TODO: Slug field should generated automatically and it should not appear here
			var input_slug = $("input[name='slug']");
			input_slug.sendKeys('alarm-controller');
			var input_address = $("input[name='address']");
			input_address.sendKeys('0001');

			// Submit form
			var add_button = element(by.buttonText('Add'));
			add_button.click();

			// Device now appears on the list
			var list_devices = element.all(by.repeater('device in devices'));
			expect(list_devices.count()).toBe(1);
			expect(list_devices.first().getText()).toBe('Alarm Controller');

			// Form is cleared
			// Add another device
			input_name.sendKeys('Door Sensor 1');
			// TODO: Slug field should generated automatically and it should not appear here
			input_slug.sendKeys('door-sensor-1');
			input_address.sendKeys('0002');

			// Submit form
			add_button.click();

			// Device now appears on the list
			expect(list_devices.count()).toBe(2);
			expect(list_devices.first().getText()).toBe('Door Sensor 1');

			// TODO: Allow to inactive devices
			// TODO: Click on Next step button
			// TODO: Now show the wizard step 2
		});
	});

	/* TODO: 	it("Add two vars to the device", function () {

	 });

	 it("Add a window", function () {

	 });

	 // TODO: Implement the default window
	 it("Now the homepage is the windows entered", function () {

	 });

	 it("The window views is displayed but empty", function () {

	 });

	 it("Add two mimics to the window", function () {

	 });

	 it("No mimics are displayed", function () {

	 });

	 it("After some seconds the mimics var values changed", function () {

	 });*/

});
