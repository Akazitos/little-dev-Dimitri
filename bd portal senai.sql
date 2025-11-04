CREATE DATABASE senai_portal_aulas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE senai_portal_aulas;

CREATE TABLE professores (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE areas (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE disciplinas (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_area INT,
    FOREIGN KEY (id_area) REFERENCES areas(id_area)
);

CREATE TABLE materiais (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo_material ENUM('Apostila', 'Plano de Aula', 'Material Didático', 'Ferramenta IA') NOT NULL,
    descricao TEXT,
    data_upload DATE,
    nome_arquivo VARCHAR(255),
    tipo_mime VARCHAR(50) NOT NULL,
    dados LONGBLOB NOT NULL,
    id_professor INT,
    id_area INT,
    id_disciplina INT,
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor),
    FOREIGN KEY (id_area) REFERENCES areas(id_area),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);

CREATE TABLE tags (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE materiais_tags (
    id_material INT,
    id_tag INT,
    PRIMARY KEY (id_material, id_tag),
    FOREIGN KEY (id_material) REFERENCES materiais(id_material) ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tags(id_tag) ON DELETE CASCADE
);

INSERT INTO professores (nome) VALUES ('Professor Padrão');

INSERT INTO areas (nome) VALUES ('Informática'), ('Elétrica');

INSERT INTO disciplinas (nome, id_area) VALUES 
('Banco de Dados', 1),
('Circuitos Elétricos', 2);

