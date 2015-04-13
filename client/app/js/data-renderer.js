function DataRenderer() {

    this.render = function(template, data) {
        return new Promise(function (fulfill, reject) {
            dust.render(template, data, function(err, out) {
                if (err) reject(err);
                else fulfill(out);
            });
        });
    };

    function registerTemplate(name, content) {
        var template = dust.compile(content, name);

        dust.loadSource(template);
    }

    registerTemplate('product', '<div>Name: <span id="name">{name}</span></div><div>Price: <span id="price">{price}</span></div>');
    registerTemplate('product-items', '<table>{#.}<tr class="product-item"><td class="product-sku">{sku}</td><td class="product-name">{name}</td><td class="product-price">{price}</td></tr>{/.}</table>');
    registerTemplate('error', '<div><span id="error">{message}</span></div>');
}
