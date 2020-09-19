import React from 'react';
import Animation, { AnimationFrame } from '../components/Animation';
import { HSLA } from '../utils/hsla';

export default function PageYayColors() {
  const color = React.useRef(new HSLA());

  function render({ ctx }: AnimationFrame) {
    const hsla = color.current;
    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    ctx.fillStyle = hsla.rotate(1, true);
    ctx.fillRect(0, 0, width, height);

    ctx.font = "10em Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = hsla.rotate(180);
    ctx.fillText('Hello World', width / 2, height / 2);
  }

  return <Animation>{render}</Animation>;
}
