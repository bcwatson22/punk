import { tns } from 'tiny-slider/src/tiny-slider';

const init = () => {

  const $slider = document.querySelector('[data-slider]');

  if (!$slider) return false;

  const slider = tns({
    container: $slider,
    autoplay: true,
    lazyload: true,
    lazyloadSelector: '[data-lazy]',
    mouseDrag: true,
    controlsPosition: 'bottom',
    rewind: true,
    navPosition: 'bottom',
    autoplayButtonOutput: false
  });

  return slider;

}

export default init;
