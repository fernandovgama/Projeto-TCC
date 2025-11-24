// ========== EFEITO DE SCROLL NO HEADER ==========
// Adiciona/remove a classe 'scrolled' no header quando o usuário rola a página
// Isso ativa os estilos CSS definidos em .header.scrolled (fundo preto, altura reduzida, etc)
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header'); // Seleciona o elemento header
    
    // Verifica se a página foi rolada mais de 50 pixels
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Adiciona a classe para ativar o estilo de header scrolled
    } else {
        header.classList.remove('scrolled'); // Remove a classe quando volta ao topo
    }
});

// ========== MENU HAMBÚRGUER MOBILE ==========
// Controla abertura/fechamento do menu lateral em tablets e smartphones
const menuIcon = document.querySelector('.menu-mobile-icon');
const menuMobile = document.querySelector('.menu-mobile');
const menuLinks = document.querySelectorAll('.menu-mobile a');

// Toggle do menu quando clica no botão hambúrguer
menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('active'); // Anima o botão (3 linhas → X)
    menuMobile.classList.toggle('active'); // Mostra/esconde menu lateral
});

// Fecha o menu quando clica em qualquer link
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuIcon.classList.remove('active'); // Volta botão ao estado normal
        menuMobile.classList.remove('active'); // Esconde o menu
    });
});

// ========== ANIMAÇÕES DE SCROLL (FADE-IN) ==========
// Adiciona efeito fade-in nos elementos quando aparecem na tela durante o scroll
const elementosAnimados = document.querySelectorAll('.animar-scroll');

// Cria observador que detecta quando elementos entram no viewport
const observador = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // Se o elemento está visível na tela
        if (entry.isIntersecting) {
            entry.target.classList.add('animado'); // Adiciona classe que ativa animação
            observador.unobserve(entry.target); // Para de observar (anima apenas uma vez)
        }
    });
}, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
});

// Inicia observação de todos os elementos com classe .animar-scroll
elementosAnimados.forEach(elemento => {
    observador.observe(elemento);
});
