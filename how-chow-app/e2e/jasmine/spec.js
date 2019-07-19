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

    it("Should select the dish and be able to click the a dish item", function(){
        browser.get("http://localhost:4200/dish-ist");
        browser.sleep(4000);
        let searchbar = element(by.id("searchbar"));
        searchbar.sendKeys("");
        browser.sleep(4000);
        element(by.xpath('//*[@id="searchbar"]/div[2]/sui-select-option[1]/span[2]')).click();     

        browser.sleep(4000);

        element(by.id("searchbutton")).click();

        browser.sleep(4000);

        element(by.xpath('//*[@id="dish-list"]/div/app-dish-list-item[1]/div/img')).click();
        browser.sleep(4000);

        
        expect(browser.getTitle()).toBe("HowChow - Ramen");
    

    })
    it("Should select the dish and be able to click the a dish item", function(){
        browser.get("http://localhost:4200/dish-ist");
        browser.sleep(4000);
        let searchbar = element(by.id("searchbar"));
        searchbar.sendKeys("");
        browser.sleep(4000);
        element(by.xpath('//*[@id="searchbar"]/div[2]/sui-select-option[1]/span[2]')).click();     

        browser.sleep(4000);
        element(by.xpath('//*[@id="searchbar"]/div[2]/sui-select-option[1]/span[2]')).click();     
        browser.sleep(4000);

        element(by.id("searchbutton")).click();

        browser.sleep(4000);

        element(by.xpath('//*[@id="dish-list"]/div/app-dish-list-item[1]/div/img')).click();
        browser.sleep(4000);

        
        expect(browser.getTitle()).toBe("HowChow - Pad Thai");
    

    })
})