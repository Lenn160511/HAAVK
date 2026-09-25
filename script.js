document.addEventListener('DOMContentLoaded', () => {
  const hudId = document.getElementById('hudId');
  if (hudId) { const now = new Date(); const pad = n => String(n).padStart(2, '0'); const stamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`; hudId.textContent = `WW UID:${Math.floor(1e15 + Math.random() * 9e15)}_${stamp}`; }

  const pointsValue = document.getElementById('pointsValue');
  if (pointsValue) { const start = performance.now(); const tick = now => { const progress = Math.min((now - start) / 900, 1); pointsValue.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * 40); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }

  const slides = [
    { title: 'ZUKUNFT, EFFIZIENT.', tagline: 'Perfektioniere die Mittel. Bestimme den Zweck.' },
    { title: 'MENSCHEN, ENTSCHEIDEND.', tagline: 'Vertraue dem Team. Stärke den gemeinsamen Weg.' },
    { title: 'IDEEN, WIRKSAM.', tagline: 'Denke weiter. Mache aus Impulsen Fortschritt.' }
  ];
  const headline = document.getElementById('headline');
  const tagline = document.getElementById('tagline');
  const dots = document.querySelectorAll('.dot');
  const principles = document.querySelectorAll('.principle');
  const selectSlide = index => { const slide = slides[index] || slides[0]; dots.forEach(dot => dot.classList.toggle('is-active', Number(dot.dataset.index) === index)); principles.forEach(card => card.classList.toggle('is-selected', Number(card.dataset.principle) === index)); if (headline) headline.innerHTML = `${slide.title.replace('.', '<span class="headline-dot">.</span>')}`; if (tagline) { tagline.classList.add('is-changing'); setTimeout(() => { tagline.textContent = slide.tagline; tagline.classList.remove('is-changing'); }, 150); } };
  dots.forEach(dot => dot.addEventListener('click', () => selectSlide(Number(dot.dataset.index))));
  principles.forEach(card => card.addEventListener('click', () => selectSlide(Number(card.dataset.principle))));

  const navLinks = document.querySelectorAll('[data-nav]');
  const updateNav = () => { const current = window.location.hash.slice(1) || 'start'; navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.nav === current)); };
  navLinks.forEach(link => link.addEventListener('click', () => setTimeout(updateNav, 0))); window.addEventListener('hashchange', updateNav); updateNav();
});
