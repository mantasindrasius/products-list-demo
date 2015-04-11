"use strict";

describe("a product service", function() {
    var http = new HttpClient(jsExecConfig.baseUrl);

    it("store and retrieve product data", function() {
        var givenProductId = "XYZDEF";

        return givenProductExists(givenProductId, "Hello", "212 EUR")
            .then(function() {
                return http.get(givenProductId)
            })
            .then(function(gotResult) {
                expect(gotResult.name).to.be.equal("Hello");
                expect(gotResult.price).to.be.equal("212 EUR");
            });
    });

    it("get all the products", function() {
        return givenRandomProductsExist(3)
            .then(function(productsInStock) {
                return http.get("")
                    .then(function(gotResult) {
                        expect(gotResult).to.haveBodyThatContains(productsInStock)
                    });
            });
    });

    function randomString(n) {
        var codes = [];

        for(var i = 0; i < n; i++ ) {
            codes.push(Math.floor(Math.random() * 64) + 64);
        }

        return String.fromCharCode.apply(this, codes);
    }

    function givenProductExists(productId, withName, withPrice) {
        var product = {
            name: withName,
            price: withPrice
        };

        return http.put(productId, product)
            .then(function() {
                return product;
            })
    }

    function givenRandomProductsExist(n) {
        var promises = [];

        for (var i = 0; i < n; i++) {
            promises.push(givenProductExists(randomString(10), randomString(11), randomString(8)));
        }

        return Promise.all(promises);
    }


    chai.Assertion.addMethod('containAllOf', function (expectedValues) {
        var actualValues = this._obj;
        var fail = false;

        for (var i = 0; i < expectedValues.length; i++) {
            if (_.where(actualValues, expectedValues[i]).length == 0) {
                fail = true;
                break;
            }
        }
        expect(fail).to.be.false;
    });

    chai.Assertion.addMethod('haveBodyThatContains', function(expectedProducts) {
        var actual = this._obj;

        expect(actual).to.containAllOf(expectedProducts);
    });
});