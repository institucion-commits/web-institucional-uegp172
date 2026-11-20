(() => {
  const grid = document.getElementById('career-grid');
  const input = document.getElementById('search-careers');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const mobileCategory = document.getElementById('mobile-category');
  const filters = document.getElementById('career-filters');
  let activeCategory = 'all';

  // Imágenes locales específicas para cada una de las ocho carreras aprobadas.
  const photos = {
    'carrera-02': 'ASSETS/img/carreras/electromecanica.webp',
    'carrera-03': 'ASSETS/img/carreras/construccion-obras-civiles.webp',
    'carrera-05': 'ASSETS/img/carreras/enfermeria.webp',
    'carrera-06': 'ASSETS/img/carreras/auxiliar-docente.webp',
    'carrera-10': 'ASSETS/img/carreras/educacion-primaria.webp',
    'carrera-11': 'ASSETS/img/carreras/seguridad-higiene.webp',
    'carrera-12': 'ASSETS/img/carreras/recursos-humanos.webp',
    'carrera-13': 'ASSETS/img/carreras/marketing-publicidad.webp'
  };
  const categories = {
    'carrera-01': ['construccion'],
    'carrera-02': ['construccion', 'electricidad', 'servicios'],
    'carrera-03': ['construccion'],
    'carrera-04': ['administracion'],
    'carrera-05': ['salud'],
    'carrera-06': ['educacion'],
    'carrera-07': ['tecnologia', 'educacion'],
    'carrera-08': ['educacion'],
    'carrera-09': ['educacion'],
    'carrera-10': ['educacion'],
    'carrera-11': ['servicios', 'ambiente'],
    'carrera-12': ['administracion'],
    'carrera-13': ['administracion'],
    'carrera-14': ['ambiente'],
    'carrera-15': ['ambiente']
  };

  function render() {
    const q = input.value.trim().toLocaleLowerCase('es');
    const filtered = window.CARRERAS.filter(c => {
      const matchesText = c.title.toLocaleLowerCase('es').includes(q);
      const matchesCategory = activeCategory === 'all' || (categories[c.id] || []).includes(activeCategory);
      return matchesText && matchesCategory;
    });
    grid.innerHTML = filtered.map(c => {
      return `<a class="career-card" href="carrera.html?id=${encodeURIComponent(c.id)}"><div class="card-image"><img src="${photos[c.id] || ''}" alt="Fotografía ilustrativa de ${c.title}" loading="lazy" onerror="this.parentElement.classList.add('image-fallback');this.remove()"><span class="duration-tag">${c.duration}</span></div><div class="card-body"><span class="card-kicker">TECNICATURA / PROFESORADO</span><h3>${c.title}</h3><span class="card-link">Ver plan de estudios <b>↗</b></span></div></a>`;
    }).join('');
    count.textContent = `${filtered.length} ${filtered.length === 1 ? 'carrera' : 'carreras'}`;
    empty.hidden = filtered.length > 0;
  }

  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll('.filter-button').forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    mobileCategory.value = activeCategory;
    render();
  });
  mobileCategory.addEventListener('change', () => {
    activeCategory = mobileCategory.value;
    filters.querySelectorAll('.filter-button').forEach(b => {
      const active = b.dataset.category === activeCategory;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    render();
  });
  input.addEventListener('input', render);
  render();
})();
