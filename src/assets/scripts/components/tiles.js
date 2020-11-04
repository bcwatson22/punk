import * as Vibrant from 'node-vibrant';
import { setCSSVar, emptyElement } from './../global/utils';

const initFilters = () => {

  const $form = document.querySelector('[data-tiles-form]');
  const $filter = $form.querySelector('select');

  $form.addEventListener('submit', (e) => e.preventDefault(), false);

  $form.addEventListener('change', (e) => {

    console.log(e.target.value);

  }, false);

  return $form;

}

const getColours = () => {

  const dataAttr = 'data-tiles-image';
  const $tiles = document.querySelectorAll(`[${dataAttr}]`);

  $tiles.forEach($tile => {

    const url = $tile.getAttribute(dataAttr);

    Vibrant
      .from(url)
      .getPalette()
      .then(palette => setCSSVar('colour', palette.Vibrant.hex, $tile));

  });

  return $tiles;

}

const injectHTML = ($wrapper, markup) => $wrapper.insertAdjacentHTML('beforeend', markup);

const buildTileMarkup = (data) => {

  return new Promise(resolve => {

    const markup = data.map(beer => {

      const { name, abv, image_url, description } = beer;

      return `
        <div class="tiles__tile" data-tiles-image="${image_url}">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 35 100" xml:space="preserve"><style>.label{fill:#fff}.st4{fill:#2f2c3d}</style><path id="XMLID_92_" d="M28.3 37.7c-2.9-5-5.4-28.5-5.4-28.5H11.1S8.6 32.7 5.7 37.7c-2.9 5-3.9 9.6-3.7 17.6.1 6.1.6 29.3.8 38.9.1 2.3 2 4.2 4.3 4.2h19.6c2.3 0 4.3-1.9 4.3-4.2.2-9.6.7-32.8.8-38.9.3-8-.7-12.7-3.5-17.6" fill="#f78f2d"/><path id="XMLID_91_" d="M18.9 9.2H11.1S8.6 32.7 5.7 37.7c-2.9 5-3.9 9.6-3.7 17.6.1 6.1.6 29.3.8 38.9.1 2.3 2 4.2 4.3 4.2H22.8c2.3 0 4.3-1.9 4.3-4.2.2-9.6.7-32.8.8-38.9.2-8-.8-12.6-3.7-17.6-2.7-5-5.3-28.5-5.3-28.5" fill="#fdbb41"/><path id="XMLID_90_" d="M2 55.3c.1 3.5.3 12.7.5 21.6h29c.2-9 .4-18.1.5-21.6 0-2.1 0-4-.1-5.7H2.1C2 51.3 2 53.2 2 55.3" fill="#a78b6b"/><path class="label" id="XMLID_89_" d="M2 55.3v1.8c.1 4.3.3 12.1.4 19.8h25.1c.2-9 .4-18.1.5-21.6 0-2.1 0-4-.1-5.7H2.1c-.1 1.6-.2 3.2-.1 5.1v.6z" /><path id="XMLID_200_" class="st4" d="M26.7 100H7.2c-3.2 0-5.8-2.6-5.9-5.7l-.8-39c-.2-8.1.9-13.1 3.9-18.4C6.6 33 8.9 15.4 9.6 9c.1-.8.7-1.4 1.5-1.4h11.7c.8 0 1.4.6 1.5 1.4.7 6.5 3 24 5.2 27.9 3 5.2 4.1 10.2 3.9 18.4l-.8 38.9c0 3.2-2.7 5.8-5.9 5.8M12.5 10.7c-.7 5.5-2.9 23.2-5.5 27.7-2.8 4.8-3.6 9.2-3.5 16.8l.8 38.9c0 1.5 1.3 2.7 2.8 2.7h19.6c1.5 0 2.8-1.2 2.8-2.7l.8-38.9c.2-7.6-.7-12-3.5-16.8-2.6-4.6-4.8-22.3-5.5-27.7h-8.8z"/><path id="XMLID_86_" d="M21.3 1.7h-8.6C10.6 1.7 9 3.4 9 5.4v3.7h16V5.5c0-2.1-1.6-3.8-3.7-3.8" fill="#fffbed"/><path id="XMLID_85_" d="M21 1.7h-5.7c2.1 0 3.7 1.7 3.7 3.7v3.7h5.7V5.5c.1-2.1-1.6-3.8-3.7-3.8" fill="#c7a36c"/><path id="XMLID_195_" class="st4" d="M25 10.7H8.9c-.8 0-1.5-.7-1.5-1.5V5.5C7.4 2.6 9.8.2 12.7.2h8.6c2.9 0 5.3 2.4 5.3 5.3v3.7c-.1.8-.7 1.5-1.6 1.5M10.4 7.6h13V5.5c0-1.2-1-2.2-2.2-2.2h-8.6c-1.2 0-2.2 1-2.2 2.2v2.1z"/><path id="XMLID_82_" class="st4" d="M23.1 12.9H10.8c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8h12.4c.4 0 .8.3.8.8-.1.5-.4.8-.9.8"/></svg>
          <h3>${name}</h3>
          <p>${abv}%</p>
        </div>
      `;

    }).join('');

    resolve(markup);

  });

}

const handleSuccess = (data, $wrapper, $title, loadingClass) => {

  const shuffled = data.sort(() => 0.5 - Math.random());
  const trimmed = shuffled.slice(0, 12);

  buildTileMarkup(trimmed).then(markup => injectHTML($wrapper, markup));

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

    const $title = document.querySelector('[data-tiles-title]');
    const $wrapper = document.querySelector('[data-tiles-wrapper]');

    if (!$title || !$wrapper) return false;

    const loadingClass = 'tiles__title--loading';

    fetch('https://api.punkapi.com/v2/beers')
        .then(response => {

          emptyElement($wrapper);
          $title.classList.remove(loadingClass);

          if (!response.ok) handleError(response, $wrapper);

          resolve(response.json().then(data => handleSuccess(data, $wrapper)));

        });

  });

}

const init = () => {

  fetchContent().then(() => {

    getColours();
    initFilters();

  });

}

export default init;
