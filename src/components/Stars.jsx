import React, { useEffect, useRef } from 'react';

const Stars = () => {
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

    // Star Class
    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1; // 1px to 3px
        this.baseAlpha = Math.random() * 0.3 + 0.1;
        this.alpha = this.baseAlpha;
        this.blinkSpeed = (Math.random() * 0.015) + 0.005; // speed of fade (roughly 1s to 4s)
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.maxAlpha = Math.random() * 0.5 + 0.5; // up to 1
      }

      update() {
        this.alpha += this.blinkSpeed * this.direction;
        if (this.alpha >= this.maxAlpha) {
          this.direction = -1;
          this.alpha = this.maxAlpha;
        } else if (this.alpha <= this.baseAlpha) {
          this.direction = 1;
          this.alpha = this.baseAlpha;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        // Expanding glow effect at peak brightness
        const glowFactor = Math.max(0, this.alpha - 0.6) / 0.4; // 0 to 1 as alpha goes from 0.6 to 1.0
        ctx.shadowBlur = glowFactor * 12; // Blur radius expands slightly
        ctx.shadowColor = `rgba(255, 255, 255, ${glowFactor * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Shooting Star Class
    class ShootingStar {
      constructor() {
        this.reset();
        this.active = false;
        this.timer = Math.random() * 240 + 360; // 6-10 seconds at 60fps (360-600 frames)
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -50;
        this.length = Math.random() * 80 + 40;
        // Diagonal streak
        this.speedX = (Math.random() * 4 + 4) * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = Math.random() * 4 + 4;
        this.opacity = 1;
        this.active = true;
      }

      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) {
            this.reset();
            this.timer = Math.random() * 240 + 360; // Reset timer for next shooting star (6-10s)
          }
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;

        if (this.opacity <= 0 || this.x < -100 || this.x > width + 100 || this.y > height + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 5, this.y - this.speedY * 5); // Trailing effect
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }
    }

    const starsArray = Array.from({ length: 200 }, () => new Star());
    const shootingStar = new ShootingStar();

    const drawBackground = () => {
      // Create radial gradient for base layer
      // #0a0a2e at edges fading to #1a1060 in the center with a soft warm #2d1b4e core glow
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.max(width, height) / 1.5;
      
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      gradient.addColorStop(0, '#2d1b4e');   // Core glow
      gradient.addColorStop(0.3, '#1a1060'); // Inner mid
      gradient.addColorStop(1, '#0a0a2e');   // Edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const render = () => {
      drawBackground();

      starsArray.forEach(star => {
        star.update();
        star.draw();
      });

      shootingStar.update();
      shootingStar.draw();

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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none' // Ensure clicks pass through to content
      }}
    />
  );
};

export default Stars;