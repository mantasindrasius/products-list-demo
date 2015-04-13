"use strict";

function ProductListWidget(element, productService, dataRenderer) {
    this.render = function() {
        return productService.getProducts()
            .then(function(products) {
                return dataRenderer.render('product-items', products);
            })
            .then(function(html) {
                element.innerHTML = html;
            });
    }
}