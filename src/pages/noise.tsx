import React from 'react';
import Animation, { AnimationFrame } from '../components/Animation';
import { HSLA } from '../utils/hsla';

export default function PageNoise() {
  const color = React.useRef(new HSLA());
  const anode = React.useRef<AnalyserNode>();

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);

      const analyser = context.createAnalyser();
      // analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      anode.current = analyser;
      source.connect(analyser);
    });
  }, []);

  function render({ ctx }: AnimationFrame) {
    const hsla = color.current;
    const analyser = anode.current;
    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    if (!analyser) {
      return;
    }

    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    const dx = width / array.length;

    ctx.fillStyle = hsla.rotate(1, true);
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = hsla.rotate(180, true);
    array.forEach((value, i) => {
      const x0 = Math.floor(dx * i);
      const y1 = (-height * value) / 2 ** 8;
      ctx.fillRect(x0, height, Math.ceil(dx), y1);
    });
    ctx.fillStyle = hsla.rotate(-180, true);
  }

  return <Animation>{render}</Animation>;
}
