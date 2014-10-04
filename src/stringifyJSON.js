// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// From underscore.js
// Return the results of applying the iterate to each element.
var map = _.collect = function (obj, iteratee, context) {
  if (obj == null) return [];
  var keys = obj.length !== +obj.length && Object.keys(obj),
    length = (keys || obj).length,
    results = Array(length),
    currentKey;
  for (var index = 0; index < length; index++) {
    currentKey = keys ? keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

// but you don't so you're going to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var appendVariableString = function (obj) {
    if (Array.isArray(obj)) {
      return '[' + obj.map(appendVariableString).join(',') + ']';
    } else if (obj === null) {
      return 'null';
    } else
    if (typeof obj === 'object') {
      var _obj = map(obj, function (val, key) {
        if (appendVariableString(val)) {
          return appendVariableString(key) + ":" + appendVariableString(val);
        }
      }).filter(function (val) {
        return val !== undefined;
      });
      return '{' + _obj.join(',') + '}';
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj.toString();
    } else if (typeof obj === 'string') {
      return '"' + obj.toString() + '"';
    } else if (typeof obj !== 'function' && obj !== undefined) {
      throw new Error(typeof obj + 'TYPE NOT SUPPORTED');
    } else {
      return false;
    }
  };
  return appendVariableString(obj);
};