describe('Given I am access to the site', function () {

	//describe("Fotuto shoulds appears in page title", function () {
	beforeEach(function () {
		// Assemble
		browser.get('static/spa/index.html');
	});

	//Assert
	it('The page title should display Fotuto', function () {
		expect(browser.getTitle()).toEqual('Fotuto');
	});
	//});

	// TODO: It should display the login page

	it("Since there is no any windows, the configuration wizard intro is shown", function () {

		// Config Wizard Intro page
		var wizard_step_view = element(by.css('#ConfigWizardIntroView'));
		expect(wizard_step_view.isPresent()).toBeTruthy();

		// Check page title as Configuration Wizard
		var page_heading = element.all(by.tagName('h2')).first();
		// TODO: If the logged in user not have enough permissions instead config wizard it should display "No windows configured" message
		expect(page_heading.getText()).toBe('Configuration Wizard');

		// Click start wizard button
		var start_wizard_button = element.all(by.linkText("Start now!"));
		expect(start_wizard_button.count()).toBe(1);
		start_wizard_button.click();

		// Start wizard
		// Now user is on wizard step 1
		// Config Wizard Intro page
		var view_wizard_step = element(by.css('#ConfigWizardStepDevicesView'));
		expect(view_wizard_step.isPresent()).toBeTruthy();

		// Notice there is an empty list of device
		var page_subheading = element.all(by.tagName('h3')).first();
		expect(page_subheading.getText()).toBe('Devices');
		// TODO: Notice the step navigator
		// Wizard navigator only have step 1 active and other steps deactivated
		// Notice the Devices subtitle
		var searchResult = element.all(by.repeater('device in devices'));
		expect(searchResult.count()).toBe(0);

		// Notice Device form
		// Enter new device data
		// Device fields
		$("input[name='name']").sendKeys('Alarm Controller');
		// TODO: Slug field should generated automatically and it should not appear here
		$("input[name='slug']").sendKeys('alarm-controller');
		$("input[name='address']").sendKeys('0001');

		// Submit form
		var add_button = element(by.buttonText('Add'));
		add_button.click();
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

})
;
