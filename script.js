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
        path: 'M18 72 C28 42 42 27 55 40 C68 53 43 89 31 72 C21 59 43 36 63 55 C82 74 91 84 105 65 C116 50 119 32 128 40 C139 50 119 83 137 82 C153 81 160 45 174 47 C190 50 180 85 199 80 C217 75 224 44 239 48 C252 52 245 77 260 76 C283 75 300 61 318 56 C341 50 363 53 401 45'
      }
    },
    {
      title: 'MENSCHEN, ENTSCHEIDEND.',
      tagline: 'Vertraue dem Team. Stärke den gemeinsamen Weg.',
      signature: {
        name: 'Mara Klein',
        path: 'M14 70 C30 25 57 25 63 48 C68 68 42 87 31 67 C24 55 45 47 61 61 C78 75 91 86 105 63 C116 46 123 30 133 39 C145 50 126 83 145 82 C164 81 171 52 184 52 C200 53 190 82 207 80 C225 78 237 55 250 57 C265 59 256 80 273 77 C296 73 319 51 342 56 C363 60 376 73 405 49'
      }
    },
    {
      title: 'IDEEN, WIRKSAM.',
      tagline: 'Denke weiter. Mache aus Impulsen Fortschritt.',
      signature: {
        name: 'Jonas Weber',
        path: 'M12 77 C25 65 27 30 43 32 C58 34 45 80 31 74 C19 69 40 48 57 55 C74 62 82 84 97 69 C111 55 112 35 123 39 C138 45 119 81 139 80 C158 79 164 47 179 51 C195 56 184 84 204 79 C224 74 235 46 249 51 C265 57 257 81 275 77 C298 73 322 58 346 57 C370 56 383 65 407 43'
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
    signature.innerHTML = `
      <path d="${slide.signature.path}" fill="none" stroke="#2e6ff2" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="142" y="108" fill="#2e6ff2" font-size="25" font-style="italic" font-family="Brush Script MT, Segoe Script, cursive">${slide.signature.name}</text>`;
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
