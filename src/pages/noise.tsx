import React from 'react';
import Animation, { AnimationFrame } from '../components/Animation';
import { HSLA } from '../utils/hsla';

export default function PageNoise() {
  const hsla = React.useMemo(() => new HSLA(), []);
  const [analyser, setAnalyser] = React.useState<AnalyserNode>();

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      // eslint-disable-next-line no-shadow
      const analyser = context.createAnalyser();
      source.connect(analyser);
      setAnalyser(analyser);
    });
  }, []);

  if (!analyser) {
    return <h1>Loading Analyser</h1>;
  }

  const render = ({ ctx }: AnimationFrame) => {
    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    const bytes = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(bytes);

    const dx = width / bytes.length;

    ctx.fillStyle = hsla.rotate(1, true);
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = hsla.rotate(180, true);
    bytes.forEach((value, i) => {
      const x0 = Math.floor(dx * i);
      const y1 = (-height * value) / 2 ** 8;
      ctx.fillRect(x0, height, Math.ceil(dx), y1);
    });
    ctx.fillStyle = hsla.rotate(-180, true);
  };

  return <Animation>{render}</Animation>;
}
