document.addEventListener('DOMContentLoaded', () => {
  const hudId = document.getElementById('hudId');
  if (hudId) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
    hudId.textContent = `WW UID:${Math.floor(1e15 + Math.random() * 9e15)}_${stamp}`;
  }

  const pointsValue = document.getElementById('pointsValue');
  if (pointsValue) {
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 900, 1);
      pointsValue.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * 40);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const slides = [
    {
      title: 'ZUKUNFT, EFFIZIENT.',
      tagline: 'Perfektioniere die Mittel. Bestimme den Zweck.',
      signature: {
        name: 'L. Schmuck',
        path: 'M18 72 C28 42 42 27 55 40 C68 53 43 89 31 72 C21 59 43 36 63 55 C82 74 91 84 105 65 C116 50 119 32 128 40 C139 50 119 83 137 82 C153 81 160 45 174 47 C190 50 180 85 199 80 C217 75 2[...]'
      }
    },
    {
      title: 'MENSCHEN, ENTSCHEIDEND.',
      tagline: 'Vertraue dem Team. Stärke den gemeinsamen Weg.',
      signature: {
        name: 'J. Trimborn',
        path: 'M10 85 Q20 45 40 50 Q55 52 60 75 Q62 90 45 92 Q30 93 25 80 Q22 70 35 65 Q50 58 70 75 Q85 88 105 70 Q120 55 128 45 Q140 32 150 50 Q160 65 145 90 Q135 100 120 95 Q105 88 110 75 Q115 6[...]'
      }
    },
    {
      title: 'IDEEN, WIRKSAM.',
      tagline: 'Denke weiter. Mache aus Impulsen Fortschritt.',
      signature: {
        name: 'L. Holtmann',
        path: 'M12 88 Q25 50 45 55 Q62 58 68 80 Q70 95 50 98 Q32 99 28 82 Q25 70 40 62 Q58 52 75 78 Q92 100 115 75 Q130 60 140 48 Q152 35 162 52 Q172 68 158 95 Q148 108 130 102 Q112 95 118 80 Q125[...]'
      }
    }
  ];

  const headline = document.getElementById('headline');
  const tagline = document.getElementById('tagline');
  const signature = document.querySelector('.signature');
  const dots = document.querySelectorAll('.dot');
  const principles = document.querySelectorAll('.principle');
  let currentIndex = 0;

  const renderSignature = slide => {
    if (!signature) return;
    signature.setAttribute('aria-label', `Unterschrift ${slide.signature.name}`);
    signature.classList.add('is-swiping');
    
    setTimeout(() => {
      signature.innerHTML = `
        <path d="${slide.signature.path}" fill="none" stroke="#2e6ff2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="20" y="115" fill="#2e6ff2" font-size="36" font-weight="500" font-family="Inter, sans-serif">${slide.signature.name}</text>`;
      signature.classList.remove('is-swiping');
    }, 200);
  };

  const selectSlide = index => {
    currentIndex = (index + slides.length) % slides.length;
    const slide = slides[currentIndex];
    dots.forEach(dot => dot.classList.toggle('is-active', Number(dot.dataset.index) === currentIndex));
    principles.forEach(card => card.classList.toggle('is-selected', Number(card.dataset.principle) === currentIndex));
    if (headline) headline.innerHTML = `${slide.title.replace('.', '<span class="headline-dot">.</span>')}`;
    renderSignature(slide);
    if (tagline) {
      tagline.classList.add('is-changing');
      setTimeout(() => {
        tagline.textContent = slide.tagline;
        tagline.classList.remove('is-changing');
      }, 150);
    }
  };

  dots.forEach(dot => dot.addEventListener('click', () => selectSlide(Number(dot.dataset.index))));
  principles.forEach(card => card.addEventListener('click', () => selectSlide(Number(card.dataset.principle))));

  // Nach fünf Sekunden automatisch zum nächsten Leitsatz wechseln.
  setInterval(() => selectSlide(currentIndex + 1), 5000);

  const navLinks = document.querySelectorAll('[data-nav]');
  const updateNav = () => {
    const current = window.location.hash.slice(1) || 'start';
    navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.nav === current));
  };
  navLinks.forEach(link => link.addEventListener('click', () => setTimeout(updateNav, 0)));
  window.addEventListener('hashchange', updateNav);
  updateNav();
  selectSlide(0);
});
