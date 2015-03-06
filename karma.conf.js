module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'sinon'],
        files: [
            'client/app/bower_components/promise-js/promise.js',
            'client/app/bower_components/dustjs-linkedin/dist/dust-full.js',
            'client/app/bower_components/dustjs-linkedin-helpers/dist/dust-helpers.js',
            'client/app/bower_components/jquery/dist/jquery.js',
            'client/app/sku-page.js',
            'client/app/product-service.js',
            'client/spec/unit/sku-page-spec.js'
        ],
        reporters: ['dots'],
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 1000,
        singleRun: false
    });
};