CREATE DATABASE senai_portal_aulas character set utf8mb4 collate utf8mb4_unicode_ci;
USE senai_portal_aulas;

-- Professores
CREATE TABLE professores (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Áreas
CREATE TABLE areas (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Disciplinas
CREATE TABLE disciplinas (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_area INT,
    FOREIGN KEY (id_area) REFERENCES areas(id_area)
);

-- Materiais (agora com campo para armazenar arquivos diretamente)
CREATE TABLE materiais (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo_material ENUM('Apostila', 'Plano de Aula', 'Material Didático', 'Ferramenta IA') NOT NULL,
    descricao TEXT,
    data_upload DATE,
    nome_arquivo VARCHAR(255),   -- Nome do arquivo (ex: mysql_apostila.pdf)
    tipo_mime VARCHAR(50) NOT NULL,
    dados LONGBLOB NOT NULL,
    id_professor INT,
    id_area INT,
    id_disciplina INT,
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor),
    FOREIGN KEY (id_area) REFERENCES areas(id_area),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);

-- Tags
CREATE TABLE tags (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

-- Relação Materiais <-> Tags
CREATE TABLE materiais_tags (
    id_material INT,
    id_tag INT,
    PRIMARY KEY (id_material, id_tag),
    FOREIGN KEY (id_material) REFERENCES materiais(id_material) ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tags(id_tag) ON DELETE CASCADE
);