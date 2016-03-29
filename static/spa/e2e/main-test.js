describe('Given I am access to the site', function () {

	beforeEach(function () {
		// Assemble
		browser.get('static/spa/index.html');
	});

	//Assert
	it('The page title should display Fotuto', function () {
		expect(browser.getTitle()).toEqual('Fotuto');
	});
});
