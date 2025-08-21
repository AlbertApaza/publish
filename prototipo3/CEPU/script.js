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