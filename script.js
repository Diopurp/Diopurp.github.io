/**
 * Manas Hanwat — Personal Portfolio Website
 * Interactive Background Particles, Fibonacci Spiral, Theme Management, Easter Eggs
 */

(() => {
  'use strict';

  // -------------------------------------------------------------
  // 1. THEME SWITCHING & PERSISTENCE
  // -------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme');
  const savedTheme = localStorage.getItem('manas-theme');

  if (savedTheme) {
    root.dataset.theme = savedTheme;
  } else {
    // Default to day mode (Japanese minimalism)
    root.dataset.theme = 'light';
  }

  function updateThemeUI() {
    const isDark = root.dataset.theme === 'dark';
    if (themeBtn) {
      themeBtn.textContent = isDark ? '☀' : '☾';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to Day mode (Japanese minimalism)' : 'Switch to Night mode (Volcano & Iceberg)');
      themeBtn.title = isDark ? 'Day mode (Japanese minimalism)' : 'Night mode (Volcano & Iceberg)';
    }
  }
  updateThemeUI();

  themeBtn?.addEventListener('click', () => {
    const newTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = newTheme;
    localStorage.setItem('manas-theme', newTheme);
    updateThemeUI();
    showToast(newTheme === 'dark' ? 'Night Mode — Volcano & Submerged Iceberg' : 'Day Mode — Japanese Minimalism');
  });

  // -------------------------------------------------------------
  // 2. MOBILE NAVIGATION & TIME TICKER
  // -------------------------------------------------------------
  const menuBtn = document.getElementById('menu');
  const nav = document.getElementById('nav');

  menuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
    });
  });

  // Live IST Clock (Mumbai, India)
  const clock = document.getElementById('clock');
  function updateClock() {
    if (!clock) return;
    try {
      clock.textContent = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date()) + ' IST';
    } catch {
      const d = new Date();
      clock.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} IST`;
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Dynamic copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------
  // 3. TOAST NOTIFICATION UTILITY
  // -------------------------------------------------------------
  let toastTimer;
  function showToast(message, duration = 2800) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // -------------------------------------------------------------
  // 4. EASTER EGG: HIDDEN KEYBOARD SEQUENCES
  // -------------------------------------------------------------
  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let keyHistory = [];
  let typedBuffer = '';

  function openTelemetryHUD() {
    let hud = document.getElementById('telemetry-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'telemetry-hud';
      hud.innerHTML = `
        <div class="hud-box">
          <div class="hud-header">
            <span>● COLUMBUS MAXIMUS // TELEMETRY LINK</span>
            <button class="hud-close" aria-label="Close telemetry">✕</button>
          </div>
          <div class="hud-content">
            <p><strong>SYSTEM KINEMATICS:</strong> Differential-Drive ESP32 [ONLINE @ 50Hz]</p>
            <p><strong>RANGE SENSING:</strong> LDS-02 2D LiDAR [STREAMING /scan]</p>
            <p><strong>LOCALIZATION:</strong> DWM3001C UWB [4 ANCHORS TRACKED] · EKF FUSION [ACTIVE]</p>
            <p><strong>NAV STACK:</strong> ROS 2 Nav2 Costmaps [SYNCHRONIZED]</p>
            <div class="hud-quote">"Build with intent. Stay curious." — Manas Hanwat</div>
          </div>
          <div class="hud-footer">Press ESC or click close to dismiss.</div>
        </div>
      `;
      document.body.appendChild(hud);
      hud.querySelector('.hud-close')?.addEventListener('click', () => hud.classList.remove('active'));
      hud.addEventListener('click', (e) => {
        if (e.target === hud) hud.classList.remove('active');
      });
    }
    hud.classList.add('active');
    showToast('TELEMETRY UNLOCKED — Columbus Maximus diagnostics active.');
  }

  window.addEventListener('keydown', (e) => {
    // Dismiss HUD on Escape
    if (e.key === 'Escape') {
      document.getElementById('telemetry-hud')?.classList.remove('active');
    }

    // Konami sequence tracking
    keyHistory.push(e.key);
    if (keyHistory.length > konami.length) {
      keyHistory.shift();
    }
    if (keyHistory.length === konami.length &&
        konami.every((k, i) => k.toLowerCase() === String(keyHistory[i]).toLowerCase())) {
      openTelemetryHUD();
      keyHistory = [];
      return;
    }

    // Keyword "columbus" tracking
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer = (typedBuffer + e.key.toLowerCase()).slice(-8);
      if (typedBuffer === 'columbus') {
        openTelemetryHUD();
        typedBuffer = '';
      }
    }
  });

  // -------------------------------------------------------------
  // 5. INTERACTIVE PARTICLE SYSTEM & FIBONACCI SPIRAL
  // -------------------------------------------------------------
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let isDragging = false;
  const mouse = { x: 0, y: 0 };

  // Golden angle: 137.507764 degrees in radians
  const GOLDEN_ANGLE = 137.507764 * (Math.PI / 180);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Responsive particle count (40 on small screens, up to 90 on large desktops)
    const count = Math.min(95, Math.max(38, Math.floor((width * height) / 15000)));

    particles = Array.from({ length: count }, (_, i) => ({
      i,
      x: Math.random() * width,
      y: Math.random() * height,
      ox: Math.random() * width,
      oy: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      baseRadius: 0.9 + Math.random() * 1.3,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.0012 + Math.random() * 0.0018,
      // Designate roughly 1/3 of particles for deep bioluminescence in the abyss
      isBio: i % 3 === 0
    }));
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Pointer interactions on window so dragging anywhere works without blocking buttons/links
  window.addEventListener('pointerdown', (e) => {
    // Check if user clicked an interactive control
    if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select')) {
      return;
    }
    isDragging = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => {
    window.addEventListener(ev, () => {
      isDragging = false;
    });
  });

  // Calculate the ocean waterline in current viewport coordinates
  function getWaterlineScreenY() {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const rect = projectsEl.getBoundingClientRect();
      return rect.top + 30; // Waterline sits just above the project section
    }
    return 740 - window.scrollY;
  }

  // Animation render loop
  function render(time) {
    ctx.clearRect(0, 0, width, height);

    const isDark = root.dataset.theme === 'dark';
    const waterlineY = getWaterlineScreenY();
    const scrollDepth = window.scrollY;

    for (let idx = 0; idx < particles.length; idx++) {
      const p = particles[idx];

      if (isDragging) {
        // FIBONACCI GOLDEN ANGLE SPIRAL ARRANGEMENT
        // θ = n * 137.5°
        // Radius scales with sqrt(n) for uniform phyllotaxis density
        const theta = p.i * GOLDEN_ANGLE + time * 0.00035;
        const radius = 8 + Math.sqrt(p.i) * 11.5;

        const targetX = mouse.x + Math.cos(theta) * radius;
        const targetY = mouse.y + Math.sin(theta) * radius;

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.hypot(dx, dy);

        // Spring attraction toward golden angle spiral point
        const pull = Math.max(0.018, 1 - dist / 500);
        p.vx += dx * (0.02 + pull * 0.035);
        p.vy += dy * (0.02 + pull * 0.035);
      } else {
        // ORGANIC GENTLE DRIFT & HARMONIC OSCILLATION
        const homeDx = p.ox - p.x;
        const homeDy = p.oy - p.y;

        p.vx += homeDx * 0.0005 + Math.sin(time * 0.0004 + p.phase) * 0.012;
        p.vy += homeDy * 0.0005 + Math.cos(time * 0.0003 + p.phase) * 0.012;
      }

      // Physics damping & position integration
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx;
      p.y += p.vy;

      // Screen boundary wrap-around
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;

      // THEME-DEPENDENT PARTICLE BEHAVIOUR & COLORS
      let colorRGB;
      let alpha;
      let blurRadius = isDragging ? 12 : 6;

      if (!isDark) {
        // DAY MODE: Soft golden-green firefly particles
        colorRGB = '138, 168, 98'; // Sage green / soft gold
        // Periodic gentle glow
        const glow = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.phase));
        alpha = glow;
      } else {
        // NIGHT MODE:
        // Above ocean waterline: glowing red / orange volcanic embers
        // Below ocean waterline: electric cyan / glacial blue
        // In the dark water around the thinning glacier: random periodically glowing bioluminescent particles
        const isAboveWater = p.y < waterlineY;

        if (isAboveWater) {
          // Volcanic embers
          colorRGB = p.i % 2 === 0 ? '255, 88, 48' : '255, 172, 58';
          const flicker = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(time * (p.pulseSpeed * 1.5) + p.phase));
          alpha = flicker;
        } else {
          // Underwater glacial / abyssal region
          const inDeepDarkWater = p.y > waterlineY + 200 || scrollDepth > 800;

          if (p.isBio && inDeepDarkWater) {
            // PERIODICALLY GLOWING BIOLUMINESCENT PARTICLES IN DARK WATER
            // Uses a steep power sine for a dramatic, slow breathing pulse
            const pulse = Math.pow(Math.max(0, Math.sin(time * p.pulseSpeed + p.phase)), 3.5);
            colorRGB = '95, 238, 255'; // Vibrant bioluminescent cyan
            alpha = 0.2 + 0.8 * pulse;
            blurRadius = isDragging ? 16 : 8 + 10 * pulse;
          } else {
            // Ambient glacial particles
            colorRGB = '74, 208, 246'; // Cool glacial cyan
            const glow = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.phase));
            alpha = glow;
          }
        }
      }

      // Draw particle with soft halo
      ctx.beginPath();
      ctx.fillStyle = `rgba(${colorRGB}, ${alpha})`;
      ctx.shadowColor = `rgba(${colorRGB}, ${Math.min(1, alpha + 0.2)})`;
      ctx.shadowBlur = blurRadius;
      ctx.arc(p.x, p.y, p.baseRadius * (isDragging ? 1.35 : 1), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!prefersReducedMotion) {
      requestAnimationFrame(render);
    }
  }

  if (prefersReducedMotion) {
    render(0);
  } else {
    requestAnimationFrame(render);
  }
})();
