// test cases are described in fixtures.js
describe('parseJSON', function () {
  var counter = 0;
  it('should match the result of calling JSON.parse', function () {
    parseableStrings.forEach(function (test) {
      counter += 1;
      console.log('------   ' + counter + '  -------');
      console.log('test');
      console.log(test);
      console.log('expected');
      var expected = JSON.parse(test);
      console.log(expected);
      console.log('result');
      var result = parseJSON(test);
      console.log(result);
      console.log('equality');
      var equality = _.isEqual(result, expected); // why can't we use `===` here?
      console.log(equality);
      expect(equality).to.equal(true);
    });
  });

  it('should throw an error for invalid stringified JSON', function () {
    unparseableStrings.forEach(function (test) {
      var fn = function () {
          parseJSON(test);
        }
        // if you'd prefer, you can write your version of parseJSON
        // so that it passes this test instead of the one on line 21.
        // expect(parseJSON(test)).to.equal(undefined);
      expect(fn).to.throw(SyntaxError);
    });
  });

});