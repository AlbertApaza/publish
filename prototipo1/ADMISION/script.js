document.addEventListener('DOMContentLoaded', function() {

    // -----------------------------------------
    // Animación de aparición al hacer scroll
    // -----------------------------------------
    
    // Selecciona todas las secciones que queremos animar
    const sections = document.querySelectorAll('section');

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // El viewport del navegador
        rootMargin: '0px',
        threshold: 0.1 // La sección se considera visible cuando el 10% de ella está en pantalla
    };

    // La función que se ejecutará cuando una sección entre o salga del viewport
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección está intersectando (es visible)
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' para activar la animación CSS
                entry.target.classList.add('is-visible');
                // Deja de observar esta sección una vez que ha sido animada
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Itera sobre cada sección y le aplica el observer
    sections.forEach(section => {
        // Inicialmente, añade la clase base para la animación
        section.classList.add('fade-in-section');
        // Empieza a observar la sección
        sectionObserver.observe(section);
    });

    // -----------------------------------------
    // Pequeño ajuste para la sección de modalidades
    // para evitar que se solapen mal en el hover
    // -----------------------------------------
    const modalidadCards = document.querySelectorAll('.modalidad-card');
    const modalidadesContainer = document.querySelector('.modalidades-container');

    modalidadCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            modalidadesContainer.classList.add('is-hovering');
        });
        card.addEventListener('mouseleave', () => {
            modalidadesContainer.classList.remove('is-hovering');
        });
    });

});