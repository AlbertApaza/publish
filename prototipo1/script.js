document.addEventListener('DOMContentLoaded', () => {

    // --- Declaración de elementos del DOM ---
    const header = document.querySelector('.main-header');
    const subNav = document.querySelector('#sub-nav');
    const heroSection = document.querySelector('.hero-slider');
    const notificationBell = document.getElementById('notification-bell');
    const modalOverlay = document.getElementById('notification-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const navToggle = document.querySelector('.nav-toggle');

    // 1. LÓGICA DE SCROLL PARA HEADER Y SUB-NAV
    window.addEventListener('scroll', () => {
        // Añade sombra al header principal al hacer scroll
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Muestra/oculta la sub-navegación al pasar el banner
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (window.scrollY > heroHeight * 0.93) {
                subNav.classList.add('visible');
            } else {
                subNav.classList.remove('visible');
            }
        }
    });

    // 2. LÓGICA DEL MODAL DE NOTIFICACIONES
    if (notificationBell && modalOverlay && closeModalBtn) {
        const openModal = () => modalOverlay.classList.add('active');
        const closeModal = () => modalOverlay.classList.remove('active');

        notificationBell.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // 3. SLIDER DE IMÁGENES DEL HERO
    let currentSlide = 0;
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const openItem = document.querySelector('.faq-item.active');
            
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
            }
            
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 5. MENÚ HAMBURGUESA PARA MÓVIL (DEMO)
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            alert("menu movil");
        });
    }

    // 6. SLIDER PARA LA GALERÍA DEL CAMPUS (NUEVA LÓGICA)
    const gallery = document.querySelector('.campus-gallery');
    if (gallery) {
        const imagesContainer = gallery.querySelector('.gallery-images');
        const gallerySlides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const dotsContainer = gallery.querySelector('.gallery-dots');
        
        let currentIndex = 0;
        let dots = [];

        function goToSlide(index) {
            // Mover el contenedor de imágenes
            imagesContainer.style.transform = `translateX(-${index * 100}%)`;

            // Actualizar el punto activo
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');

            // Actualizar el índice
            currentIndex = index;
        }

        function createDots() {
            gallerySlides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('gallery-dot');
                dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }
        
        // Manejadores de eventos para los botones
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % gallerySlides.length;
            goToSlide(newIndex);
        });

        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
            goToSlide(newIndex);
        });
        
        // Inicialización
        if(gallerySlides.length > 0) {
            createDots();
            goToSlide(0); // Empezar en la primera imagen y establecer el estado inicial
        }
    }
});