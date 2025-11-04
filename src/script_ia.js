// script_ia.js - Lógica para carregar e filtrar os cards de IA

const ferramentasIA = [
    {
        nome: "ChatGPT",
        subtitulo: "Geração de Conteúdo",
        descricao: "Assistente de IA para criação de planos de aula, exercícios, explicações didáticas e correção de textos. Ideal para gerar conteúdo educacional personalizado.",
        link: "https://chatgpt.com", 
        icone: "imagens/icones/microchip.png"
    },
    {
        nome: "Claude AI",
        subtitulo: "Análise e Redação",
        descricao: "IA especializada em análise e criação de textos longos, ideal para desenvolver materiais didáticos complexos e planos de curso detalhados.",
        link: "https://claude.ai",
        icone: "imagens/icones/microchip.png"
    },
    {
        nome: "Gemini (Google)",
        subtitulo: "Busca e Conteúdo",
        descricao: "Modelo multimodal do Google, útil para pesquisas avançadas e resumir documentos ou gerar código.",
        link: "https://gemini.google.com/",
        icone: "imagens/icones/microchip.png"
    },
    {
        nome: "Gamma App",
        subtitulo: "Apresentações",
        descricao: "Criação de apresentações e materiais visuais com IA. Ideal para criar slides de aula atraentes e materiais de apoio visual.",
        link: "https://gamma.app",
        icone: "imagens/icones/microchip.png"
    },
];

function criarCardIA(ferramenta) {
    const card = document.createElement("div");
    card.className = "ia-card";

    card.innerHTML = `
        <div class="ia-card-header">
            <img src="${ferramenta.icone}" alt="Ícone ${ferramenta.nome}" style="width: 30px; height: 30px;">
            <div>
                <h4>${ferramenta.nome}</h4>
                <p>${ferramenta.subtitulo}</p>
            </div>
        </div>
        <p>${ferramenta.descricao}</p>
        <button onclick="window.open('${ferramenta.link}', '_blank')">
            <img src="imagens/icones/link.png" alt="Acessar">
            acessar ferramenta
        </button>
    `;

    return card;
}

/**
 * Carrega e exibe os cards de IA, aplicando um filtro de busca se fornecido.
 * @param {string} termoBusca - O termo a ser buscado nas propriedades do card.
 */
function carregarFerramentas(termoBusca = '') {
    const container = document.getElementById("ferramentas-container");
    container.innerHTML = ''; // Limpa o conteúdo existente

    const termo = termoBusca.toLowerCase().trim();

    // 1. Filtrar as ferramentas com base no termo de busca
    const ferramentasFiltradas = ferramentasIA.filter(ferramenta => {
        if (!termo) return true; // Se o termo estiver vazio, mostra todos

        // Verifica se o termo está no nome, subtítulo ou descrição (case-insensitive)
        return ferramenta.nome.toLowerCase().includes(termo) ||
               ferramenta.subtitulo.toLowerCase().includes(termo) ||
               ferramenta.descricao.toLowerCase().includes(termo);
    });

    // 2. Exibir as ferramentas filtradas ou uma mensagem se nenhuma for encontrada
    if (ferramentasFiltradas.length > 0) {
        ferramentasFiltradas.forEach(ferramenta => {
            container.appendChild(criarCardIA(ferramenta));
        });
    } else {
        container.innerHTML = '<p class="mensagem-vazio">Nenhuma ferramenta de IA encontrada com o termo: "' + termoBusca + '".</p>';
    }
}

// 3. Adicionar Event Listeners para a funcionalidade de busca
document.addEventListener('DOMContentLoaded', () => {
    // Carrega todos os cards inicialmente
    carregarFerramentas(); 

    const searchBar = document.getElementById('searchBar');
    const btnSearchIcon = document.getElementById('btnSearchIcon');
    
    // Certifique-se de que a searchBar existe
    if (searchBar) {
        // Ação de busca ao pressionar 'Enter' na barra de pesquisa
        searchBar.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const termo = searchBar.value;
                carregarFerramentas(termo);
            }
        });
    }
    
    // Ação de busca ao clicar no botão, se ele existir
    if (btnSearchIcon) {
        btnSearchIcon.addEventListener('click', () => {
            const termo = searchBar.value;
            carregarFerramentas(termo);
        });
    }
});