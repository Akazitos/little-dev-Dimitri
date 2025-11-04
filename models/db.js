// models/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Mude se usar outro usuário
  password: '123456',           // COLOQUE SUA SENHA AQUI (ou deixe '' se não tiver)
  database: 'senai_portal_aulas'
});

connection.connect((err) => {
  if (err) {
    console.error('ERRO AO CONECTAR AO BANCO:', err.message);
    process.exit(1);
  }
  console.log('CONECTADO AO MySQL COM SUCESSO!');
});

module.exports = connection;