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
