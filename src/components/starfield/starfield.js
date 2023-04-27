import React, {useEffect, useState} from 'react';

const numStars = 200;
const stars = [];

class Star {
  canvas;
  ctx;
  x;
  y;
  size;
  speed;
  constructor(ctx) {
    this.canvas = ctx.canvas;
    this.ctx = ctx;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 2 + 0.1;
  }

  update() {
    this.y += this.speed;
    if (this.y > this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export const StarField = () => {
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star(ctx));
    }
    animate(ctx);
  });

  const animate = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const star of stars) {
      star.update();
      star.draw();
    }

    requestAnimationFrame(animate.bind(this, ctx));
  }

  return (
      <div>
        <canvas id="starfield"></canvas>
      </div>
  )
}
