// index.js (Corrigido)
// Assumindo que db.js está na mesma pasta (ou altere o caminho se necessário)
const connection = require('./models/db');
const express = require('express');
const path = require('path');
const materialController = require('./src/materialController'); // Importa o controlador

const app = express();

// Middlewares necessários para processar JSON e dados de formulário (incluindo upload)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta src
app.use(express.static(path.join(__dirname, 'src')));

// Rota da API para OBTER materiais (Busca do frontend)
app.get('/api/materiais', materialController.getMateriais);

// Rota da API para ENVIAR materiais (Upload)
app.post('/api/materiais/enviar', materialController.uploadMaterial);

// Rota principal para home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'home.html'));
});
// Rota para baixar arquivo
app.get('/api/materiais/:id/download', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT nome_arquivo, tipo_mime, dados FROM materiais WHERE id_material = ?';

  connection.query(query, [id], (err, results) => {
      if (err || results.length === 0) {
          return res.status(404).send('Arquivo não encontrado.');
      }

      const { nome_arquivo, tipo_mime, dados } = results[0];
      res.setHeader('Content-Type', tipo_mime);
      res.setHeader('Content-Disposition', `attachment; filename="${nome_arquivo}"`);
      res.send(dados);
  });
});

// Inicia o servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});