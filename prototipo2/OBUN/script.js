document.addEventListener('DOMContentLoaded', function() {

    // Seleccionamos todas las secciones de servicio para animarlas
    const sectionsToAnimate = document.querySelectorAll('.service-section, .hero-section');

    // Configuración del Intersection Observer para la animación
    const animationObserverOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.2 // La animación se dispara cuando el 20% de la sección es visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección está entrando en la vista
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Dejamos de observar la sección una vez que ha sido animada para mejorar el rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    // Aplicamos el observador a cada una de las secciones
    sectionsToAnimate.forEach(section => {
        animationObserver.observe(section);
    });

});