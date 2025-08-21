document.addEventListener("DOMContentLoaded", function() {

    // --- TOP ANNOUNCEMENT BAR DISMISSAL ---
    const topAnnouncementBar = document.querySelector(".top-announcement-bar");
    const closeAnnouncementBtn = document.querySelector(".close-announcement");
    if (topAnnouncementBar && closeAnnouncementBtn) {
        closeAnnouncementBtn.addEventListener("click", () => {
            topAnnouncementBar.style.display = "none";
        });
    }

    // --- MENÚ HAMBURGUESA Y SUBMENÚS MÓVILES ---
    const hamburger = document.querySelector(".main-header .hamburger");
    const navMenu = document.querySelector(".main-header .nav-menu");
    const hasSubmenuItems = document.querySelectorAll(".main-header .has-submenu > a");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        hasSubmenuItems.forEach(item => {
            item.addEventListener("click", function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    document.querySelectorAll(".main-header .has-submenu.open").forEach(openSubmenu => {
                        if (openSubmenu !== this.parentElement) {
                            openSubmenu.classList.remove("open");
                        }
                    });
                    this.parentElement.classList.toggle("open");
                }
            });
        });
    }

    // --- LÓGICA DEL SLIDER DEL BANNER ---
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const prevBtn = document.querySelector(".slider-nav .prev");
    const nextBtn = document.querySelector(".slider-nav .next");
    const playPauseBtn = document.querySelector(".play-pause-btn");
    const slideContent = document.querySelector(".slide-content");
    const slideTitle = document.getElementById("slide-title");
    const slideText = document.getElementById("slide-text");
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        let isPaused = false;
        slides.forEach((_, index) => {
            if (dotsContainer){
                const dot = document.createElement("div");
                dot.classList.add("dot");
                if (index === 0) dot.classList.add("active");
                dot.addEventListener("click", () => { showSlide(index); resetInterval(); });
                dotsContainer.appendChild(dot);
            }
        });
        const dots = document.querySelectorAll(".dot");
        function updateContent(index) {
            if (slideContent && slideTitle && slideText && slides[index]) {
                slideContent.style.opacity = '0';
                slideContent.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    slideTitle.textContent = slides[index].dataset.title;
                    slideText.textContent = slides[index].dataset.text;
                    slideContent.style.opacity = '1';
                    slideContent.style.transform = 'translateY(0)';
                }, 400);
            }
        }
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if (dots[i]) dots[i].classList.remove("active");
            });
            if (slides[index] && dots[index]) {
                slides[index].classList.add("active");
                dots[index].classList.add("active");
                updateContent(index);
                currentSlide = index;
            }
        }
        function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
        function prevSlide() { showSlide((currentSlide - 1 + slides.length) % slides.length); }
        function startSlider() { slideInterval = setInterval(nextSlide, 5000); }
        function resetInterval() {
            clearInterval(slideInterval);
            if (!isPaused) startSlider();
        }
        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
        if (playPauseBtn) {
            playPauseBtn.addEventListener("click", () => {
                isPaused = !isPaused;
                playPauseBtn.innerHTML = isPaused ? '▶' : '❚❚';
                if (isPaused) {
                    clearInterval(slideInterval);
                } else {
                    startSlider();
                }
            });
        }
        showSlide(0);
        startSlider();
    }

    // --- ACORDEÓN VERTICAL DE SERVICIOS PARA MÓVIL ---
    const accordionPanels = document.querySelectorAll('.services-section .accordion-panel');
    accordionPanels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!e.target.classList.contains('btn')) {
                    const wasActive = panel.classList.contains('active');
                    accordionPanels.forEach(p => p.classList.remove('active'));
                    if (!wasActive) {
                        panel.classList.add('active');
                    }
                }
            }
        });
    });

    // --- LÓGICA DE BOTONES FLOTANTES ---
    // 1. Asistente de Chat
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWidget = document.getElementById('chat-widget');
    const chatCloseButton = document.getElementById('chat-close-button');

    if (chatToggleButton && chatWidget && chatCloseButton) {
        const toggleWidget = () => {
            chatWidget.classList.toggle('open');
        };
        chatToggleButton.addEventListener('click', toggleWidget);
        chatCloseButton.addEventListener('click', toggleWidget);
    }
    
    // 2. Traductor de Google (VERSIÓN CORREGIDA Y ROBUSTA)
    const translateFab = document.getElementById('translate-fab');
    if (translateFab) {
        // Usamos un intervalo para esperar a que el widget de Google se cargue,
        // ya que es un proceso asíncrono.
        const checkGoogleTranslateInterval = setInterval(() => {
            const googleTrigger = document.querySelector('#google_translate_element .goog-te-gadget-simple');
            
            // Si el elemento ya existe en el DOM...
            if (googleTrigger) {
                // ...detenemos el intervalo para no seguir buscando.
                clearInterval(checkGoogleTranslateInterval);

                // Y ahora sí, asignamos el evento de clic a nuestro botón flotante.
                translateFab.addEventListener('click', () => {
                    // Simulamos un clic en el widget original de Google (que está oculto).
                    googleTrigger.click();
                });

                console.log("Listener del traductor de Google asignado correctamente.");
            }
        }, 200); // Revisa cada 200 milisegundos.

        // Para seguridad, detenemos la búsqueda después de 10 segundos
        // por si el script de Google falla por alguna razón.
        setTimeout(() => {
            clearInterval(checkGoogleTranslateInterval);
        }, 10000);
    }
});