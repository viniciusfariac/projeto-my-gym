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
SELECT * FROM user;
CREATE TABLE IF NOT EXISTS exercise(
	id_exercise INT NOT NULL AUTO_INCREMENT,
    url_image VARCHAR(255),
    exercise_name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_exercise)
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
('vinicius', 'vinicius@gmail.com', '1234');

INSERT INTO exercise (exercise_name, muscle_group, description) VALUES
('Supino Inclinado com halteres', 'Peito', 'Supino inclinado com halteres no banco 45 graus'),
('Supino Reto com halteres', 'Peito', 'Supino reto com halteres no banco 0 graus'),
('Supino Declinado com halteres', 'Peito', 'Supino declinado com halteres no banco'),
('Triceps teste', 'Triceps', 'Triceps testa polia'),
('Triceps francês', 'Triceps', 'triceps frances polia'),
('Pulley  com barra reta', 'Costas', 'Pulley com barra reta'),
('Remada baixa triângulo', 'Costas', 'Remada'),
('Remada cavalinho', 'Costas', 'Cavalinho'),
('Biceps spyder', 'Biceps', 'Biceps famoso'),
('Rosca alternada', 'Biceps', 'Biceps alternado'),
('Agachamento smith', 'Quadriceps', 'Agachamento smith com trava'),
('Leg press 45', 'Quadriceps', 'Leg press 45'),
('Cadeira extensora', 'Quadriceps', 'Cadeira extensora'),
('Cadeira abdutora', 'Abdutor', null),
('Cadeira adutora', 'Adutor', null),
('Stiff', 'Posterior', null),
('Cadeira flexora', 'Posterior', null),
('Mesa flexora', 'Posterior', null),
('Panturrilha máquina', 'Panturrilha', null);

INSERT INTO training (user_id, name_training, suggest_day) VALUES
(1, 'Upper A', 'Terça'),
(1, 'Upper B', 'Quinta'),
(1, 'Lower A', 'Sabado'),
(1, 'Lower B', 'Domingo');

INSERT INTO training_exercise (exercise_id, training_id, set_exercise) VALUES
(1, 1, 3),
(2, 1, 2),
(4, 1, 3),
(5, 1, 3),
(6, 1, 3),
(7, 2, 3),
(3, 2, 3),
(8, 2, 3),
(9, 2, 3),
(10, 3, 2),
(11, 3, 3),
(12, 3, 3),
(13, 3, 3),
(19, 3, 3);

INSERT INTO training_log (training_exercise_id, training_date) VALUES
(1, '2026-05-10 10:40:00');

INSERT INTO training_log (training_exercise_id, training_date) VALUES
(2, '2026-04-30 10:40:00'),
(3, '2026-04-30 10:50:00'),
(4, '2026-04-30 11:00:00'),
(5, '2026-04-30 11:10:00'),
(6, '2026-04-28 09:00:00'),
(7, '2026-04-28 09:10:00'),
(8, '2026-04-28 09:20:00'),
(9, '2026-04-28 09:30:00');

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
(1, 10, 12, 22, 'Trabalho'),
(2, 10, 10, 24, 'Trabalho'),
(3, 10, 8, 28, 'Falha');
	


-- SEMANA 1
INSERT INTO training_log (training_exercise_id, training_date) VALUES
(1, '2026-05-12 10:00:00'),
(2, '2026-05-12 10:10:00'),
(3, '2026-05-12 10:20:00'),
(4, '2026-05-12 10:30:00'),
(5, '2026-05-12 10:40:00'),

(7, '2026-05-14 10:00:00'),
(8, '2026-05-14 10:10:00'),
(9, '2026-05-14 10:20:00'),

(10, '2026-05-16 09:00:00'),
(11, '2026-05-16 09:10:00'),
(12, '2026-05-16 09:20:00'),
(13, '2026-05-16 09:30:00'),

(1, '2026-05-17 09:00:00'),
(2, '2026-05-17 09:10:00'),
(3, '2026-05-17 09:20:00');


INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
-- Supino Inclinado evolução
(1, 11, 12, 22, 'Trabalho'),
(2, 11, 10, 24, 'Trabalho'),
(3, 11, 8, 28, 'Falha'),

-- Supino reto mais reps
(1, 12, 12, 24, 'Trabalho'),
(2, 12, 11, 24, 'Trabalho'),
(3, 12, 9, 26, 'Falha'),

-- Triceps
(1, 13, 12, 18, 'Trabalho'),
(2, 13, 10, 20, 'Trabalho'),
(3, 13, 8, 24, 'Falha'),

-- Costas mantém
(1, 14, 12, 40, 'Trabalho'),
(2, 14, 10, 45, 'Trabalho'),
(3, 14, 8, 50, 'Falha'),

-- Bíceps
(1, 15, 12, 12, 'Trabalho'),
(2, 15, 10, 14, 'Trabalho'),
(3, 15, 8, 16, 'Falha');

INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
-- Supino Inclinado mais peso
(1, 16, 10, 26, 'Trabalho'),
(2, 16, 8, 28, 'Trabalho'),
(3, 16, 6, 32, 'Falha'),

-- Supino declinado melhor reps
(1, 17, 12, 24, 'Trabalho'),
(2, 17, 11, 26, 'Trabalho'),
(3, 17, 9, 28, 'Falha'),

-- Remada
(1, 18, 12, 50, 'Trabalho'),
(2, 18, 10, 55, 'Trabalho'),
(3, 18, 8, 60, 'Falha');

INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
-- Supino caiu 
(1, 19, 10, 26, 'Trabalho'),
(2, 19, 8, 26, 'Trabalho'),
(3, 19, 6, 28, 'Falha'),

-- Bíceps travado
(1, 20, 10, 14, 'Trabalho'),
(2, 20, 9, 14, 'Trabalho'),
(3, 20, 7, 16, 'Falha');

INSERT INTO training_set (set_order, training_log_id, rep, weight, type_set) VALUES
-- PR no supino
(1, 21, 12, 28, 'Trabalho'),
(2, 21, 10, 30, 'Trabalho'),
(3, 21, 8, 34, 'Falha'),

-- Perna evoluindo
(1, 22, 12, 80, 'Trabalho'),
(2, 22, 10, 90, 'Trabalho'),
(3, 22, 8, 100, 'Falha');