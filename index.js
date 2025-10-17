const express = require('express');
const path = require('path');
const app = express();

// Serve arquivos estáticos da pasta src
app.use(express.static(path.join(__dirname, 'src')));

// Rota principal para home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'home.html'));
});

// Inicia o servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
