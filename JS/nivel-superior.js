(() => {
  const grid = document.getElementById('career-grid');
  const input = document.getElementById('search-careers');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const mobileCategory = document.getElementById('mobile-category');
  const filters = document.getElementById('career-filters');
  let activeCategory = 'all';

  // Fotos ilustrativas por carrera. Si una URL externa falla, se oculta la imagen rota y queda un fondo azul institucional.
  const photos = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80'
  ];
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
      const i = window.CARRERAS.findIndex(x => x.id === c.id);
      return `<a class="career-card" href="carrera.html?id=${encodeURIComponent(c.id)}"><div class="card-image"><img src="${photos[i % photos.length]}" alt="Fotografía ilustrativa de ${c.title}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')"><span class="duration-tag">${c.duration}</span></div><div class="card-body"><span class="card-kicker">TECNICATURA / PROFESORADO</span><h3>${c.title}</h3><span class="card-link">Ver plan de estudios <b>↗</b></span></div></a>`;
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
