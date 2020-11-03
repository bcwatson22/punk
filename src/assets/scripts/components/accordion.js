const bindAccordion = ($accordion) => {

  $accordion.addEventListener('click', (e) => {

    e.preventDefault();

    console.log(e);

  }, false);

}

const initAccordion = () => {

  const $accordions = document.querySelectorAll('[data-accordion]');

  $accordions.forEach($accordion => bindAccordion($accordion));

  return $accordions;

}

const init = () => {

  initAccordion();

}

export default init;
