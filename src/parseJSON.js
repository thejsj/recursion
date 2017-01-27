// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // Higher-order function to be used for detecting type
  const firstAndLastChars = function (first, last) {
    return (str) => str[0] === first && str[str.length - 1] === last
  }
  const isArray = firstAndLastChars('[', ']')
  const isObj = firstAndLastChars('{', '}')
  const hasDoubleQuotes = firstAndLastChars('"', '"')
  const hasSingleQuotes = firstAndLastChars("'", "'")
  const isNumber = (str) => (+(str)) + '' === str
  const isString = function (str) {
    str = str.trim()
    return (hasSingleQuotes(str) || hasDoubleQuotes(str)) && str[str.length - 2] !== '\\'
  }
  const removeFirstAndLastChar = function (str) {
    str = str.trim()
    return str.substring(1).slice(0, str.length - 2) || ''
  }
  // Higher-order function to be used for splitting string
  const splitByChar = function (base_char) {
    return function (str) {
      var result = []
      var double_string_open = false
      var single_string_open = false
      var array_open = false
      var object_open = false
      var array_bracket_count = 0
      var object_bracket_count = 0
      var curr_str = ''
      var prev_ch = ''
      for (var i = 0 i < str.length i += 1) {
        var ch = str[i]
        if (ch === '"') {
          double_string_open = !double_string_open
        }
        if (ch === "'") {
          single_string_open = !single_string_open
        }
        if (ch === '[') {
          array_bracket_count += 1
          array_open = true
        }
        if (ch === ']') {
          array_bracket_count -= 1
          if (array_bracket_count === 0) {
            array_open = false
          }
        }
        if (ch === '{') {
          object_bracket_count += 1
          object_open = true
        }
        if (ch === '}') {
          object_bracket_count -= 1
          if (object_bracket_count === 0) {
            object_open = false
          }
        }
        if (ch === base_char && !double_string_open && !single_string_open && !array_open && !object_open) {
          if (curr_str !== '') result.push(curr_str.trim())
          curr_str = ''
          prev_ch = ''
        } else {
          curr_str += ch
          prev_ch = ch
        }
      }
      if (curr_str !== '') result.push(curr_str.trim())
      return result
    }
  }
  const separeateStringByCommas = splitByChar(',')
  const separeateStringByColons = splitByChar(':')
  const parseJSONString = function (str, parent) {
    str = str.trim()
    if (isArray(str)) return separeateStringByCommas(removeFirstAndLastChar(str)).map(parseJSONString)
    if (isObj(str)) {
      var obj = {}
      var _obj = separeateStringByCommas(removeFirstAndLastChar(str))
      // _obj is an array of strings with 'key: value'
      _obj.forEach(function (val, i) {
        var key_val_pair = separeateStringByColons(val) // split into key, value
        if (key_val_pair.length === 2) {
          obj[parseJSONString(key_val_pair[0])] = parseJSONString(key_val_pair[1])
        }
      })
      return obj
    }
    if (isString(str)) return removeFirstAndLastChar(str).replace(/([\\]{1})([\\\"]{1})/g, '$2')
    if (isNumber(str)) return +str
    if (str === 'null') return null
    if (str === 'false') return false
    if (str === 'true') return true
    if (str === 'undefined') return undefined
    throw new SyntaxError('Unexpected end of input')
  }
  return parseJSONString(json)
}
