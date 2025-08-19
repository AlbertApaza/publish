document.addEventListener("DOMContentLoaded", function() {
    
    // --- MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            if (hamburger.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }));
    }

    // --- LÓGICA DEL SLIDER DEL BANNER ---
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const prevBtn = document.querySelector(".slider-nav .prev");
    const nextBtn = document.querySelector(".slider-nav .next");
    const playPauseBtn = document.querySelector(".play-pause-btn");
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
                slideTitle.textContent = slides[index].dataset.title;
                slideText.textContent = slides[index].dataset.text;
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
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetInterval();
            });
        }

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
});