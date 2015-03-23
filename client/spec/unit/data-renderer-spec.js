describe("a SKU page", function() {
    beforeEach(function() {
        this.renderer = new DataRenderer();
    });

    it("render a product data", function() {
        var givenData = {
            name: 'XYZ',
            price: '99 USD'
        };

        return this.renderer.render('product', givenData).then(function(result) {
            expect($(result).find('#name').html()).to.be.equal('XYZ');
            expect($(result).find('#price').html()).to.be.equal('99 USD');
        });
    });

    it("render a product list", function() {
        var givenProducts = [
            {
                sku: 'XX-1234',
                name: 'XYZ',
                price: '99 USD'
            }, {
                sku: 'XX-1235',
                name: 'DEF',
                price: '102 USD'
            }];

        return this.renderer.render('product-items', givenProducts)
            .then(result => {
                expect($(result).find('.product-item').length).to.be.equal(2);
                expect($(result).find('.product-item:eq(1) .product-name').html()).to.be.equal('DEF');
            });
    });

    it("render an error message", function() {
        var givenData = {
            message: 'This is a failure'
        };

        return this.renderer.render('error', givenData).then(function(result) {
            expect($(result).find('#error').html()).to.be.equal('This is a failure');
        });
    });

    it("fail to render an unknown template", function() {
        return this.renderer.render('unknown', {}).catch(function(error) {
            expect(error.message).to.be.equal('Template Not Found: unknown');
        });
    });
});
