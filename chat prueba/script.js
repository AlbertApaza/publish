document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWidget = document.getElementById('chat-widget');
    const chatCloseButton = document.getElementById('chat-close-button');

    const toggleWidget = () => {
        chatWidget.classList.toggle('open');
    };

    chatToggleButton.addEventListener('click', toggleWidget);

    chatCloseButton.addEventListener('click', toggleWidget);
});