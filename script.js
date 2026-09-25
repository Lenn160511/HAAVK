document.addEventListener('DOMContentLoaded', () => {

  // --- Live-ish HUD UID stamp (mirrors the "WW UID:...._YYYYMMDDHHmm" style) ---
  const hudId = document.getElementById('hudId');
  if (hudId) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
    const uid = Math.floor(1e15 + Math.random() * 9e15);
    hudId.textContent = `WW UID:${uid}_${stamp}`;
  }

  // --- Points counter animation (0 -> 40) ---
  const pointsValue = document.getElementById('pointsValue');
  if (pointsValue) {
    const target = 40;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      pointsValue.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --- Nav active state ---
  const navLinks = document.querySelectorAll('[data-nav]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  // --- Hero dot carousel: swaps the tagline copy ---
  const dots = document.querySelectorAll('.dot');
  const tagline = document.getElementById('tagline');
  const taglines = [
    'Perfektioniere die Mittel. Bestimme den Zweck.',
    'Effizienz ist keine Option. Sie ist der Standard.',
    'Kein Zufall. Nur Berechnung.'
  ];

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dots.forEach((d) => d.classList.remove('is-active'));
      dot.classList.add('is-active');
      const index = Number(dot.dataset.index) || 0;
      if (tagline) {
        tagline.style.opacity = 0;
        setTimeout(() => {
          tagline.textContent = taglines[index] || taglines[0];
          tagline.style.opacity = 1;
        }, 150);
      }
    });
  });

  if (tagline) {
    tagline.style.transition = 'opacity 0.15s ease';
  }
});
