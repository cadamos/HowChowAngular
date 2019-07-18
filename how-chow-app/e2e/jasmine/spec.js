/*

The syntax for a Jasmine Test is: 

describe("Description of the suite", function() {
    it("What the test tests for", function() {
        expect(someValue).toBe(expectedValue);
    });
});

*/

browser.ignoreSynchronization = true;

describe("How Chow Application", function() {

    username = Math.random().toString();

    it("Should go to the Register page", function() {

        browser.get("http://localhost:4200/register");

        expect(browser.getTitle()).toBe("HowChow - Registration");

    })

    it("Should register a new user and redirect to login page", function() {

        element(by.id("username")).sendKeys(username);
        element(by.id("password")).sendKeys("password");

        submit = element(by.id("submit"));
        submit.click();

        setTimeout( function() {
            expect(browser.getTitle()).toBe("HowChow - Login");
        }, 2000);

    })

    it("Should login the registered user and redirect to dish display page", function() {

        element(by.id("username")).sendKeys(username);
        element(by.id("password")).sendKeys("password");

        submit = element(by.id("submit"));
        submit.click();

        setTimeout( function() {
            expect(browser.getTitle()).toBe("HowChow - Dish List");
        }, 2000);

    })
})