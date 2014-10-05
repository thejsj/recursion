// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
  var firstAndLastChars = function (first, last) {
    return function (str) {
      return str[0] === first && str[str.length - 1] === last;
    };
  };
  var isArray = firstAndLastChars('[', ']');
  var isObj = firstAndLastChars('{', '}');
  var hasDoubleQuotes = firstAndLastChars('"', '"');
  var hasSingleQuotes = firstAndLastChars("'", "'");
  var isString = function (str) {
    str = removeSpaces(str);
    return hasSingleQuotes(str) || hasDoubleQuotes(str);
  };
  var isNumber = function (str) {
    return (+(str)) + '' === str;
  };
  var removeSpaces = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var removeFirstAndLastChar = function (str) {
    str = removeSpaces(str);
    return str.substring(1).slice(0, str.length - 2) || '';
  };
  var parseStringIntoKeyValuePairs = function (str, result) {
    if (str === '') return result;
    var string_open = false;
    var array_open = false;
    var object_open = false;
    var array_bracket_count = 0;
    var object_bracket_count = 0;
    var current = '';
    for (var i = 0; i < str.length; i += 1) {
      var ch = str[i];
      if (ch === '"' || ch === "'") {
        string_open = !string_open;
      }
    }
    console.log(str);
    return result;
  };
  var parseJSONString = function (str) {
    str = removeSpaces(str);
    if (isArray(str)) {
      var array = removeFirstAndLastChar(str).split(',');
      if (array.length === 1 && array[0] === '') return [];
      return array.map(parseJSONString);
    } else if (isObj(str)) {
      var _obj = {};
      /**
       * I wanted to do something elegant with regular expressions that could
       * parse object key value pairs nicely with regular expressions, but
       * Douglas Crockford seems to think that's a bad idea!
       * https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
       */
      window.regex = /(("[^"]+"[^,]*):[ ]{0,1}([A-z0-9]+|(\[[^\]]+\]*))|("[^"]+"[^,]*))(?:[,]{0,1}?)/g;
      window.str = removeFirstAndLastChar(str);
      var tab = '     ';
      var _str = removeFirstAndLastChar(str);
      var _split = _str.split(',');
      var _regex = parseStringIntoKeyValuePairs(_str, []);
      var obj = _regex || _split;
      console.log(tab + 'Split!');
      console.log(tab + _str);
      console.log(tab + 'split(,)');
      console.log(tab + _split);
      console.log(tab + 'Reg Exp: ' + regex.toString());
      console.log(tab + _regex);
      console.log(tab + 'OJB:');
      console.log(obj);
      console.log(tab + 'EQUAL ? ' + (_split == _regex));
      // obj is an array of strings with key: value
      obj.forEach(function (val, i) {
        window.regex_split = /({[^}]+}|[^:]+)/g;
        var split = val.match(regex_split) || val.split(':');
        console.log('SPLIT ":"');
        console.log(split);
        console.log(split.length);
        if (split.length === 2) {
          _obj[parseJSONString(split[0])] = parseJSONString(split[1]);
        }
      });
      console.log('_obj');
      console.log(_obj);
      return _obj;
    } else if (isString(str)) {
      return removeFirstAndLastChar(str);
    } else
    if (isNumber(str)) {
      return +str;
    } else {
      if (str === 'null') return null;
      if (str === 'false') return false;
      if (str === 'true') return true;
      if (str === 'undefined') return undefined;
      console.log('NOT FOUND');
      throw new Error('String could not be parsed');
    }
  };
  return parseJSONString(json);
};