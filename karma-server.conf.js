module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'sinon'],
        files: [
            'client/app/bower_components/promise-js/promise.js',
            'client/app/bower_components/jquery/dist/jquery.js',
            'client/app/product-service.js',
            'client/spec/contract/product-service-spec.js'
        ],
        reporters: ['dots'],
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS_without_security'],
        browserNoActivityTimeout: 1000,
        singleRun: false,
        customLaunchers: {
            PhantomJS_without_security: {
                base: 'PhantomJS',
                flags: ['--web-security=no']
            }
        }
    });
};