var e2e = require('../e2e-drivers.js');
var baseUrl = require('../config.js').serverBaseUrl;
var httpClient = require('../http-client.js').client;

var drivers = e2e.drivers;
var webdriver = e2e.webdriver;

describe("a SKU page", function(done) {
    it("find a product description by SKU code", function(done) {
        var givenProductSku = '20BF001PUS';
        var givenProductName = 'Lenovo ThinkPad T540p';
        var givenProductPrice = '50 EUR';

        httpClient
            .put(baseUrl + 'api/products/' + givenProductSku, {
                name: givenProductName,
                price: givenProductPrice
            })
            .then(function() {
                var driver = drivers.driver;

                driver.get(baseUrl + 'index.html');

                var skuInputField = driver.findElement(webdriver.By.id('sku'));
                var submitButton = driver.findElement(webdriver.By.id('submit'));

                skuInputField.sendKeys(givenProductSku);
                submitButton.click();

                var productName = driver.findElement(webdriver.By.id('name'));

                productName.getInnerHtml().then(function(name, error) {
                    expect(name).toBe(givenProductName);
                    done();
                });
            });
    });
});