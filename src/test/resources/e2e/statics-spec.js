"use strict";

describe("the server", function() {
    var http = new HttpClient(jsExecConfig.baseUrl);

    it("serve the index file", function() {
        return http.get('index.html')
            .then(function(gotResult) {
                expect($(document).find('body').length).to.be.equal(1);
            });
    });

    it("serve file from the app directory", function() {
        return http.get('app/js/sku-page.js')
            .then(function(contentType) {
                expect(contentType).to.be.equal('application/javascript');
            });
    });

});