describe("a product list widget", function() {
    beforeEach(function() {
        var targetElement = document.createElement('div');

        var service = new ProductService();
        var dataRenderer = new DataRenderer();

        this.getProducts = sinon.stub(service, 'getProducts');
        this.render = sinon.stub(dataRenderer, 'render');

        service.getProducts = this.getProducts;
        dataRenderer.render = this.render;

        this.widget = new ProductListWidget(targetElement, service, dataRenderer);
        this.$targetElement = $(targetElement);
    });

    it("render a product list", function() {
        var givenProducts = [{
            sku: 'XX-1234',
            name: 'DEF',
            price: '50 EUR'
        }, {
            sku: 'XX-1235',
            name: 'XYZ',
            price: '500 EUR'
        }];

        var productResult = Promise.resolve(givenProducts);
        var renderResult = Promise.resolve('ok');

        this.getProducts.returns(productResult);
        this.render.withArgs('product-items', sinon.match.same(givenProducts)).returns(renderResult);

        var $targetElement = this.$targetElement;

        return this.widget.render().then(function() {
            expect($targetElement.html()).to.be.equal('ok');
        });
    });
});
