// index.js (Corrigido)
// Assumindo que db.js está na mesma pasta (ou altere o caminho se necessário)
const connection = require('./db');
const express = require('express');
const path = require('path');
const materialController = require('./materialController'); // Importa o controlador

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

// Inicia o servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});