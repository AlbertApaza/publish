document.addEventListener('DOMContentLoaded', function() {

    // Seleccionamos todos los elementos que queremos animar al hacer scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // Observa en relación al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando al menos el 10% del elemento es visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está intersectando (visible)
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' para activar la animación CSS
                entry.target.classList.add('is-visible');
                // Dejamos de observar el elemento una vez que ha sido animado para optimizar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicamos el observador a cada elemento que debe ser animado
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });

});