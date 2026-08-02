/**
 * ============================================================================
 * SWIFTSTORE - SCRIPT PRINCIPAL COMPLETO (VERSÃO FINAL - ESTÁTICA)
 * Projeto: Mini-ecommerce de Hardware (ADS)
 * ============================================================================
 */

// ==========================================
// 1. BANCO DE DADOS LOCAL (Fallback / Histórico)
// ==========================================
const bancoDeProdutos = [
    { nome: "B550M ASUS TUF GAMING Wifi-plus II", categoria: "Placa mãe", marca: "ASUS", precoStr: "R$ 900,00", imagem: "img/foto_B550M_ASUS.jpg" },
    { nome: "Monitor LG Ultragear 27p", categoria: "Monitor", marca: "LG", precoStr: "R$ 650,00", imagem: "img/foto_LG_ULTRAGEAR.jpg" },
    { nome: "SSD Lexar 512GB", categoria: "SSD", marca: "Lexar", precoStr: "R$ 300,00", imagem: "img/foto_SSD_LEXAR.jpg" },
    { nome: "Gabinete Aquário Wideload Pro Redragon", categoria: "Gabinete", marca: "Redragon", precoStr: "R$ 350,00", imagem: "img/foto_WIDELOAD_PRO.jpg" },
    { nome: "Ryzen 5 5500 6 núcleos / 12 threads", categoria: "CPU", marca: "AMD", precoStr: "R$ 500,00", imagem: "img/foto_Ryzen_5500.jpg" },
    { nome: "Placa de vídeo RX 7600 8GB - XFX QUIK 308", categoria: "GPU", marca: "XFX", precoStr: "R$ 1350,00", imagem: "img/foto_RX_7600.jpg" },
    { nome: "Memória RAM 8GBx2 - Asgard Loki", categoria: "DIMM", marca: "Asgard", precoStr: "R$ 195,19", imagem: "img/foto_RAM_LOKI.jpg" },
    { nome: "MSI MAG 650W", categoria: "Fonte", marca: "MSI", precoStr: "R$ 310,00", imagem: "img/foto_MSI_MAG.jpg" },
    { nome: "Mesa de madeira 1,50mx70cm", categoria: "Mesa", marca: "Diversos", precoStr: "R$ 300,00", imagem: "img/foto_MESA.jpg" },
    { nome: "PC GAMER T-GAMER Executor AMD Ryzen 7 5700G / 16GB / SSD 480GB", categoria: "PC Montado", marca: "T-Gamer", precoStr: "R$ 3000,00", imagem: "img/foto_PC%20MONTADO1.jpg" },
    { nome: "PC Gamer Ryzen 5 5600gt, 16gb, A520m, SSD 480GB", categoria: "PC Montado", marca: "Custom", precoStr: "R$ 3800,00", imagem: "img/foto_PC%20MONTADO2.jpg" },
    { nome: "PC Gamer Ryzen 5 5500, RTX 4060, 16gb, SSD Nvme 500gb", categoria: "PC Montado", marca: "Custom", precoStr: "R$ 5715,49", imagem: "img/foto_PC%20MONTADO3.jpg" },
    { nome: "Mchose V9 PRO", categoria: "Headfone", marca: "Mchose", precoStr: "R$ 240,00", imagem: "img/foto_MCHOSE_V9_PRO.jpg" },
    { nome: "Mouse Attack Shark X11", categoria: "Mouse", marca: "Attack Shark", precoStr: "R$ 79,00", imagem: "img/foto_ATTACK_SHARK_X11.jpg" },
    { nome: "Husky Nomadic - Teclado", categoria: "Teclado", marca: "Husky", precoStr: "R$ 320,00", imagem: "img/foto_HUSKY_NOMADIC.jpg" },
    { nome: "Cadeira Gamer", categoria: "Cadeira", marca: "Tio Zé", precoStr: "R$ 632,00", imagem: "img/foto_CADEIRA.jpg" }
];

// ==========================================
// 2. INICIALIZAÇÃO E ESCUTA DA PÁGINA (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // A) VITRINE CLIENT-SIDE E FILTROS
    const vitrine = document.getElementById('vitrine-produtos-js');
    const selectFiltro = document.getElementById('filtro-categoria');

    if (vitrine) {
        const parametrosURL = new URLSearchParams(window.location.search);
        const marcaFiltrada = parametrosURL.get('marca');

        if (marcaFiltrada) {
            const produtosDaMarca = bancoDeProdutos.filter(p => p.marca === marcaFiltrada);
            renderizarVitrine(produtosDaMarca);
            vitrine.insertAdjacentHTML('beforebegin', `<h3 style="text-align:center; color:#2b78e4; margin-bottom: 20px;">Mostrando resultados para a marca: ${marcaFiltrada}</h3>`);
        } else {
            renderizarVitrine(bancoDeProdutos);
        }

        // B) LÓGICA DO BOTÃO DE FILTRAR
        const btnFiltrar = document.getElementById('btn-filtrar');
        
        if (selectFiltro && btnFiltrar) {
            btnFiltrar.addEventListener('click', (e) => {
                e.preventDefault(); // Evita recarregar a página pelo form
                const categoriaEscolhida = selectFiltro.value;
                
                if (categoriaEscolhida === "Todos") {
                    window.location.href = 'produtos.html'; // Corrigido para .html
                } else {
                    window.location.href = `produtos.html?categoria=${encodeURIComponent(categoriaEscolhida)}`; // Corrigido para .html
                }
            });
        }
    }

    // B) BOTÕES ESTÁTICOS (Página Inicial - index.html)
    const botoesCompraEstaticos = document.querySelectorAll('.btn-carrinho');
    botoesCompraEstaticos.forEach(botao => {
        if (!botao.hasAttribute('onclick')) {
            botao.addEventListener('click', (event) => {
                event.preventDefault();
                const card = botao.closest('.card-deitado, .card-vertical, li, ul');
                if (card) {
                    const elNome = card.querySelector('strong');
                    const elPreco = card.querySelector('.valor-destaque');
                    const elImagem = card.querySelector('img');

                    if (elNome && elPreco && elImagem) {
                        const nome = elNome.innerText.trim();
                        const preco = elPreco.innerText.trim().replace('Valor: ', '');
                        const imagem = elImagem.getAttribute('src'); // AGORA PEGA A IMAGEM!

                        adicionarAoCarrinho(Date.now(), nome, preco, imagem); // Passando a imagem
                    }
                }
            });
        }
    });

    // C) INTERFACE DO CARRINHO (carrinho.html)
    const containerItens = document.getElementById('container-itens');
    if (containerItens) {
        renderizarCarrinho();
    }

    // D) CRONÔMETRO DE URGÊNCIA (carrinho.html)
    const displayCronometro = document.getElementById('tempo-restante');
    if (displayCronometro) {
        iniciarCronometro(172, displayCronometro);
    }

    // E) MÁSCARA TELEFÓNICA E DE FORMULÁRIO (contato.html)
    const inputTel = document.getElementById('tel');
    if (inputTel) {
        inputTel.addEventListener('input', (e) => {
            let numero = e.target.value.replace(/\D/g, ''); 
            if (numero.length > 11) numero = numero.slice(0, 11); 
            if (numero.length > 2) numero = `(${numero.slice(0,2)}) ${numero.slice(2)}`;
            if (numero.length > 10) numero = `${numero.slice(0,10)}-${numero.slice(10)}`;
            e.target.value = numero;
        });
    }

    // F) MOSTRAR / OCULTAR SENHA
    const btnMostrarSenha = document.getElementById('btn-mostrar-senha');
    const inputSenha = document.getElementById('senha');
    const iconeOlho = document.getElementById('icone-olho');

    if (btnMostrarSenha && inputSenha && iconeOlho) {
        btnMostrarSenha.addEventListener('click', () => {
            if (inputSenha.type === 'password') {
                inputSenha.type = 'text';
                iconeOlho.textContent = 'visibility_off'; 
            } else {
                inputSenha.type = 'password';
                iconeOlho.textContent = 'visibility'; 
            }
        });
    }
});

// ==========================================
// 3. FUNÇÕES GLOBAIS DO SISTEMA
// ==========================================

function buscarPorMarca(marca) {
    window.location.href = `produtos.html?marca=${encodeURIComponent(marca)}`; // Corrigido para .html
}

function adicionarAoCarrinho(id, nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Salvamos a imagem agora para que o carrinho possa exibi-la
    carrinho.push({ id, nome, preco, imagem });
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    mostrarNotificacao(`"${nome}" foi adicionado ao seu carrinho!`, 'sucesso');
}

function renderizarCarrinho() {
    const container = document.getElementById('container-itens');
    const resumoPedido = document.getElementById('resumo-pedido');
    const bannerCronometro = document.querySelector('.banner-cronometro');
    
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (itens.length === 0) {
        if (bannerCronometro) bannerCronometro.style.display = 'none';
        if (resumoPedido) resumoPedido.style.display = 'none';
        container.innerHTML = `
            <div style="text-align:center; padding: 50px; width: 100%;">
                <h3>Seu carrinho está vazio 🛒</h3><br>
                <a href="produtos.html" style="color: #ff6500; font-weight: bold; text-decoration: none;">Ir às compras</a>
            </div>`; // Corrigido para .html
        return;
    }

    if (bannerCronometro) bannerCronometro.style.display = 'flex';
    if (resumoPedido) resumoPedido.style.display = 'flex';

    let htmlFinal = "";
    let somaTotal = 0;

    itens.forEach((item, index) => {
        let precoLimpo = item.preco.replace(/[^0-9,]/g, '').replace(',', '.');
        somaTotal += parseFloat(precoLimpo) || 0;

        htmlFinal += `
            <div class="item-kabum">
                <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='img/placeholder.jpg'">
                <div class="item-kabum-info">
                    <span style="font-size: 11px; color: #7f858d;">Vendido e entregue por: <strong>SwiftStore</strong></span>
                    <h4>${item.nome}</h4>
                </div>
                <div class="item-kabum-preco">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 15px; margin-bottom: 10px;">
                        <button onclick="removerItem(${index})" title="Remover item" style="background: none; border: none; color: #e11c1b; cursor: pointer; display: flex;">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <div style="border: 1px solid #e5e5e5; border-radius: 4px; padding: 2px 12px; font-weight: bold; color: #42464d;">1</div>
                    </div>
                    <div style="font-size: 11px; color: #7f858d;">Preço à vista no PIX:</div>
                    <strong>${item.preco}</strong>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlFinal;

    const totalFormatado = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const elProd = document.getElementById('valor-produtos');
    const elTot = document.getElementById('valor-total-final');
    
    if (elProd) elProd.innerText = totalFormatado;
    if (elTot) elTot.innerText = totalFormatado;
}

function removerItem(index) {
    let itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    itens.splice(index, 1); 
    localStorage.setItem('carrinho', JSON.stringify(itens));
    renderizarCarrinho(); 
}

function iniciarCronometro(minutos, display) {
    let segundosTotais = minutos * 60;
    const contador = setInterval(() => {
        const h = Math.floor(segundosTotais / 3600);
        const m = Math.floor((segundosTotais % 3600) / 60);
        const s = segundosTotais % 60;
        
        display.textContent = `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
        
        if (--segundosTotais < 0) {
            clearInterval(contador);
            display.textContent = "00h 00m 00s";
            display.style.color = "red";
        }
    }, 1000);
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    let toast = document.getElementById('toast-msg');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        document.body.appendChild(toast);
    }
    
    toast.className = `toast-notificacao toast-${tipo}`;
    toast.innerText = mensagem;
    
    setTimeout(() => {
        toast.classList.add('mostrar');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 3000);
}

function renderizarVitrine(produtos) {
    const vitrineLocal = document.getElementById('vitrine-produtos-js');
    if (!vitrineLocal) return;
    
    vitrineLocal.innerHTML = ""; 

    if (produtos.length === 0) {
        vitrineLocal.innerHTML = "<p style='padding: 20px; text-align: center;'>Nenhum produto encontrado.</p>";
        return;
    }

    produtos.forEach((produto, index) => {
        vitrineLocal.innerHTML += `
            <ul class="card-deitado">
                <img src="${produto.imagem}" alt="${produto.nome}" class="img-deitada">
                <div class="textos-deitados">
                    <li><strong>${produto.nome}</strong></li>
                    <li>Categoria: ${produto.categoria} | Marca: <strong>${produto.marca}</strong></li>
                    <li class="valor-destaque">Valor: ${produto.precoStr}</li>
                </div>
                <div class="acoes-deitadas">
                    <!-- AGORA O BOTÃO DINÂMICO TEM A FUNÇÃO ONCLICK! -->
                    <button class="btn-carrinho" title="Adicionar ao carrinho" onclick="adicionarAoCarrinho(${index + 1000}, '${produto.nome}', '${produto.precoStr}', '${produto.imagem}')">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
            </ul>
        `;
    });
}

// ==========================================
// 4. FINALIZAÇÃO DE COMPRA (Simulação)
// ==========================================
function finalizarCompra() {
    let itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (itens.length === 0) {
        alert("O seu carrinho está vazio! Adicione produtos antes de continuar.");
        return;
    }

    let numeroPedido = Math.floor(Math.random() * 1000000);
    alert(`🎉 Compra finalizada com sucesso!\n\nO número do seu pedido é: #${numeroPedido}\nObrigado por escolher a SwiftStore!`);

    localStorage.removeItem('carrinho');
    window.location.href = 'index.html';
}