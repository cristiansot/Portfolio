// Configuración de galerías
const galleries = {
    'designs': {
      containerId: 'gallery-designs',
      count: 90, // Total de imágenes en esta categoría
      path: './img/designs/',
      altPrefix: 'Graphic design work'
    },
    'industrial': {
      containerId: 'gallery-industrial', 
      count: 18,
      path: './img/industrial/',
      altPrefix: 'Industrial design project'
    },
    '3d': {
      containerId: 'gallery-3d',
      count: 36,
      path: './img/3d/',
      altPrefix: '3D model'
    },
    'photos': {
      containerId: 'gallery-photos',
      count: 21,
      path: './img/photos/',
      altPrefix: 'Photography work'
    }
  };
  
  // Carga las galerías cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    // Carga las imágenes del slider principal
    loadSliderImages();
    
    // Carga las galerías
    for (const [category, config] of Object.entries(galleries)) {
      loadGalleryImages(category, config);
    }
  });
  
  // Carga las imágenes del slider principal
  function loadSliderImages() {
    const sliderImages = [
      { src: 'img/1.jpg', alt: 'Cristian Soto Morales portfolio' },
      { src: 'img/2.jpg', alt: 'Graphic design examples' },
      { src: 'img/3.jpg', alt: 'Industrial design projects' },
      { src: 'img/4.jpg', alt: '3D models portfolio' },
      { src: 'img/5.jpg', alt: 'Photography work' }
    ];
  
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
      const imgWrap = slide.querySelector('.img-wrap');
      if (imgWrap && sliderImages[index]) {
        const img = document.createElement('img');
        img.src = sliderImages[index].src;
        img.alt = sliderImages[index].alt;
        img.loading = 'lazy'; // Lazy loading nativo
        imgWrap.appendChild(img);
      }
    });
  }
  
  // Carga las imágenes de una galería específica
  function loadGalleryImages(category, config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;
  
    // Crea un fragmento de documento para mejor rendimiento
    const fragment = document.createDocumentFragment();
  
    for (let i = 1; i <= config.count; i++) {
      const img = document.createElement('img');
      img.src = `${config.path}${i}.jpg`;
      img.alt = `${config.altPrefix} ${i}`;
      img.loading = 'lazy';
      img.classList.add('lazy-load');
      
      // Añade al fragmento
      fragment.appendChild(img);
    }
  
    // Añade todas las imágenes al DOM de una vez
    container.appendChild(fragment);
  
    // Inicializa el lazy loading para esta galería
    initLazyLoading(container);
  }
  
  // Configura Intersection Observer para lazy loading
  function initLazyLoading(container) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '200px',
      threshold: 0.01
    });
  
    // Observa todas las imágenes en el contenedor
    container.querySelectorAll('img.lazy-load').forEach(img => {
      // Si usas lazy loading más agresivo, puedes mover el src a data-src
      // img.dataset.src = img.src;
      // img.removeAttribute('src');
      observer.observe(img);
    });
  }