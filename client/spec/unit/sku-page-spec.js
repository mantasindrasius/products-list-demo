describe("a SKU page", function() {
    beforeEach(function() {
        var targetElement = document.createElement('div');

        var service = new ProductService();
        var dataRenderer = new DataRenderer();

        this.getBySku = sinon.stub(service, 'getBySku');
        this.render = sinon.stub(dataRenderer, 'render');

        service.getBySky = this.getBySku;
        dataRenderer.render = this.render;

        this.page = new SkuPage(targetElement, service, dataRenderer);
        this.$targetElement = $(targetElement);
    });

    it("render a product data", function() {
        var data = {
            name: 'DEF',
            price: '50 EUR'
        };

        var productResult = Promise.resolve(data);
        var renderResult = Promise.resolve('<span id="name">DEF</span><span id="price">50 EUR</span>');

        this.getBySku.withArgs("XYZ").returns(productResult);
        this.render.withArgs('product', sinon.match.same(data)).returns(renderResult);

        var $targetElement = this.$targetElement;

        return this.page.findProduct("XYZ").then(function() {
            expect($targetElement.find('#name').html()).to.be.equal('DEF');
            expect($targetElement.find('#price').html()).to.be.equal('50 EUR');
        });
    });

    it("render error message if product service fails", function() {
        var productResult = Promise.reject('error_message');
        var renderResult = Promise.resolve('<span id="error">Failed to fetch product data</span>');

        this.getBySku.withArgs("XYZ").returns(productResult);
        this.render.withArgs('error', { message: 'error_message' }).returns(renderResult);

        var $targetElement = this.$targetElement;

        return this.page.findProduct("XYZ").then(function() {
            expect($targetElement.find('#error').html()).to.be.equal('Failed to fetch product data');
        });
    });
});
