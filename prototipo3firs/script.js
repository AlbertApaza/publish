document.addEventListener("DOMContentLoaded", function() {
    
    // --- MENÚ HAMBURGUESA Y SUBMENÚS MÓVILES ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const hasSubmenuItems = document.querySelectorAll(".has-submenu > a");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cierra el menú al hacer clic en un enlace que no sea de submenú
        document.querySelectorAll(".nav-link").forEach(link => {
            if (!link.parentElement.classList.contains("has-submenu")) {
                link.addEventListener("click", () => {
                    if (hamburger.classList.contains("active")) {
                        hamburger.classList.remove("active");
                        navMenu.classList.remove("active");
                    }
                });
            }
        });

        // Manejo de submenús en móvil
        hasSubmenuItems.forEach(item => {
            item.addEventListener("click", function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
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

        // Crear los puntos de navegación
        slides.forEach((slide, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                showSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        function updateContent(index) {
            if (slideTitle && slideText && slides[index]) {
                // Animar la salida del texto
                slideContent.style.opacity = '0';
                slideContent.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    slideTitle.textContent = slides[index].dataset.title;
                    slideText.textContent = slides[index].dataset.text;
                    // Animar la entrada del texto
                    slideContent.style.opacity = '1';
                    slideContent.style.transform = 'translateY(0)';
                }, 400); // Coincide con la transición CSS
            }
        }

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if(dots[i]) dots[i].classList.remove("active");
            });

            if (slides[index] && dots[index]) {
                slides[index].classList.add("active");
                dots[index].classList.add("active");
                updateContent(index);
                currentSlide = index;
            }
        }

        function nextSlide() {
            let newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            let newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
        }

        function resetInterval() {
            clearInterval(slideInterval);
            if (!isPaused) {
                startSlider();
            }
        }

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });

        if (playPauseBtn) {
            playPauseBtn.addEventListener("click", () => {
                isPaused = !isPaused;
                if (isPaused) {
                    clearInterval(slideInterval);
                    playPauseBtn.innerHTML = '▶'; // Símbolo de play
                } else {
                    startSlider();
                    playPauseBtn.innerHTML = '❚❚'; // Símbolo de pausa
                }
            });
        }

        // Iniciar todo
        showSlide(0);
        startSlider();
    }

    // --- LÓGICA DEL ACORDEÓN DE SERVICIOS PARA MÓVIL ---
    const accordionPanels = document.querySelectorAll('.accordion-panel');
    accordionPanels.forEach(panel => {
        panel.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Si el panel ya está activo, ciérralo. Si no, cierra los demás y abre este.
                const wasActive = panel.classList.contains('active');
                accordionPanels.forEach(p => p.classList.remove('active'));
                if (!wasActive) {
                    panel.classList.add('active');
                }
            }
        });
    });
});