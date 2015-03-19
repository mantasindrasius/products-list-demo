describe("a product service", function() {
    var baseUrl = 'http://localhost:9999/';
    var service = new ProductService(baseUrl + 'api/products');

    var product = {
        name: "Lenovo",
        price: "60 EUR"
    };

    it("find a product description by SKU code", () =>
        service
            .storeProduct("XYZ", product)
            .then(() =>
                service
                    .getBySku("XYZ")
                    .then(function(result) {
                        expect(result.name).to.be.equal("Lenovo");
                        expect(result.price).to.be.equal("60 EUR");
                    })
            )
    );
});