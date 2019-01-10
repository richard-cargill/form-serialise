function parseSelectMultipleToString(elem) {
  return [...elem.childNodes]
    .filter(childElem => childElem.selected)
    .map(childElem => `${elem.name}=${childElem.value}`)
    .join('&');
}

function reduceInputToArray() {
  return function (accu, curr) {
    if (curr.value) {
      switch (curr.type) {
        case 'select-multiple':
          accu = [...accu, parseSelectMultipleToString(curr)];
          break;
        case 'text':
        case 'email':
        case 'textarea':
        case 'select-one':
        case 'date':
        case 'password':
        case 'number':
          accu.push(`${curr.name}=${curr.value}`);
          break;
        case 'radio':
        case 'checkbox':
          if (curr.checked) {
            accu.push(`${curr.name}=${curr.value}`);
          }
          break;
        default:
          console.warn(`${curr.type} not supported`);
          break;
      }
    }

    return accu;
  };
}

function serialise(form) {
  const elems = [...form.elements];

  const objs = elems
    .reduce(reduceInputToArray(), [])
    .join('&');

  return objs;
}

export {serialise};
