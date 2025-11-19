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

