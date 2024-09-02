// Obtém os elementos relevantes do DOM
const logo = document.getElementById('logo');
const navBar = document.querySelector('nav');
const submitButton = document.getElementById('submit');
const contactLink = document.getElementById('contactLink');
const form = document.getElementById('form');

// Cria uma lista de links que inclui os links da barra de navegação e o logo
const links = Array.from(navBar.children).concat(logo);

// Função para remover a classe 'clicked' de todos os links
function removeClickedClassFromAllLinks() {
    links.forEach(link => link.classList.remove('clicked'));
}

// Adiciona a classe 'clicked' ao link atualmente selecionado
links.forEach(link => {
    link.addEventListener('click', () => {
        removeClickedClassFromAllLinks();
        link.classList.add('clicked');
    });
});

// Remove a classe 'clicked' do último link clicado após enviar o formulário
submitButton.addEventListener('click', () => {
    contactLink.classList.remove('clicked');
});

// Informa o envio do formulário e limpa seus campos
form.addEventListener('submit', (event) => {
    window.alert('Mensagem enviada com sucesso.');
    form.reset();
});
