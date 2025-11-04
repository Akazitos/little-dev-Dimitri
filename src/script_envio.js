// src/script_envio.js
document.addEventListener('DOMContentLoaded', () => {
    // Botão "Selecionar Arquivos"
    const btnSelecionar = document.querySelector('.btn-selecionar');
    const inputFile = document.getElementById('arquivo');
  
    if (btnSelecionar && inputFile) {
      btnSelecionar.addEventListener('click', () => {
        inputFile.click();
      });
    }
  
    // Formulário
    const form = document.getElementById('formEnvio');
    const btnSubmit = document.querySelector('.btn-finalizar-upload');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = 'Enviando...';
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch('/api/materiais/enviar', {
          method: 'POST',
          body: formData
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || 'Erro ao enviar material');
        }
  
        alert('Material enviado com sucesso!');
        window.location.href = 'home.html';
  
      } catch (error) {
        console.error('Erro no upload:', error);
        alert('Falha ao enviar: ' + error.message);
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<img src="imagens/icones/upload-white.png" alt="Upload"> Enviar Material';
      }
    });
  });