// test cases are described in fixtures.js
describe('stringifyJSON', function () {
  it('should match the result of calling JSON.stringify', function () {

    stringifiableObjects.forEach(function (test) {
      var result = stringifyJSON(test);
      var expected = JSON.stringify(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function (obj) {
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      console.log(obj);
      console.log(expect(obj).to.equal(obj));
      expect(result).to.equal(expected);
    });

  });
});