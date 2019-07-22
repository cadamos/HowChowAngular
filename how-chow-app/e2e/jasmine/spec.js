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

    it("Should register a new user", function() {

        element(by.id("username")).sendKeys(username);
        element(by.id("password")).sendKeys("password");

        submit = element(by.id("submit"));
        submit.click();

        setTimeout( function() {
            expect(browser.getTitle()).toBe("HowChow - Login");
        }, 5000);

        browser.sleep(5000);

    })

    it("Should login the registered user", function() {

        element(by.id("username")).sendKeys(username);
        element(by.id("password")).sendKeys("password");

        submit = element(by.id("submit"));
        submit.click();

        setTimeout( function() {
            expect(browser.getTitle()).toBe("HowChow - Dish List");
        }, 5000);

        browser.sleep(5000);

    })

    it("Should select a tag and be able to click the a dish item", function(){
        browser.sleep(2000);
        let searchbar = element(by.id("searchbar"));
        searchbar.sendKeys("");
        browser.sleep(2000);
        element(by.xpath('//*[@id="searchbar"]/div[2]/sui-select-option[23]/span[2]')).click();     
        browser.sleep(2000);
        element(by.id("searchbutton")).click();
        browser.sleep(2000);
        element(by.xpath('//*[@id="dish-list"]/div/app-dish-list-item/div/div[2]/div/h5')).click();
        browser.sleep(2000);
        
        expect(browser.getTitle()).toBe("HowChow - Tacos");
    
    })

})