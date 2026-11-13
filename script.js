/**
 * Manas Hanwat — Personal Portfolio Website (V6.1)
 * Organic Interactive Particle System, Theme Persistence, Clock & Easter Egg Telemetry
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
  // 2. MOBILE NAVIGATION & LIVE CLOCK
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
            <p><strong>REPOSITORY:</strong> <a href="https://github.com/Diopurp/Columbus-Maximus" target="_blank" rel="noopener noreferrer" style="color:var(--blue);text-decoration:underline;">github.com/Diopurp/Columbus-Maximus ↗</a></p>
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
    if (e.key === 'Escape') {
      document.getElementById('telemetry-hud')?.classList.remove('active');
    }

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

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer = (typedBuffer + e.key.toLowerCase()).slice(-8);
      if (typedBuffer === 'columbus') {
        openTelemetryHUD();
        typedBuffer = '';
      }
    }
  });

  // -------------------------------------------------------------
  // 5. ORGANIC FLUID PARTICLE SYSTEM (REFINED V6.1)
  // Natural distribution, fluid cursor response & high Day Mode contrast
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

  const mouse = {
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    isDown: false,
    isActive: false,
    lastActiveTime: 0
  };

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Balanced particle count: 35 on mobile up to 75 on desktop for optimal clarity
    const count = Math.min(80, Math.max(34, Math.floor((width * height) / 18000)));

    particles = Array.from({ length: count }, (_, i) => ({
      i,
      x: Math.random() * width,
      y: Math.random() * height,
      ox: Math.random() * width,
      oy: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      baseRadius: 1.1 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.0014 + Math.random() * 0.002,
      // Designate roughly 1/3 for deep bioluminescent pulsing in dark waters
      isBio: i % 3 === 0,
      // Unique drift frequency for organic natural floating
      driftFreqX: 0.0003 + Math.random() * 0.0004,
      driftFreqY: 0.0003 + Math.random() * 0.0004
    }));
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse & Touch Interaction Listeners
  window.addEventListener('pointermove', (e) => {
    if (mouse.x > -9000) {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
    }
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
    mouse.lastActiveTime = performance.now();
  });

  window.addEventListener('pointerdown', (e) => {
    if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select')) {
      return;
    }
    mouse.isDown = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
    mouse.lastActiveTime = performance.now();
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => {
    window.addEventListener(ev, () => {
      mouse.isDown = false;
    });
  });

  // Calculate ocean waterline in current viewport coordinates
  function getWaterlineScreenY() {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const rect = projectsEl.getBoundingClientRect();
      return rect.top + 20;
    }
    return 740 - window.scrollY;
  }

  // Animation render loop
  function render(time) {
    ctx.clearRect(0, 0, width, height);

    const isDark = root.dataset.theme === 'dark';
    const waterlineY = getWaterlineScreenY();
    const scrollDepth = window.scrollY;

    // Decay mouse velocity
    mouse.vx *= 0.88;
    mouse.vy *= 0.88;

    // Deactivate mouse influence if idle for more than 2 seconds
    if (time - mouse.lastActiveTime > 2000) {
      mouse.isActive = false;
    }

    const mouseDistRadius = mouse.isDown ? 260 : 140;

    for (let idx = 0; idx < particles.length; idx++) {
      const p = particles[idx];

      // 1. ORGANIC BASE DRIFT (Harmonic multi-frequency wandering)
      const driftX = Math.sin(time * p.driftFreqX + p.phase) * 0.022;
      const driftY = Math.cos(time * p.driftFreqY + p.phase) * 0.022;

      // Soft anchor attraction to prevent clustering in corners
      const anchorPullX = (p.ox - p.x) * 0.00035;
      const anchorPullY = (p.oy - p.y) * 0.00035;

      p.vx += driftX + anchorPullX;
      p.vy += driftY + anchorPullY;

      // 2. FLUID MOUSE & TOUCH INTERACTION
      if (mouse.isActive) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseDistRadius && dist > 1) {
          const normDist = dist / mouseDistRadius;
          const force = (1 - normDist);

          if (mouse.isDown) {
            // DRAG / CLICK INTERACTION:
            // Particles are smoothly drawn into a graceful swirling vortex around pointer
            const angle = Math.atan2(dy, dx);
            const tangentX = -Math.sin(angle);
            const tangentY = Math.cos(angle);

            // Inward spring attraction + gentle swirling vortex
            p.vx += (dx * 0.045 + tangentX * 1.8) * force;
            p.vy += (dy * 0.045 + tangentY * 1.8) * force;
          } else {
            // HOVER / MOVE INTERACTION:
            // Fluid displacement: cursor pushes gently through particles like water/smoke
            const repelStrength = 0.85 * force;
            p.vx -= (dx / dist) * repelStrength;
            p.vy -= (dy / dist) * repelStrength;

            // Carry particles slightly along cursor velocity vector (fluid wake)
            p.vx += mouse.vx * 0.04 * force;
            p.vy += mouse.vy * 0.04 * force;
          }
        }
      }

      // Physics damping & position integration
      p.vx *= 0.93;
      p.vy *= 0.93;
      p.x += p.vx;
      p.y += p.vy;

      // Smooth wrap-around screen boundaries
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;

      // 3. THEME-DEPENDENT COLORS & HIGH CONTRAST IN DAY MODE
      let colorRGB;
      let alpha;
      let blurRadius = mouse.isDown ? 12 : 7;
      let particleRadius = p.baseRadius;

      if (!isDark) {
        // DAY MODE:
        // High visibility against the warm ivory Japanese landscape!
        // Warm sunlit amber / golden bronze / rich autumn embers
        colorRGB = p.i % 2 === 0 ? '168, 114, 38' : '142, 96, 32';

        // Organic periodic glowing pulsation
        const pulse = 0.5 + 0.45 * Math.sin(time * p.pulseSpeed + p.phase);
        alpha = 0.45 + 0.45 * pulse; // Stays clearly visible at all times!

        if (mouse.isDown) {
          particleRadius *= 1.35;
          blurRadius = 14;
        }
      } else {
        // NIGHT MODE:
        // Above waterline: warm volcanic fire embers
        // Below waterline: glacial cyan / electric blue
        // Deep water: periodically flaring bioluminescent deep-sea organisms
        const isAboveWater = p.y < waterlineY;

        if (isAboveWater) {
          colorRGB = p.i % 2 === 0 ? '255, 88, 44' : '255, 172, 54';
          const flicker = 0.4 + 0.45 * (0.5 + 0.5 * Math.sin(time * (p.pulseSpeed * 1.6) + p.phase));
          alpha = flicker;
        } else {
          const inDeepDarkWater = p.y > waterlineY + 200 || scrollDepth > 800;

          if (p.isBio && inDeepDarkWater) {
            // Periodic slow breathing deep-sea flare
            const pulse = Math.pow(Math.max(0, Math.sin(time * p.pulseSpeed + p.phase)), 3.2);
            colorRGB = '92, 238, 255'; // Vibrant bioluminescent cyan
            alpha = 0.25 + 0.75 * pulse;
            blurRadius = mouse.isDown ? 18 : 8 + 12 * pulse;
          } else {
            colorRGB = '68, 212, 248'; // Glacial cyan
            const glow = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.phase));
            alpha = glow;
          }
        }

        if (mouse.isDown) {
          particleRadius *= 1.4;
        }
      }

      // Draw particle with luminous halo
      ctx.beginPath();
      ctx.fillStyle = `rgba(${colorRGB}, ${alpha})`;
      ctx.shadowColor = `rgba(${colorRGB}, ${Math.min(1, alpha + 0.25)})`;
      ctx.shadowBlur = blurRadius;
      ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
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
