describe("a product service", function() {
    var baseUrl = 'http://localhost:9999/';

    it("find a product description by SKU code", function(done) {
        var service = new ProductService(baseUrl + 'api/products');
        var product = {
            name: "Lenovo",
            price: "60 EUR"
        };

        service
            .storeProduct("XYZ", product)
            .then(function() {
                service
                    .getBySku("XYZ")
                    .then(function(result) {
                        expect(result.name).toBe("Lenovo");
                        expect(result.price).toBe("60 EUR");

                        done();
                    })
            });
    });
});