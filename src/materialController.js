// materialController.js
const connection = require('../models/db');
const multer = require('multer'); 

// --- Configuração do Multer (Armazenamento em Memória para LONGBLOB) ---
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Limite de 50MB
}).single('arquivo'); 

// Função de Rota para Obter Materiais
exports.getMateriais = (req, res) => {
    const query = `
        SELECT 
            m.id_material, m.titulo, m.tipo_material AS tipo, m.data_upload AS data,
            p.nome AS professor, 
            a.nome AS area, 
            d.nome AS disciplina,
            GROUP_CONCAT(t.nome SEPARATOR ', ') AS tags_str,
            m.nome_arquivo, m.tipo_mime
        FROM materiais m
        JOIN professores p ON m.id_professor = p.id_professor
        JOIN areas a ON m.id_area = a.id_area
        JOIN disciplinas d ON m.id_disciplina = d.id_disciplina
        LEFT JOIN materiais_tags mt ON m.id_material = mt.id_material
        LEFT JOIN tags t ON mt.id_tag = t.id_tag
        GROUP BY m.id_material
        ORDER BY m.data_upload DESC;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar materiais:', err);
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar materiais.' });
        }
        
        // Processar resultados para o formato esperado pelo frontend (script.js)
        const materiaisFormatados = results.map(row => ({
            id_material: row.id_material,  
            titulo: row.titulo,
            tipo: row.tipo,
            area: row.area,
            disciplina: row.disciplina,
            professor: row.professor,
            instituicao: 'SENAI',
            tamanho: 'N/A',
            formato: row.nome_arquivo ? row.nome_arquivo.split('.').pop().toUpperCase() : 'N/A',
            data: new Date(row.data).toLocaleDateString('pt-BR'),
            tags: row.tags_str ? row.tags_str.split(', ') : [],
            icone: 'imag2'
        }));
        res.json(materiaisFormatados);
    });
};

/// materialController.js (APENAS A FUNÇÃO uploadMaterial)

exports.uploadMaterial = (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.error('Erro no upload:', err);
            return res.status(500).json({ message: 'Erro ao processar o upload.' });
        }

        const { titulo, tipo_material, area, disciplina, data, professor, tags, descricao } = req.body;
        const arquivo = req.file;

        if (!arquivo) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        }

        const tagsArray = tags ? tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t) : [];

        try {
            const promiseConn = connection.promise();

            // 1. Professor
            let [profRows] = await promiseConn.query('SELECT id_professor FROM professores WHERE nome = ?', [professor]);
            let idProfessor;
            if (profRows.length === 0) {
                const [result] = await promiseConn.query('INSERT INTO professores (nome) VALUES (?)', [professor]);
                idProfessor = result.insertId;
            } else {
                idProfessor = profRows[0].id_professor;
            }

            // 2. Área
            let [areaRows] = await promiseConn.query('SELECT id_area FROM areas WHERE nome = ?', [area]);
            let idArea;
            if (areaRows.length === 0) {
                const [result] = await promiseConn.query('INSERT INTO areas (nome) VALUES (?)', [area]);
                idArea = result.insertId;
            } else {
                idArea = areaRows[0].id_area;
            }

            // 3. Disciplina
            let [discRows] = await promiseConn.query('SELECT id_disciplina FROM disciplinas WHERE nome = ? AND id_area = ?', [disciplina, idArea]);
            let idDisciplina;
            if (discRows.length === 0) {
                const [result] = await promiseConn.query('INSERT INTO disciplinas (nome, id_area) VALUES (?, ?)', [disciplina, idArea]);
                idDisciplina = result.insertId;
            } else {
                idDisciplina = discRows[0].id_disciplina;
            }

            // 4. Inserir Material
            const [matResult] = await promiseConn.query(`
                INSERT INTO materiais 
                (titulo, tipo_material, descricao, data_upload, nome_arquivo, tipo_mime, dados, id_professor, id_area, id_disciplina)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                titulo, tipo_material, descricao, data || null, 
                arquivo.originalname, arquivo.mimetype, arquivo.buffer, 
                idProfessor, idArea, idDisciplina
            ]);

            const idMaterial = matResult.insertId;

            // 5. Inserir Tags
            for (const tagName of tagsArray) {
                let [tagRows] = await promiseConn.query('SELECT id_tag FROM tags WHERE nome = ?', [tagName]);
                let idTag;
                if (tagRows.length === 0) {
                    const [result] = await promiseConn.query('INSERT INTO tags (nome) VALUES (?)', [tagName]);
                    idTag = result.insertId;
                } else {
                    idTag = tagRows[0].id_tag;
                }
                await promiseConn.query('INSERT INTO materiais_tags (id_material, id_tag) VALUES (?, ?)', [idMaterial, idTag]);
            }

            res.status(201).json({ message: 'Material enviado com sucesso!', id: idMaterial });

        } catch (dbError) {
            console.error('Erro no banco:', dbError);
            res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
        }
    });
};