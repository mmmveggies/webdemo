import React, { CanvasHTMLAttributes } from 'react';

export interface AnimationFrame {
  ctx: CanvasRenderingContext2D;
  time: DOMHighResTimeStamp;
}

export interface AnimationProps
  extends CanvasHTMLAttributes<HTMLCanvasElement> {
  paused?: boolean;
  children: (frameinfo: AnimationFrame) => void;
}

export default function Animation({
  paused,
  children,
  ...props
}: AnimationProps) {
  const container = React.useRef<HTMLDivElement | null>(null);
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  // controls looping
  React.useLayoutEffect(() => {
    const ctx = canvas.current && canvas.current.getContext('2d');
    if (paused || !ctx) {
      return;
    }
    let finished = false;
    requestAnimationFrame(function frame(time) {
      if (!finished) {
        children({ ctx, time });
        requestAnimationFrame(frame);
      }
    });
    return () => {
      finished = true;
    };
  }, [children, paused]);

  // automatic resize
  React.useLayoutEffect(() => {
    function resize() {
      if (canvas.current && container.current) {
        canvas.current.width = container.current.clientWidth;
        canvas.current.height = container.current.clientHeight;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={container} style={{ width: '100%', height: '100%' }}>
      <canvas {...props} ref={canvas}>
        HTML Canvas <a href='https://caniuse.com/canvas'>not supported</a> :(
      </canvas>
    </div>
  );
}
