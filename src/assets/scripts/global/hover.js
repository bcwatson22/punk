import { setCSSVar } from './utils';

let needAnimFrame = true,
    pos = { x: 0, y: 0 },
    $target;

const calcVars = (e) => {

  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  pos.x = x;
  pos.y = y;

  return pos;

}

const updateVars = () => {

  needAnimFrame = true;

  setCSSVar('x', pos.x, $target);
  setCSSVar('y', pos.y, $target);

  return needAnimFrame;

}

const init = () => {

  let $blocks = document.querySelectorAll('[data-hover]');

  $blocks.forEach($block => {

    $block.onmousemove = (e) => {

      $target = $block;

      calcVars(e);

      if (needAnimFrame) {

        needAnimFrame = false;
        requestAnimationFrame(updateVars);

        return needAnimFrame;

      }

    }

  });

}

export default init;
