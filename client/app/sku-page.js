var productSource = '<div>Name: <span id="name">{name}</span></div><div>Price: <span id="price">{price}</span></div>';
var template = dust.compile(productSource, 'product');

dust.loadSource(template);

function SkuPage(pageElement, productService) {
    this.findProduct = function(sku) {
        return productService.getBySku(sku).then(function(data) {
            return new Promise(function(fulfill, reject) {
                dust.render("product", data, function (err, out) {
                    if (out) {
                        pageElement.innerHTML = out;
                        fulfill();
                    } else {
                        reject(err);
                    }
                });
            });
        });
    };
}