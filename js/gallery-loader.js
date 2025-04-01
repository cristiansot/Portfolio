// Configuración de galerías
const galleries = {
  'designs': {
      containerId: 'gallery-designs',
      count: 90,
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

// Variable global para almacenar las imágenes de cada galería
const galleryData = {};

document.addEventListener('DOMContentLoaded', function() {
  // Carga las imágenes del slider principal
  loadSliderImages();
  
  // Agrega el contenedor del lightbox al DOM
  addLightboxToDOM();
  
  // Carga las galerías
  for (const [category, config] of Object.entries(galleries)) {
      loadGalleryImages(category, config);
  }
});

function addLightboxToDOM() {
  const lightboxHTML = `
      <div id="lightbox" class="lightbox" style="display: none;">
          <span class="lightbox-close">&times;</span>
          <div class="lightbox-content">
              <img id="lightbox-image" src="" alt="">
              <div class="lightbox-caption"></div>
          </div>
          <a class="lightbox-prev">&#10094;</a>
          <a class="lightbox-next">&#10095;</a>
      </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  
  // Configura eventos del lightbox
  setupLightboxEvents();
}

function setupLightboxEvents() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);
  lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
          closeLightbox();
      }
  });
  
  // Teclado
  document.addEventListener('keydown', function(e) {
      if (lightbox.style.display === 'block') {
          if (e.key === 'Escape') closeLightbox();
          if (e.key === 'ArrowLeft') showPrevImage();
          if (e.key === 'ArrowRight') showNextImage();
      }
  });
}

let currentGallery = '';
let currentIndex = 0;

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
          img.loading = 'lazy';
          imgWrap.appendChild(img);
      }
  });
}

function loadGalleryImages(category, config) {
  const container = document.getElementById(config.containerId);
  if (!container) return;

  // Almacena los datos de la galería
  galleryData[category] = [];
  
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= config.count; i++) {
      const imgSrc = `${config.path}${i}.jpg`;
      const imgAlt = `${config.altPrefix} ${i}`;
      
      // Guarda la información de la imagen
      galleryData[category].push({ src: imgSrc, alt: imgAlt });
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      img.loading = 'lazy';
      img.classList.add('lazy-load', 'gallery-image');
      img.dataset.category = category;
      img.dataset.index = i - 1;
      
      // Agrega evento para abrir lightbox
      img.addEventListener('click', function() {
          openLightbox(category, parseInt(this.dataset.index));
      });
      
      fragment.appendChild(img);
  }

  container.appendChild(fragment);
  initLazyLoading(container);
}

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

  container.querySelectorAll('img.lazy-load').forEach(img => {
      observer.observe(img);
  });
}

function openLightbox(gallery, index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const caption = document.querySelector('.lightbox-caption');
  
  currentGallery = gallery;
  currentIndex = index;
  
  const imageData = galleryData[gallery][index];
  lightboxImg.src = imageData.src;
  lightboxImg.alt = imageData.alt;
  caption.textContent = imageData.alt;
  
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showPrevImage() {
  if (currentGallery && galleryData[currentGallery]) {
      currentIndex = (currentIndex - 1 + galleryData[currentGallery].length) % galleryData[currentGallery].length;
      updateLightboxImage();
  }
}

function showNextImage() {
  if (currentGallery && galleryData[currentGallery]) {
      currentIndex = (currentIndex + 1) % galleryData[currentGallery].length;
      updateLightboxImage();
  }
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById('lightbox-image');
  const caption = document.querySelector('.lightbox-caption');
  
  const imageData = galleryData[currentGallery][currentIndex];
  lightboxImg.src = imageData.src;
  lightboxImg.alt = imageData.alt;
  caption.textContent = imageData.alt;
}