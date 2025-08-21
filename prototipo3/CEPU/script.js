document.addEventListener('DOMContentLoaded', function() {

    // Función para inicializar el slider de testimonios
    function initTestimonialSlider() {
        const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
        if (!sliderWrapper) return; // Si no hay slider, no hacer nada

        const slidesContainer = sliderWrapper.querySelector('.testimonial-slides');
        const slides = sliderWrapper.querySelectorAll('.testimonial-slide');
        const prevButton = sliderWrapper.querySelector('.slider-nav.prev');
        const nextButton = sliderWrapper.querySelector('.slider-nav.next');
        
        let currentIndex = 0;
        let slideInterval;
        const slideDuration = 7000; // 7 segundos

        function goToSlide(index) {
            // Asegurarse de que el índice esté dentro de los límites
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        function startSlider() {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, slideDuration);
        }

        function resetSlider() {
            clearInterval(slideInterval);
            startSlider();
        }

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetSlider();
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetSlider();
        });

        // Iniciar el slider automático
        startSlider();
    }

    // Llamar a la función para inicializar el slider
    initTestimonialSlider();

});