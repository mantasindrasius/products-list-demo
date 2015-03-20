function ProductService(baseUrl) {
    this.storeProduct = function(sku, product) {
        return new Promise(function(fulfill, reject) {
            $.ajax({
                url: baseUrl + '/' + sku,
                method: 'PUT',
                success: fulfill,
                error: function(xhr) { reject(xhr.status); },
                contentType: 'application/json',
                data: JSON.stringify(product)
            });
        });
    };

    this.getBySku = function(sku) {
        return new Promise(function(fulfill) {
            $.getJSON(baseUrl + '/' + sku, fulfill);
        });
    }
}