'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function parseSelectMultipleToString(elem) {
  return _toConsumableArray(elem.childNodes).filter(function (childElem) {
    return childElem.selected;
  }).map(function (childElem) {
    return "".concat(elem.name, "=").concat(childElem.value);
  }).join('&');
}

function reduceInputToArray() {
  return function (accu, curr) {
    if (curr.value) {
      switch (curr.type) {
        case 'select-multiple':
          accu = [].concat(_toConsumableArray(accu), [parseSelectMultipleToString(curr)]);
          break;

        case 'text':
        case 'email':
        case 'textarea':
        case 'select-one':
        case 'date':
        case 'password':
        case 'number':
          accu.push("".concat(curr.name, "=").concat(curr.value));
          break;

        case 'radio':
        case 'checkbox':
          if (curr.checked) {
            accu.push("".concat(curr.name, "=").concat(curr.value));
          }

          break;

        default:
          console.warn("".concat(curr.type, " not supported"));
          break;
      }
    }

    return accu;
  };
}

function serialise(form) {
  var elems = _toConsumableArray(form.elements);

  var objs = elems.reduce(reduceInputToArray(), []).join('&');
  return objs;
}

exports.serialise = serialise;
