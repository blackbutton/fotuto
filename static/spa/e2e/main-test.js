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
		//var page_subheading = element.all(by.tagName('h3')).first();
		//expect(page_subheading.getText()).toBe('Devices');
		// Notice the step navigator
		// Wizard navigator only have step 1 active and other steps deactivated
		// Notice the Devices subtitle
		// Notice there is an empty list of device
		// Notice Device form
		// Enter new device data

		// Device fields
		var name_input = $("input[name='name']");
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
