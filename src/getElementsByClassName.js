// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  'use strict';
  // your code here
  var elements = [];
  var hasClass = function (elClassName, className) {
    return elClassName.split(' ').indexOf(className) > -1;
  };
  var _getElementsByClassName = function (className, el) {
    if (el.className && hasClass(el.className, className)) {
      elements.push(el);
    }
    if (el.childNodes.length > 0) {
      for (var i = 0; i < el.childNodes.length; i += 1) {
        _getElementsByClassName(className, el.childNodes[i]);
      }
    }
  };
  _getElementsByClassName(className, document);
  return elements;
};