document.addEventListener('DOMContentLoaded', function() {




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