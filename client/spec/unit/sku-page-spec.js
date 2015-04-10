describe("a SKU page", function() {
    beforeEach(function() {
        var targetElement = document.createElement('div');

        var service = new ProductService();
        var dataRenderer = new DataRenderer();

        this.getProduct = sinon.stub(service, 'getProduct');
        this.render = sinon.stub(dataRenderer, 'render');

        service.getProduct = this.getProduct;
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

        var getProduct = this.getProduct;
        var render = this.render;

        getProduct.returns(productResult);
        render.returns(renderResult);

        var $targetElement = this.$targetElement;

        return this.page.findProduct("XYZ").then(function() {
            expect($targetElement.find('#name').html()).to.be.equal('DEF');
            expect($targetElement.find('#price').html()).to.be.equal('50 EUR');

            assert(getProduct.calledWith("XYZ"));
            assert(render.calledWith('product', sinon.match.same(data)));
        });
    });

    it("render error message if product service fails", function() {
        var productResult = Promise.reject('error_message');
        var renderResult = Promise.resolve('<span id="error">Failed to fetch product data</span>');

        var getProduct = this.getProduct;
        var render = this.render;

        getProduct.returns(productResult);
        render.returns(renderResult);

        var $targetElement = this.$targetElement;

        return this.page.findProduct("XYZ").then(function() {
            expect($targetElement.find('#error').html()).to.be.equal('Failed to fetch product data');

            assert(getProduct.calledWith("XYZ"));
            assert(render.calledWith('error', { message: 'error_message' }));
        });
    });
});
