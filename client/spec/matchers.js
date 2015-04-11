function configureChai(chai, _) {
    var expect = chai.expect;

    chai.Assertion.addMethod('haveNamesFrom', function (expectedNames) {
        let actualNames = this._obj.map(i => i.name);

        expect(actualNames).to.containAllOf(expectedNames);
    });

    chai.Assertion.addMethod('containAllOf', function (expectedValues) {
        let actualValues = this._obj;
        let intersection = _.intersection(actualValues, expectedValues);

        expect(intersection).to.eql(expectedValues);
    });

    chai.Assertion.addMethod('haveSkus', function (expected) {
        let actual = this._obj.map(i => i.sku);

        expect(actual).to.containAllOf(expected);
    });

    console.log('chai configured');
}

if (typeof exports != 'undefined') {
    exports.configureChai = configureChai;
}