var e2e = require('../e2e-drivers.js');
var baseUrl = require('../config.js').serverBaseUrl;
var http = require('../http-client.js').client;
var expect = require('chai').expect;

var drivers = e2e.drivers;
var webdriver = e2e.webdriver;

describe("a SKU page", () => {
    let whenProductExists = (givenProductSku, givenProductName, givenProductPrice) =>
        http.put(baseUrl + 'api/products/' + givenProductSku, {
            name: givenProductName,
            price: givenProductPrice
        });

    let givenProductSku = '20BF001PUS';
    let givenProductName = 'Lenovo ThinkPad T540p';
    let givenProductPrice = '50 EUR';

    it("find a product description by SKU code", () =>
        whenProductExists(givenProductSku, givenProductName, givenProductPrice)
            .then(() => {
                var driver = drivers.driver;

                driver.get(baseUrl + 'index.html');

                var skuInputField = driver.findElement(webdriver.By.id('sku'));
                var submitButton = driver.findElement(webdriver.By.id('submit'));

                skuInputField.sendKeys(givenProductSku);
                submitButton.click();

                var productName = driver.findElement(webdriver.By.id('name'));

                return productName.getInnerHtml()
                    .then(name => expect(name).to.be.equal(givenProductName));
            })
    );
});