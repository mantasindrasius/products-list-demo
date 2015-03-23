var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var exports = module.exports = {}

exports.webdriver = webdriver;

exports.drivers = new function() {
    var me = this;

    var _driver;

    //var _service = new chrome.ServiceBuilder(path).build();
    //chrome.setDefaultService(_service);

    this.__defineGetter__('driver', function(){
        if (!_driver) {
            me.setDriver('phantom');
        }

        return _driver;
    });

    this.setDriver = function(name) {
        _driver = new webdriver.Builder()
            .withCapabilities(me.capabilitiesByName(name))
            .build();
    };

    this.capabilitiesByName = function(name) {
        var caps = webdriver.Capabilities.phantomjs();

        if (name == 'chrome')
            caps = webdriver.Capabilities.chrome();

        return caps;
    };

    this.stop = function() {
        if (_driver)
            _driver.quit();
    }
}
