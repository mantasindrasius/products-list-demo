describe("a SKU page", function() {
    it("render a product data", () => {
        var targetElement = document.createElement('div');
        var service = new ProductService();
        var getBySku = sinon.stub(service, 'getBySku');

        document.documentElement.appendChild(targetElement);

        var page = new SkuPage(targetElement, service);
        var productResult = Promise.resolve({
            name: 'DEF',
            price: '50 EUR'
        });

        service.getBySky = getBySku;

        getBySku.withArgs("XYZ").returns(productResult);

        return page.findProduct("XYZ")
            .then(function() {
                var nameElement = document.getElementById('name');
                var priceElement = document.getElementById('price');

                expect(nameElement.textContent).to.be.equal('DEF');
                expect(priceElement.textContent).to.be.equal('50 EUR');
            });
    });
});
