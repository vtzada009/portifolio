/**
 * PORTFÓLIO PESSOAL - VITOR ENZO SILVA DO NASCIMENTO
 * Desenvolvido em JavaScript Puro (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================================================
       1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
       ========================================================================== */
    const botaoTema = document.getElementById('botao-tema');
    const elementoHtml = document.documentElement;
    const iconeTema = botaoTema.querySelector('.icone-tema');

    function alternarTema() {
        const temaAtual = elementoHtml.getAttribute('data-tema');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

        elementoHtml.setAttribute('data-tema', novoTema);

        // Atualiza o ícone do botão
        if (novoTema === 'light') {
            iconeTema.classList.remove('bi-moon-stars-fill');
            iconeTema.classList.add('bi-sun-fill');
        } else {
            iconeTema.classList.remove('bi-sun-fill');
            iconeTema.classList.add('bi-moon-stars-fill');
        }
    }

    botaoTema.addEventListener('click', alternarTema);

    /* ==========================================================================
       2. MENU MOBILE (HAMBÚRGUER)
       ========================================================================== */
    const botaoMenuMobile = document.getElementById('botao-menu-mobile');
    const navegacaoPrincipal = document.getElementById('navegacao-principal');
    const linksNavegacao = document.querySelectorAll('.link-navegacao');

    botaoMenuMobile.addEventListener('click', function () {
        navegacaoPrincipal.classList.toggle('ativo');
        
        // Alterna ícone entre hambúrguer e fechar
        const iconeMenu = botaoMenuMobile.querySelector('i');
        iconeMenu.classList.toggle('bi-list');
        iconeMenu.classList.toggle('bi-x-lg');
    });

    // Fecha o menu ao clicar em qualquer link
    linksNavegacao.forEach(function (link) {
        link.addEventListener('click', function () {
            navegacaoPrincipal.classList.remove('ativo');
            const iconeMenu = botaoMenuMobile.querySelector('i');
            iconeMenu.classList.add('bi-list');
            iconeMenu.classList.remove('bi-x-lg');
        });
    });

    /* ==========================================================================
       3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
       ========================================================================== */
    const elementoTextoMaquina = document.getElementById('texto-maquina-escrever');
    const titulosParaDigitar = [
        "Estudante de Desenvolvimento Full Stack",
        "Especializando em Front-end",
        "Futuro Desenvolvedor Web & Mobile"
    ];

    let indiceTextoAtual = 0;
    let indiceCaractereAtual = 0;
    let estaApagando = false;
    const velocidadeDigitacao = 100;
    const velocidadeApagar = 50;
    const tempoPausa = 2000;

    function executarEfeitoMaquinaEscrever() {
        const textoCompleto = titulosParaDigitar[indiceTextoAtual];

        if (estaApagando) {
            elementoTextoMaquina.textContent = textoCompleto.substring(0, indiceCaractereAtual - 1);
            indiceCaractereAtual--;
        } else {
            elementoTextoMaquina.textContent = textoCompleto.substring(0, indiceCaractereAtual + 1);
            indiceCaractereAtual++;
        }

        let tempoProximoPasso = estaApagando ? velocidadeApagar : velocidadeDigitacao;

        if (!estaApagando && indiceCaractereAtual === textoCompleto.length) {
            tempoProximoPasso = tempoPausa;
            estaApagando = true;
        } else if (estaApagando && indiceCaractereAtual === 0) {
            estaApagando = false;
            indiceTextoAtual = (indiceTextoAtual + 1) % titulosParaDigitar.length;
            tempoProximoPasso = 500;
        }

        setTimeout(executarEfeitoMaquinaEscrever, tempoProximoPasso);
    }

    executarEfeitoMaquinaEscrever();

    /* ==========================================================================
       4. BOTÃO FLUTUANTE "VOLTAR AO TOPO" E SCROLL ATIVO
       ========================================================================== */
    const botaoTopo = document.getElementById('botao-topo');

    window.addEventListener('scroll', function () {
        // Exibe ou oculta o botão de voltar ao topo
        if (window.scrollY > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }

        // Destaca o link do menu correspondente à seção atual
        const posicoesScroll = window.scrollY + 200;
        const secoes = document.querySelectorAll('section, header');

        secoes.forEach(function (secao) {
            const topoSecao = secao.offsetTop;
            const alturaSecao = secao.offsetHeight;
            const idSecao = secao.getAttribute('id');

            if (posicoesScroll >= topoSecao && posicoesScroll < topoSecao + alturaSecao) {
                linksNavegacao.forEach(function (link) {
                    link.classList.remove('ativo');
                    if (link.getAttribute('href') === '#' + idSecao) {
                        link.classList.add('ativo');
                    }
                });
            }
        });
    });

    botaoTopo.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       5. ANIMAÇÃO DE REVELAÇÃO CONFORME ROLAGEM (SCROLL REVEAL)
       ========================================================================== */
    const elementosParaRevelar = document.querySelectorAll('.revelacao-scroll');

    function verificarRevelacaoAoRolar() {
        const alturaJanela = window.innerHeight;
        const pontoRevelacao = 100;

        elementosParaRevelar.forEach(function (elemento) {
            const topoElemento = elemento.getBoundingClientRect().top;

            if (topoElemento < alturaJanela - pontoRevelacao) {
                elemento.classList.add('ativo');
            }
        });
    }

    window.addEventListener('scroll', verificarRevelacaoAoRolar);
    verificarRevelacaoAoRolar(); // Executa uma vez no carregamento da página

    /* ==========================================================================
       6. ANO DINÂMICO NO RODAPÉ
       ========================================================================== */
    const elementoAnoAtual = document.getElementById('ano-atual');
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }
});