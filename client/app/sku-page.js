function SkuPage(pageElement, productService, dataRenderer) {
    this.findProduct = function(sku) {
        return productService
            .getProduct(sku)
            .then(function(data) {
                display('product', data);
            })
            .catch(function(error) {
                display('error', { message: error })
            });
    };

    function display(template, data) {
        dataRenderer.render(template, data).then(function(out) {
            pageElement.innerHTML = out;
        });
    }
}
