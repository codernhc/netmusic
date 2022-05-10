export function debounce(
  func: Function,
  wait: number,
  immediate: boolean = false
): Function {
  let timeout: number;
  let result: any;

  return function () {
    // this 指向问题
    let context = this;
    // e 事件对象
    let args = arguments;

    clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);

      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
}
