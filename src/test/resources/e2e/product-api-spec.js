describe("a product service", function() {
    var baseUrl = 'http://localhost:9999/';
    var http = new HttpClient(baseUrl + 'api/products');

    var product = {
        name: "Lenovo",
        price: "60 EUR"
    };

    it("find a product description by SKU code", function() {
        return http.put("XYZDEF", product)
            .then(function() {
                return http.get("XYZDEF")
            })
            .then(function(gotResult) {
                expect(gotResult.name).to.be.equal("Lenovo");
                expect(gotResult.price).to.be.equal("60 EUR");
            });
    });
});