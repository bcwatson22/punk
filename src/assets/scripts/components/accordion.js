import { debounce, delay, setCSSVar, emptyElement, getViewportDimensions } from './../global/utils';
import initHover from './../global/hover';

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

  const $summary = $accordion.querySelector('summary');

  $summary.addEventListener('click', (e) => {

    e.preventDefault();

    animateAccordion($accordion);

  }, false);

  return $summary;

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

const injectHTML = ($wrapper, markup) => $wrapper.insertAdjacentHTML('beforeend', markup);

const buildAccordionMarkup = (data) => {

  return new Promise(resolve => {

    const markup = data.map(beer => {

      const { name, description, tagline, first_brewed, abv } = beer;

      return `
        <details class="accordion__wrapper" aria-expanded="false" data-accordion>
          <summary class="accordion__summary" data-hover><span>${name}</span></summary>
          <div class="accordion__content">
            <p>${description}</p>
            <table>
              <tbody>
                <tr>
                  <th>Tagline</th>
                  <td>${tagline}</td>
                </tr>
                <tr>
                  <th>First brewed</th>
                  <td>${first_brewed}</td>
                </tr>
                <tr>
                  <th>Strength</th>
                  <td>${abv}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      `;

    }).join('');

    resolve(markup);

  });

}

const handleSuccess = (data, $wrapper, $title, loadingClass) => {

  buildAccordionMarkup(data).then(markup => {

    injectHTML($wrapper, markup);
    initHover();

  });

  return $wrapper;

}

const handleError = (response, $wrapper) => {

  const status = response.statusText;
  const markup = `<p>Oops. Something went wrong, please try again!</p>`;

  injectHTML($wrapper, markup);

  throw new Error(status);

  return status;

}

const fetchContent = () => {

  return new Promise(resolve => {

    const $title = document.querySelector('[data-accordion-title]');
    const $wrapper = document.querySelector('[data-accordion-wrapper]');

    if (!$title || !$wrapper) return false;

    const loadingClass = 'accordion__title--loading';

    fetch('https://api.punkapi.com/v2/beers?per_page=5')
        .then(response => {

          emptyElement($wrapper);
          $title.classList.remove(loadingClass);

          if (!response.ok) reject(handleError(response, $wrapper));

          resolve(response.json().then(data => handleSuccess(data, $wrapper)));

        });

  });

}

const init = () => {

  fetchContent().then(() => {

    initAccordion();
    bindResize();

  });

}

export default init;
