const stringifyJSON = function (obj) {
  const appendVariableString = (obj) => {
    if (Array.isArray(obj)) return '[' + obj.map(appendVariableString).join(',') + ']'
    if (obj === null) return 'null'
    if (typeof obj === 'number' || typeof obj === 'boolean') return obj.toString()
    if (typeof obj === 'string') return '"' + obj.toString() + '"'
    if (typeof obj === 'object') {
      var _obj = Object.key(obj)
        .map((key) => {
          const val = obj[key]
          if (appendVariableString(val)) return appendVariableString(key) + ":" + appendVariableString(val)
        })
        .filter(val => val !== undefined)
      return '{' + _obj.join(',') + '}'
    }
    if (typeof obj !== 'function' && obj !== undefined) throw new Error(typeof obj + 'TYPE NOT SUPPORTED')
    return false
  }
  return appendVariableString(obj)
};
