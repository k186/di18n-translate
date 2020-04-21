export function hasClass(ele, cls) {
  return new RegExp(cls).test(ele.className || '');
}

export function addClass(ele, cls) {
  var _pattern = new RegExp(cls);
  if (!_pattern.test(ele.className)) ele.className += ' ' + cls;
  return ele;
}

export function removeClass(ele, cls) {
  if (!ele || ele.nodeType !== 1) return;
  var _pattern = new RegExp(cls);
  if (_pattern.test(ele.className || '')) ele.className = ele.className.replace(_pattern, '');
  return ele;
}
export function  getValueByPath(obj, path) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  var flag = true;
  for (var len = keyArr.length; i < len - 1; ++i) {
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      flag = false;
    }
  }
  if (flag) {
    return tempObj[keyArr[i]];
  } else {
    return undefined;
  }
}