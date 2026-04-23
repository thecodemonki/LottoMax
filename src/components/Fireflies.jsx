import { useEffect, useRef } from 'react';

export default function Fireflies() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Firefly {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = (Math.random() * 0.5) + 0.1;
      }
      update() {
        this.x += Math.cos(this.ang) * this.v;
        this.y += Math.sin(this.ang) * this.v;
        this.ang += (Math.random() - 0.5) * 0.1;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        ctx.fillStyle = '#f1c40f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f39c12';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const fireflies = Array.from({ length: 40 }, () => new Firefly());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach(f => {
        f.update();
        f.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 60 }} 
    />
  );
}
