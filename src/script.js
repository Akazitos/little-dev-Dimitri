const materiais = [
  {
    titulo: "Apostila Completa - Banco de Dados MySQL",
    tipo: "Apostila",
    area: "Informática",
    disciplina: "Banco de Dados",
    professor: "Profª. Ana Costa",
    data: "2024-03-01",
    tamanho: "8.7MB",
    descricao: "Apostila completa sobre MySQL com exemplos práticos e exercícios resolvidos.",
    tags: ["mysql", "banco-dados", "sql"],
    icone: "imag2"
  },
  {
    titulo: "Apostila Completa - Circuitos Elétricos",
    tipo: "Apostila",
    area: "Eletrônica",
    disciplina: "Circuitos Elétricos",
    professor: "Profª. Maria Santos",
    data: "2024-03-01",
    tamanho: "4.1MB",
    descricao: "Material completo sobre análise de circuitos elétricos com exercícios práticos.",
    tags: ["circuitos", "elétrica", "análise"],
    icone: "imag3"
  },
  {
    titulo: "Introdução à Programação Python - Módulo 1",
    tipo: "Plano de Aula",
    area: "Informática",
    disciplina: "Programação",
    professor: "Prof. João Silva",
    data: "2024-03-15",
    tamanho: "2.5MB",
    descricao: "Conceitos básicos de programação usando Python, variáveis, tipos de dados e estruturas condicionais.",
    tags: ["python", "programação", "básico"],
    icone: "imag4"
  }
];

function exibirMateriais() {
  const container = document.getElementById("materiais");
  container.innerHTML = "";

  materiais.forEach((mat) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="icon">${mat.icone}</span>
      <h3>${mat.titulo}</h3>
      <p><strong>Tipo:</strong> ${mat.tipo}</p>
      <p><strong>Área:</strong> ${mat.area}</p>
      <p><strong>Disciplina:</strong> ${mat.disciplina}</p>
      <p><strong>Professor:</strong> ${mat.professor}</p>
      <p><strong>Data:</strong> ${mat.data}</p>
      <p><strong>Tamanho:</strong> ${mat.tamanho}</p>
      <p>${mat.descricao}</p>
      <p><strong>Tags:</strong> ${mat.tags.join(", ")}</p>
      <button>Visualizar <span class="icon">imag6</span></button>
    `;
    container.appendChild(card);
  });
}

exibirMateriais();
