/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — HERO PARTICLE ANIMATION
   particles.js — floating golden particles on hero canvas
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = -1000;
  let mouseY = -1000;

  const resize = () => {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.targetOpacity = this.opacity;
      this.hue = Math.random() * 30 + 35; // Gold range
      this.lightness = Math.random() * 20 + 60;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
        this.targetOpacity = 0.8;
      } else {
        this.targetOpacity = this.opacity;
      }

      // Smooth opacity transition
      this.opacity += (this.targetOpacity - this.opacity) * 0.05;

      // Wrap around edges
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, ${this.lightness}%, ${this.opacity})`;
      ctx.fill();
    }
  }

  const init = () => {
    resize();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  };

  const drawConnections = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 168, 83, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  };

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  window.addEventListener('resize', () => {
    resize();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    while (particles.length < count) particles.push(new Particle());
    while (particles.length > count) particles.pop();
  });

  init();
  animate();

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
});
