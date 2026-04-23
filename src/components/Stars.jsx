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

    // Soft radial orbs for gentle depth
    const orbs = [
      { x: Math.random() * width, y: Math.random() * height, r: Math.max(width, height) * 0.4 },
      { x: Math.random() * width, y: Math.random() * height, r: Math.max(width, height) * 0.5 },
      { x: Math.random() * width, y: Math.random() * height, r: Math.max(width, height) * 0.3 }
    ];

    // Star Class
    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
        this.baseAlpha = 0.2;
        this.alpha = Math.random() * 0.8 + 0.2; // initial random alpha between 0.2 and 1.0
        // Duration between 1s and 5s (approx 60 to 300 frames)
        // blinkSpeed controls how much alpha changes per frame
        this.blinkSpeed = (1.0 - 0.2) / ((Math.random() * 240) + 60);
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.maxAlpha = 1.0;
        
        // Randomly assign slight blue tint or pure white
        const colorVal = Math.random() > 0.7 ? '200, 220, 255' : '255, 255, 255';
        this.color = colorVal;
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
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Shooting Star Class
    class ShootingStar {
      constructor() {
        this.reset();
        this.active = false;
        this.timer = Math.random() * 240 + 480; // 8-12 seconds at 60fps (480-720 frames)
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -50;
        this.length = Math.random() * 80 + 40;
        this.speedX = (Math.random() * 5 + 5) * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = Math.random() * 5 + 5;
        this.opacity = 1;
        this.active = true;
        
        // Target fade out over ~0.8s (48 frames)
        this.fadeRate = 1 / 48;
      }

      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) {
            this.reset();
            this.timer = Math.random() * 240 + 480; // Reset timer for next shooting star (8-12s)
          }
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeRate;

        if (this.opacity <= 0 || this.x < -100 || this.x > width + 100 || this.y > height + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 4, this.y - this.speedY * 4); // Trailing effect
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const starsArray = Array.from({ length: 300 }, () => new Star());
    const shootingStar = new ShootingStar();

    const drawBackground = () => {
      // Base deep navy
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, width, height);

      // Subtle radial orbs
      orbs.forEach(orb => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, 'rgba(26, 32, 128, 0.05)'); // #1a2080 at 5% opacity
        gradient.addColorStop(1, 'rgba(26, 32, 128, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
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
        pointerEvents: 'none'
      }}
    />
  );
};

export default Stars;