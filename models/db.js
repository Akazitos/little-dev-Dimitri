// db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1', // CORRIGIDO: Deve ser '127.0.0.1' ou 'localhost' para a maioria das instalações
    user: 'root',
    password: '123456', // CONFIRME sua senha real do MySQL
    database: 'senai_portal_aulas'
});
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('✅ Conectado ao MySQL!');
});
module.exports = connection;