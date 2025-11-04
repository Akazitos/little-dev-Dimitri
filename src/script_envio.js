// script_envio.js

document.addEventListener('DOMContentLoaded', () => {
    // Aciona o input de arquivo ao clicar no botão
    document.querySelector('.btn-selecionar').addEventListener('click', function() {
        document.getElementById('arquivo').click();
    });

    const form = document.getElementById('formEnvio');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const btnFinalizar = document.querySelector('.btn-finalizar-upload');
        btnFinalizar.disabled = true;
        btnFinalizar.textContent = 'Enviando...';
        
        // Coleta todos os dados do formulário, incluindo o arquivo
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/materiais/enviar', {
                method: 'POST',
                body: formData // FormData é usado para enviar arquivos (multipart/form-data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao enviar material.');
            }

            const data = await response.json();
            alert(`✅ Sucesso! ${data.message}`);
            
            // Redireciona ou limpa o formulário após o sucesso
            window.location.href = 'home.html'; 

        } catch (error) {
            console.error('Erro de Envio:', error);
            alert(`❌ Falha no envio: ${error.message}`);
        } finally {
            btnFinalizar.disabled = false;
            btnFinalizar.innerHTML = '<img src="imagens/icones/upload-white.png" alt="Upload"> Enviar Material';
        }
    });
});