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
            .then(() => service.getProduct("XYZ"))
            .then(function(result) {
                expect(result.name).to.be.equal("Lenovo");
                expect(result.price).to.be.equal("60 EUR");
            })
    );

    it("list all products in the server", () =>
        service
            .storeProduct("SKU-1", product)
            .then(() => service.storeProduct("SKU-2", product))
            .then(() => service.getProducts())
            .then(productsInStock => {
                console.log(productsInStock);

                return expect(productsInStock).to.haveSkus(['SKU-2', 'SKU-1'])
            })
    );
});