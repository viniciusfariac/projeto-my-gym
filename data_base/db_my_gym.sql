CREATE DATABASE IF NOT EXISTS my_gym;

USE my_gym;

CREATE TABLE IF NOT EXISTS `user` (
	id_user INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_user)
);

CREATE TABLE IF NOT EXISTS muscle_group (
	id_muscle INT NOT NULL AUTO_INCREMENT,
    name_group VARCHAR(100),
    
    PRIMARY KEY(id_muscle)
);


CREATE TABLE IF NOT EXISTS exercise(
	id_exercise INT NOT NULL AUTO_INCREMENT,
    url_image VARCHAR(255),
    exercise_name VARCHAR(255) NOT NULL,
    muscle_id INT NOT NULL,
    description VARCHAR(255),
    
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_exercise),
    CONSTRAINT fk_muscle_group FOREIGN KEY (muscle_id) REFERENCES muscle_group(id_muscle)
);

CREATE TABLE IF NOT EXISTS training (
	id_training INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name_training VARCHAR(30) NOT NULL,
    type_training VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    suggest_day VARCHAR(30) NOT NULL,
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_training),
    
	CONSTRAINT fk_user_training FOREIGN KEY (user_id) REFERENCES user(id_user),
    
    CONSTRAINT ckc_status CHECK (status IN ('Ativo', 'Inativo')), 
    CONSTRAINT ckc_day CHECK (suggest_day IN ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'))
);

CREATE TABLE IF NOT EXISTS training_exercise (
	id_training_exercise INT NOT NULL AUTO_INCREMENT,
	exercise_id INT NOT NULL,
    training_id INT NOT NULL,
    set_exercise INT NOT NULL,
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_training_exercise),
	
    CONSTRAINT fk_set_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id_exercise),
	CONSTRAINT fk_training FOREIGN KEY (training_id) REFERENCES training(id_training)
);

CREATE TABLE IF NOT EXISTS training_log (
	id_training_log INT NOT NULL AUTO_INCREMENT,
	training_exercise_id INT NOT NULL, 
    training_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_training_log)
);

CREATE TABLE IF NOT EXISTS training_set (
	id_set INT NOT NULL AUTO_INCREMENT,
    set_order INT NOT NULL,
    training_log_id INT NOT NULL,
    rep INT NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    type_set VARCHAR(50),
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_set, training_log_id, set_order),
    
	CONSTRAINT fk_training_log FOREIGN KEY (training_log_id) REFERENCES training_log(id_training_log),
	CONSTRAINT ckc_type CHECK (type_set IN ('Falha', 'Aquecimento', 'Trabalho', 'Top-set'))
);


-- INSERTS PARA TESTE

INSERT INTO `user` (username, email, user_password) VALUES
('vinicius', 'vinicius@gmail.com', '#St09M2kL'),
('joao', 'joao@gmail.com', '#St09M2kL'),
('maria', 'maria@gmail.com', '#St09M2kL'),
('carlos', 'carlos@gmail.com', '#St09M2kL'),
('ana', 'ana@gmail.com', '#St09M2kL');


INSERT INTO muscle_group (name_group) VALUES
('Peito'),
('Costas'),
('Bíceps'),
('Tríceps'),
('Quadríceps'),
('Posterior de Coxa'),
('Glúteos'),
('Panturrilha'),
('Ombro'),
('Abdômen'),
('Adutor'),
('Abdutor'),
('Antebraço');

INSERT INTO exercise (exercise_name, muscle_id, description) VALUES
-- PEITO (1)
('Supino reto com barra', 1, 'Clássico para desenvolvimento do peitoral'),
('Supino inclinado com barra', 1, 'Foco na parte superior do peito'),
('Crucifixo com halteres', 1, 'Alongamento e contração do peitoral'),
('Cross over no cabo', 1, 'Isolamento do peitoral'),
-- COSTAS (2)
('Barra fixa', 2, 'Exercício composto para dorsais'),
('Pulley frente', 2, 'Puxada na frente na polia'),
('Remada curvada', 2, 'Remada com barra'),
('Remada unilateral com halter', 2, 'Foco em cada lado das costas'),
-- BÍCEPS (3)
('Rosca direta barra', 3, 'Exercício básico de bíceps'),
('Rosca martelo', 3, 'Trabalha braquial e antebraço'),
('Bíceps spyder', 3, 'Isolamento máximo do bíceps'),
-- TRÍCEPS (4)
('Tríceps testa', 4, 'Extensão de cotovelo com barra'),
('Tríceps corda', 4, 'Na polia com corda'),
('Tríceps no banco', 4, 'Peso corporal'),
-- QUADRÍCEPS (5)
('Agachamento livre', 5, 'Principal exercício de pernas'),
('Leg press', 5, 'Empurrar com quadriceps'),
('Cadeira extensora', 5, 'Isolamento de quadríceps'),
-- POSTERIOR (6)
('Stiff com barra', 6, 'Posterior e glúteo'),
('Mesa flexora', 6, 'Isolamento posterior'),
('Cadeira flexora', 6, 'Isolamento posterior'),
-- GLÚTEOS 
('Elevação pélvica', 7, 'Impulso de quadril'),
('Glute bridge', 7, 'Ponte de glúteo'),
-- PANTURRILHA 
('Panturrilha em pé', 8, 'Gastrocnêmio'),
('Panturrilha sentado', 8, 'Sóleo'),
-- OMBRO 
('Desenvolvimento com halteres', 9, 'Ombro completo'),
('Elevação lateral', 9, 'Deltoide lateral'),
('Elevação frontal', 9, 'Deltoide anterior'),
-- ABDÔMEN 
('Abdominal crunch', 10, 'Abdômen reto'),
('Prancha', 10, 'Isometria do core'),
('Elevação de pernas', 10, 'Infra'),
-- ADUTOR 
('Cadeira adutora', 11, 'Parte interna da coxa'),
-- ABDUTOR 
('Cadeira abdutora', 12, 'Parte externa da coxa'),

-- ANTEBRAÇO (13)
('Rosca punho', 13, 'Flexão de punho'),
('Rosca reversa', 13, 'Extensores do antebraço');

INSERT INTO training (user_id, name_training, suggest_day) VALUES
-- Vinicius
(1, 'Upper A', 'Terça'),
(1, 'Upper B', 'Quinta'),
(1, 'Lower A', 'Sábado'),
(1, 'Lower B', 'Domingo'),
-- João
(2, 'Push', 'Segunda'),
(2, 'Pull', 'Quarta'),
(2, 'Leg', 'Sexta'),
-- Maria
(3, 'Full Body A', 'Terça'),
(3, 'Full Body B', 'Quinta');

INSERT INTO training_exercise (exercise_id, training_id, set_exercise) VALUES
-- Upper A (1)
(1, 1, 3),
(2, 1, 3),
(9, 1, 3),
(12, 1, 3),
-- Upper B (2)
(3, 2, 3),
(6, 2, 3),
(10, 2, 3),
-- Lower A (3)
(15, 3, 3),
(16, 3, 3),
(18, 3, 3),
-- Lower B (4)
(17, 4, 3),
(19, 4, 3),
(20, 4, 3);

INSERT INTO training_log (training_exercise_id, training_date) VALUES
-- Semana 1
(1, '2026-05-01 10:00:00'),
(2, '2026-05-01 10:10:00'),
(3, '2026-05-01 10:20:00'),
-- Semana 2
(1, '2026-05-08 10:00:00'),
(2, '2026-05-08 10:10:00'),
(3, '2026-05-08 10:20:00'),
-- Semana 3
(1, '2026-05-15 10:00:00'),
(2, '2026-05-15 10:10:00'),
(3, '2026-05-15 10:20:00');

INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
(1, 1, 12, 20, 'Trabalho'),
(2, 1, 10, 22, 'Trabalho'),
(3, 1, 8, 26, 'Falha'),
(1, 2, 10, 24, 'Trabalho'),
(2, 2, 6, 30, 'Falha'),
(1, 3, 12, 20, 'Trabalho'),
(2, 3, 10, 30, 'Trabalho'),
(3, 3, 6, 40, 'Falha');

INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
-- Semana 1
(1, 1, 12, 20, 'Trabalho'),
(2, 1, 10, 22, 'Trabalho'),
(3, 1, 8, 24, 'Falha'),

(1, 2, 12, 18, 'Trabalho'),
(2, 2, 10, 20, 'Trabalho'),
(3, 2, 8, 22, 'Falha'),

(1, 3, 12, 30, 'Trabalho'),
(2, 3, 10, 35, 'Trabalho'),
(3, 3, 8, 40, 'Falha'),
-- Semana 2 (evolução)
(1, 4, 12, 22, 'Trabalho'),
(2, 4, 10, 24, 'Trabalho'),
(3, 4, 8, 26, 'Falha'),

(1, 5, 12, 20, 'Trabalho'),
(2, 5, 10, 22, 'Trabalho'),
(3, 5, 8, 24, 'Falha'),

(1, 6, 12, 35, 'Trabalho'),
(2, 6, 10, 40, 'Trabalho'),
(3, 6, 8, 45, 'Falha'),
-- Semana 3 (PR)
(1, 7, 12, 24, 'Trabalho'),
(2, 7, 10, 26, 'Trabalho'),
(3, 7, 8, 30, 'Falha'),

(1, 8, 12, 22, 'Trabalho'),
(2, 8, 10, 24, 'Trabalho'),
(3, 8, 8, 26, 'Falha'),

(1, 9, 12, 40, 'Trabalho'),
(2, 9, 10, 45, 'Trabalho'),
(3, 9, 8, 50, 'Falha');