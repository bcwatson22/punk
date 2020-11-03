import { debounce, delay, setCSSVar, getViewportDimensions } from './../global/utils';

const openClass = 'accordion__wrapper--open';

let clicksBound = 0;
let viewport = {
  width: 0,
  height: 0
};

const isAccordionOpen = ($accordion) => $accordion.classList.contains(openClass) || $accordion.getAttribute('open');

const toggleAriaAttribute = ($accordion) => {

  const isOpen = isAccordionOpen($accordion);
  const attrVal = isOpen ? true : false;

  $accordion.setAttribute('aria-expanded', attrVal);

  return isOpen;

}

const toggleOpenAttribute = ($accordion) => {

  const isOpen = isAccordionOpen($accordion);
  const attrName = 'open';

  console.log(isOpen)

  isOpen
    ? $accordion.removeAttribute(attrName)
    : $accordion.setAttribute(attrName, 'open');

  return isOpen;

}

const setAccordionHeight = ($accordion) => {

  const varName = 'max-height';
  const isOpen = isAccordionOpen($accordion);

  setCSSVar(varName, 0, $accordion);
  if (!isOpen) toggleOpenAttribute($accordion);

  const height = $accordion.scrollHeight;

  setCSSVar(varName, height, $accordion);
  if (!isOpen) toggleOpenAttribute($accordion);

  return height;

}

const animateAccordion = ($accordion) => {

  const isOpen = isAccordionOpen($accordion);

  const toggleAttributes = () => {

    toggleOpenAttribute($accordion);
    toggleAriaAttribute($accordion);

  }

  if (isOpen) {

    $accordion.classList.toggle(openClass)

    delay(350).then(() => toggleAttributes());

  } else {

    toggleAttributes()

    delay(10).then(() => $accordion.classList.toggle(openClass));

  }

  return isOpen;

}

const bindAccordion = ($accordion) => {

  clicksBound++;

  $accordion.addEventListener('click', (e) => {

    e.preventDefault();

    animateAccordion($accordion);

  }, false);

}

const initAccordion = () => {

  viewport = getViewportDimensions();

  const $accordions = document.querySelectorAll('[data-accordion]');

  $accordions.forEach($accordion => {

    setAccordionHeight($accordion);

    if (clicksBound >= $accordions.length) return false;

    bindAccordion($accordion);

  });

  return $accordions;

}

const bindResize = () => {

  const reset = debounce((e) => (window.innerWidth !== viewport.width) && initAccordion(), 100);

  window.addEventListener('resize', reset, false);
  window.addEventListener('orientationchange', reset, false);

  return reset;

}

const init = () => {

  bindResize();
  initAccordion();

}

export default init;
