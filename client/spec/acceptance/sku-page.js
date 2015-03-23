var e2e = require('../e2e-drivers.js');
var baseUrl = require('../config.js').serverBaseUrl;
var http = require('../http-client.js').client;
var chai = require('chai');
var expect = chai.expect;
var Promise = require('promise');
var _ = require('underscore');

var drivers = e2e.drivers;
var webdriver = e2e.webdriver;

describe("a SKU page", () => {
    let whenProductExists = (givenProductSku, givenProductName, givenProductPrice) =>
        http.put(baseUrl + 'api/products/' + givenProductSku, {
            name: givenProductName,
            price: givenProductPrice
        });

    let whenRandomSetOfProductsExist = numOfProducts =>
        Promise.all(randomSetOfProducts(numOfProducts).map(product =>
            whenProductExists(product.sku, product.name, product.price)
                .then(response => product)));

    let randomSetOfProducts = numOfProducts =>
        _.range(numOfProducts).map(i => {
            return {
                sku: randomString(7),
                name: randomString(10),
                price: randomString(5)
            }
        });

    function randomString(n) {
        return Math.random().toString();
    }

    function openIndexPage() {
        let driver = drivers.driver

        driver.get(baseUrl + 'index.html');
        //driver.getPageSource().then(src => console.log(src));

        return driver;
    }

    beforeEach(() => {
        this.givenProductSku = '20BF001PUS';
        this.givenProductName = 'Lenovo ThinkPad T540p';
        this.givenProductPrice = '50 EUR';
    });

    it("find a product description by SKU code", () =>
        whenProductExists(this.givenProductSku, this.givenProductName, this.givenProductPrice)
            .then(() => {
                let driver = openIndexPage();

                let skuInputField = driver.findElement(webdriver.By.id('sku'));
                let submitButton = driver.findElement(webdriver.By.id('submit'));

                skuInputField.sendKeys(this.givenProductSku);
                submitButton.click();

                let productName = driver.findElement(webdriver.By.id('name'));

                return productName
                    .getInnerHtml()
                    .then(name => expect(name).to.be.equal(this.givenProductName));
            })
    );

    it("display the list of available products", () =>
        whenRandomSetOfProductsExist(3)
            .then(productsCreated =>
                openIndexPage()
                    .findElement(webdriver.By.id('products-list'))
                    .findElements(webdriver.By.css('.product-item'))
                    .then(foundElements => Promise.all(foundElements.map(element =>
                        element.findElement(webdriver.By.css('.product-name')).getInnerHtml()
                    )))
                    .then(names => expect(productsCreated).to.haveNamesFrom(names))
            )
    );
});