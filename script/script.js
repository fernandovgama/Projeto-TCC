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

// ========== VALIDAÇÃO DO FORMULÁRIO ==========
// Validação em tempo real dos campos de contato com feedback visual
const form = document.getElementById('form-contato');
const gruposCampos = document.querySelectorAll('.grupo-campo');

// Adiciona eventos de validação em cada campo (blur e input)
gruposCampos.forEach(grupo => {
    const input = grupo.querySelector('input, textarea');
    
    // Valida quando o usuário sai do campo (blur)
    input.addEventListener('blur', function() {
        validarCampo(grupo, input);
    });

    // Revalida em tempo real se o campo estava inválido
    input.addEventListener('input', function() {
        if (grupo.classList.contains('invalido')) {
            validarCampo(grupo, input);
        }
    });
});

// Função que valida um campo individual
function validarCampo(grupo, input) {
    const valor = input.value.trim();
    
    // Validação específica para email com regex
    if (input.type === 'email') {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
        if (emailValido && valor !== '') {
            grupo.classList.remove('invalido');
            grupo.classList.add('valido'); // Adiciona ícone verde de sucesso
            return true;
        } else {
            grupo.classList.remove('valido');
            grupo.classList.add('invalido'); // Adiciona ícone vermelho e mensagem de erro
            return false;
        }
    } else {
        // Validação para campos de texto (nome e mensagem)
        if (valor !== '') {
            grupo.classList.remove('invalido');
            grupo.classList.add('valido');
            return true;
        } else {
            grupo.classList.remove('valido');
            grupo.classList.add('invalido');
            return false;
        }
    }
}

// Submissão do formulário com validação completa
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne envio padrão do formulário
    
    let formularioValido = true;
    
    // Valida todos os campos antes de enviar
    gruposCampos.forEach(grupo => {
        const input = grupo.querySelector('input, textarea');
        if (!validarCampo(grupo, input)) {
            formularioValido = false;
        }
    });
    
    // Se todos os campos são válidos
    if (formularioValido) {
        // Exibe mensagem de sucesso
        const mensagemSucesso = document.querySelector('.mensagem-sucesso');
        mensagemSucesso.classList.add('mostrar');
        
        // Limpa formulário e remove validações após 3 segundos
        setTimeout(() => {
            form.reset(); // Reseta todos os campos
            gruposCampos.forEach(grupo => {
                grupo.classList.remove('valido', 'invalido'); // Remove classes de validação
            });
            mensagemSucesso.classList.remove('mostrar'); // Oculta mensagem
        }, 3000);
    }
});

// ========== FUNÇÃO WHATSAPP ==========
// Função centralizada para abrir WhatsApp com mensagens personalizadas
// Usada por todos os botões de CTA do site (total de 6 botões)
function abrirWhatsApp(mensagem) {
    const numeroWhatsApp = '5511993284160'; // Número fixo do açougue
    const mensagemCodificada = encodeURIComponent(mensagem); // Codifica caracteres especiais
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    window.open(url, '_blank'); // Abre em nova aba
}
