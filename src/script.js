const materiais = [
  {
    titulo: "Apostila Completa - Banco de Dados (MySQL)",
    tipo: "Apostila",
    area: "Informática",
    disciplina: "Banco de Dados",
    professor: "João Carlos",
    instituicao: "Senai São Paulo",
    tamanho: "1.1 MB",
    formato: "PDF",
    data: "12/06/2023",
    tags: ["mysql", "banco de dados"],
    icone: "imag2"
  },
  {
    titulo: "Apostila Completa - Circuitos Elétricos",
    tipo: "Apostila",
    area: "Elétrica",
    disciplina: "Circuitos Elétricos",
    professor: "Ana Costa",
    instituicao: "Senai São Paulo",
    tamanho: "1.5 MB",
    formato: "PDF",
    data: "12/06/2023",
    tags: ["circuitos", "elétrica"],
    icone: "imag2"
  },
  {
    titulo: "Introdução à Programação Python - Módulo 1",
    tipo: "Apostila",
    area: "Informática",
    disciplina: "Programação",
    professor: "Pedro Lima",
    instituicao: "Senai São Paulo",
    tamanho: "1.2 MB",
    formato: "PDF",
    data: "12/06/2023",
    tags: ["python", "programação"],
    icone: "imag2"
  }
];

function exibirMateriais() {
  const container = document.getElementById("materiais");
  container.innerHTML = "";

  materiais.forEach((mat) => {
    const card = document.createElement("div");
    card.className = "card";

    const caminhoIcone = `imagens/icones/${mat.icone}.png`;

    card.innerHTML = `
      <img src="${caminhoIcone}" alt="${mat.icone}" class="card-icon"
           onerror="this.onerror=null;this.src='imagens/icones/default.png';" />
      <h3>${mat.titulo}</h3>
      <p><strong>Tipo:</strong> ${mat.tipo}</p>
      <p><strong>Área:</strong> ${mat.area}</p>
      <p><strong>Disciplina:</strong> ${mat.disciplina}</p>
      <p><strong>Professor:</strong> ${mat.professor}</p>
      <p><strong>Instituição:</strong> ${mat.instituicao}</p>
      <p><strong>Data:</strong> ${mat.data}</p>
      <p><strong>Tamanho:</strong> ${mat.tamanho}</p>
      <p><strong>Formato:</strong> ${mat.formato}</p>
      <p><strong>Tags:</strong> ${mat.tags.join(", ")}</p>
      <button>Visualizar</button>
    `;
    container.appendChild(card);
  });
}

function configurarNavegacao() {
  const container = document.getElementById("materiais");
  const btnAvancar = document.getElementById("avancar");
  const btnVoltar = document.getElementById("voltar");

  if (btnAvancar && btnVoltar && container) {
    btnAvancar.addEventListener("click", () => {
      container.scrollBy({ left: 300, behavior: "smooth" });
    });

    btnVoltar.addEventListener("click", () => {
      container.scrollBy({ left: -300, behavior: "smooth" });
    });
  } else {
    console.error("Botões ou container não encontrados.");
  }
}

// Inicialização
exibirMateriais();
configurarNavegacao();
