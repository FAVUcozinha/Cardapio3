// Ação do botão fixo
const fixedButton = document.querySelector('.fixed-button');

fixedButton.addEventListener('click', () => {
    // Exemplo: Alternar a visibilidade de um elemento (exemplo de menu)
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.classList.toggle('hidden'); // A classe 'hidden' vai esconder ou mostrar o conteúdo
});
