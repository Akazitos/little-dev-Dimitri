const materiais = [
    {
      titulo: "Apostila Completa - Banco de Dados",
      tipo: "PDF",
      area: "Informática",
      disciplina: "Banco de Dados",
      professor: "Prof. João",
      data: "2025-10-08",
      tamanho: "2.5MB",
      tags: ["MySQL", "Banco de Dados"],
      descricao: "Conteúdo completo sobre MySQL."
    },
    {
      titulo: "Introdução à Programação com Python",
      tipo: "PDF",
      area: "Informática",
      disciplina: "Programação",
      professor: "Prof. Ana",
      data: "2025-10-07",
      tamanho: "3MB",
      tags: ["Python", "Lógica"],
      descricao: "Material introdutório sobre Python."
    }
  ];
  
  function exibirMateriais() {
    const container = document.getElementById("materiais");
    container.innerHTML = "";
  
    materiais.forEach((mat) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${mat.titulo}</h3>
        <p><strong>Tipo:</strong> ${mat.tipo}</p>
        <p><strong>Área:</strong> ${mat.area}</p>
        <p><strong>Disciplina:</strong> ${mat.disciplina}</p>
        <p><strong>Professor:</strong> ${mat.professor}</p>
        <p><strong>Data:</strong> ${mat.data}</p>
        <p><strong>Tamanho:</strong> ${mat.tamanho}</p>
        <p><strong>Tags:</strong> ${mat.tags.join(", ")}</p>
        <p>${mat.descricao}</p>
        <button>Visualizar</button>
      `;
      container.appendChild(card);
    });
  }
  
  function irParaEnvio() {
    window.location.href = "envio.html"; // ou a rota que você definir
  }
  
  function irParaFerramentas() {
    window.location.href = "ferramentas.html";
  }
  
  function irParaHome() {
    window.location.href = "index.html";
  }
  
  function filtrarMateriais() {
    alert("Função de filtro ainda será implementada!");
  }
  
  exibirMateriais();
  