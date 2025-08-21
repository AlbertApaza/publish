document.addEventListener('DOMContentLoaded', () => {

    const notificationFabAction = document.getElementById('notification-fab-action');
    const pipFabAction = document.getElementById('pip-fab-action');
    let currentPipIndex = 0;

    const pipModalHTML = `
        <div id="pip-modal-overlay" class="modal-overlay">
            <div class="pip-image-container">
                <img src="1080x1920.png" alt="Anuncio 1" class="pip-image">
                <img src="1080x1920.png" alt="Anuncio 2" class="pip-image">
            </div>
            <button id="close-pip-modal" class="pip-close-btn">&times;</button>
            <button id="pip-prev-btn" class="pip-nav-btn prev"><i class="fas fa-chevron-left"></i></button>
            <button id="pip-next-btn" class="pip-nav-btn next"><i class="fas fa-chevron-right"></i></button>
        </div>`;

const notificationModalHTML = `
    <div id="notification-modal" class="modal-overlay">
        <div class="modal-content" id="notification-content">
            <button id="close-notification-modal" class="modal-close-btn">&times;</button>
            <h3><i class="fas fa-megaphone"></i> Avisos Importantes</h3>
            
            <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
                <h4>Rectificación de Matrícula 2024-II</h4>
                <p>
                    El proceso estará disponible del 15 al 20 de Agosto. 
                    <a href="https://upt.edu.pe/rectificacion-matricula-2024" target="_blank">[Descargar Aqui]</a>
                </p>
                <small>Publicado: 01/08/2024</small>
            </div>
            
            <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
                <h4>Actualización de Métodos de Pago</h4>
                <p>
                    Hemos añadido nuevos métodos de pago en línea. 
                    <a href="https://upt.edu.pe/metodos-de-pago" target="_blank">[Ver detalles aquí]</a>
                </p>
                <small>Publicado: 28/07/2024</small>
            </div>
            
            <div>
                <h4>Convocatoria a Beca de Excelencia</h4>
                <p>
                    Revisa los requisitos y postula hasta el 30 de Agosto. 
                    <a href="https://upt.edu.pe/beca-excelencia" target="_blank">[Descarga aquí]</a>
                </p>
                <small>Publicado: 25/07/2024</small>
            </div>
        </div>
    </div>`;


    function handleInitialModal() {
        // Siempre abre el PIP al inicio
        openPipModal();
    }

    function animateModalToFab(sourceElement, targetElement, overlayElement, cloneClasses) {
        if (!sourceElement || !targetElement || !overlayElement) return;
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const clone = sourceElement.cloneNode(true);
        clone.id = '';
        clone.className = '';
        clone.classList.add('animation-clone', ...cloneClasses);
        Object.assign(clone.style, { top: `${sourceRect.top}px`, left: `${sourceRect.left}px`, width: `${sourceRect.width}px`, height: `${sourceRect.height}px` });
        document.body.appendChild(clone);
        overlayElement.classList.add('hidden');
        clone.offsetHeight;
        Object.assign(clone.style, { top: `${targetRect.top}px`, left: `${targetRect.left}px`, width: `${targetRect.width}px`, height: `${targetRect.height}px`, opacity: '0', transform: 'scale(0.1)' });
        clone.addEventListener('transitionend', () => {
            clone.remove();
            overlayElement.remove();
        }, { once: true });
    }

function openPipModal() {
    if (document.getElementById('pip-modal-overlay')) return;
    document.body.insertAdjacentHTML('beforeend', pipModalHTML);
    const overlay = document.getElementById('pip-modal-overlay');
    const imageContainer = overlay.querySelector('.pip-image-container');
    const images = overlay.querySelectorAll('.pip-image');
    const closeBtn = document.getElementById('close-pip-modal');
    const nextBtn = document.getElementById('pip-next-btn');
    const prevBtn = document.getElementById('pip-prev-btn');
    const showImage = (index) => {
        images.forEach((img, i) => img.classList.toggle('active-image', i === index));
        currentPipIndex = index;
    };

    // 🔹 al cerrar el PIP → abrir el modal de notificaciones
    const closeAction = () => {
        animateModalToFab(imageContainer, pipFabAction.querySelector('i'), overlay, ['pip-animation-clone']);
        setTimeout(openNotificationModal, 400); // pequeño delay para que no choquen las animaciones
    };

    closeBtn.addEventListener('click', closeAction);
    overlay.addEventListener('click', e => { 
        if (!e.target.closest('.pip-image') && e.target === overlay) closeAction();
    });

    nextBtn.addEventListener('click', () => showImage((currentPipIndex + 1) % images.length));
    prevBtn.addEventListener('click', () => showImage((currentPipIndex - 1 + images.length) % images.length));
    showImage(currentPipIndex);
}

        function openNotificationModal() {
            if (document.getElementById('notification-modal')) return;
            document.body.insertAdjacentHTML('beforeend', notificationModalHTML);
            const overlay = document.getElementById('notification-modal');
            const content = document.getElementById('notification-content');
            const closeBtn = document.getElementById('close-notification-modal');
            const closeAction = () => animateModalToFab(content, notificationFabAction.querySelector('i'), overlay, ['notification-animation-clone']);
            closeBtn.addEventListener('click', closeAction);
            overlay.addEventListener('click', e => { if (e.target === overlay) closeAction(); });
        }

    if (pipFabAction) pipFabAction.addEventListener('click', openPipModal);
    if (notificationFabAction) notificationFabAction.addEventListener('click', openNotificationModal);

    const mainFab = document.getElementById('main-fab');
    const floatingContainer = document.getElementById('floating-container');
    if (mainFab) {
        mainFab.addEventListener('click', () => {
            floatingContainer.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!floatingContainer.contains(e.target)) {
                floatingContainer.classList.remove('active');
            }
        });
    }
    
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slidesWrapper = heroSlider.querySelector('.slides-wrapper');
        const slides = heroSlider.querySelectorAll('.slide');
        const dotsContainer = heroSlider.querySelector('.slider-dots');
        let currentIndex = 0;
        if (slides.length > 1) {
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.dot');
            const goToSlide = (index) => {
                slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
                dots.forEach(d => d.classList.remove('active'));
                dots[index].classList.add('active');
                currentIndex = index;
            };
            const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
            setInterval(nextSlide, 5000);
        }
    }

    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const slides = document.querySelectorAll('.testimonial-slide');
        let currentIndex = 0;
        const showTestimonial = (index) => slides.forEach((s, i) => s.classList.toggle('active-testimonial', i === index));
        document.getElementById('testimonial-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showTestimonial(currentIndex);
        });
        document.getElementById('testimonial-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showTestimonial(currentIndex);
        });
        showTestimonial(0);
    }

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(counter => {
                    counter.innerText = '0';
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 10);
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            setTimeout(updateCounter, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    handleInitialModal();
});
