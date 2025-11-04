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

function exibirMateriais(lista = materiais) {
  const container = document.getElementById("materiais");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = '<p style="margin: 20px; font-size: 1.2em;">Nenhum material encontrado com os critérios de busca/filtro.</p>';
    return;
  }

  lista.forEach(mat => {
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
      <p><strong>Instituição:</strong> ${mat.instituicao || 'SENAI'}</p>
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
  }
}

function configurarBusca() {
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", event => {
    const termoBusca = event.target.value.toLowerCase().trim();

    const resultados = materiais.filter(mat =>
      mat.titulo.toLowerCase().includes(termoBusca) ||
      mat.tags.some(tag => tag.toLowerCase().includes(termoBusca))
    );

    exibirMateriais(resultados);
  });
}

const modal = document.getElementById("modalFiltro");
const btnFiltro = document.getElementById("btnBuscarFiltro");
const spanClose = document.getElementsByClassName("close-button")[0];
const btnAplicarFiltro = document.getElementById("aplicarFiltro");

function popularFiltros() {
  const tipos = [...new Set(materiais.map(m => m.tipo))];
  const areas = [...new Set(materiais.map(m => m.area))];
  const disciplinas = [...new Set(materiais.map(m => m.disciplina))];

  const selectTipo = document.getElementById("filtroTipo");
  const selectArea = document.getElementById("filtroArea");
  const selectDisciplina = document.getElementById("filtroDisciplina");

  [selectTipo, selectArea, selectDisciplina].forEach(select => {
    select.innerHTML = '<option value="">Todos</option>';
  });

  tipos.forEach(t => selectTipo.innerHTML += `<option value="${t}">${t}</option>`);
  areas.forEach(a => selectArea.innerHTML += `<option value="${a}">${a}</option>`);
  disciplinas.forEach(d => selectDisciplina.innerHTML += `<option value="${d}">${d}</option>`);
}

function aplicarFiltros() {
  const tags = document.getElementById("filtroTags").value.toLowerCase().split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
  const tipo = document.getElementById("filtroTipo").value;
  const area = document.getElementById("filtroArea").value;
  const disciplina = document.getElementById("filtroDisciplina").value;

  const resultadosFiltrados = materiais.filter(mat => {
    if (tipo && mat.tipo !== tipo) return false;
    if (area && mat.area !== area) return false;
    if (disciplina && mat.disciplina !== disciplina) return false;

    if (tags.length > 0) {
      const materialTags = mat.tags.map(t => t.toLowerCase());
      const match = tags.every(t => materialTags.includes(t));
      if (!match) return false;
    }
    return true;
  });

  exibirMateriais(resultadosFiltrados);
  modal.style.display = "none";
}

function configurarModal() {
  btnFiltro.onclick = function() {
    popularFiltros();
    modal.style.display = "block";
  };

  spanClose.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  btnAplicarFiltro.onclick = aplicarFiltros;
}

function configurarEnvio() {
  const btnEnviar = document.getElementById("btnEnviarMaterial");
  const btnFooterUpload = document.getElementById("btnFooterUpload");

  const irParaEnvio = () => {
    window.location.href = "enviar_material.html";
  };

  if (btnEnviar) btnEnviar.addEventListener("click", irParaEnvio);
  if (btnFooterUpload) btnFooterUpload.addEventListener("click", irParaEnvio);
}

exibirMateriais();
configurarNavegacao();
configurarBusca();
configurarModal();
configurarEnvio();
