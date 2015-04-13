function configureChai(chai, _) {
    var expect = chai.expect;

    chai.Assertion.addMethod('haveNamesFrom', function (expectedNames) {
        let actualNames = this._obj.map(i => i.name);

        expect(actualNames).to.containValuesFrom(expectedNames);
    });

    chai.Assertion.addMethod('containValuesFrom', function (expectedValues) {
        let actualValues = this._obj;
        let intersection = _.intersection(actualValues, _.difference(actualValues, expectedValues));

        expect(intersection.length).to.be.equal(0);
    });

    chai.Assertion.addMethod('containAllOf', function (expectedValues) {
        let actualValues = this._obj;
        let intersection = _.intersection(actualValues, expectedValues);

        expect(expectedValues).to.eql(intersection);
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