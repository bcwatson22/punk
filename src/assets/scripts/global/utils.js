const delay = (time) => {

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(true);

    }, time);

  });

}

const debounce = (func, delay) => {

  let timerId;

  return function (...args) {

    if (timerId) {

      clearTimeout(timerId);

    }

    timerId = setTimeout(() => {

      func(...args);

      timerId = null;

    }, delay);

  }

}

const getCSSVar = (name, $target) => {

  const $elem = ($target) ? $target : document.body;
  const styles = getComputedStyle($elem);

  return styles.getPropertyValue(`--${name}`);

}

const setCSSVar = (key, value, $target) => {

  const $elem = ($target) ? $target : document.body;

  $elem.style.setProperty(`--${key}`, value);

  return value;

}

const emptyElement = ($element) => {

  while ($element.firstChild) $element.removeChild($element.firstChild);

  return $element;

}

const removeElement = ($element) => $element.parentNode.removeChild($element);

const getViewportDimensions = () => ({ width: window.innerWidth, height: window.innerHeight });

export {
  delay,
  debounce,
  getCSSVar,
  setCSSVar,
  emptyElement,
  removeElement,
  getViewportDimensions
}
