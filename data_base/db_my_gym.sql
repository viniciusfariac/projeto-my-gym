CREATE DATABASE IF NOT EXISTS my_gym;

USE my_gym;

CREATE TABLE IF NOT EXISTS `user` (
	id_user INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
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
--     CONSTRAINT ckc_muscle_group CHECK (muscle_group IN ('Costas', 'Peito', 'Ombro', 'Tríceps', 'Bíceps', 'Antebraço', 'Abdômen', 'Quadriceps', 'Posterior', 'Glúteo', 'Panturrilha'))
);

CREATE TABLE IF NOT EXISTS user_exercise (
	id_user_exercise INT NOT NULL AUTO_INCREMENT,
    exercise_id INT NOT NULL,
    user_id INT NOT NULL,
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_user_exercise),
    CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id_exercise),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES `user`(id_user)
);

CREATE TABLE IF NOT EXISTS training (
	id_training INT NOT NULL AUTO_INCREMENT,
    user_exercise_id INT NOT NULL,
    name_training VARCHAR(30) NOT NULL,
    type_training VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    suggest_day VARCHAR(30) NOT NULL,
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_training),
    
	CONSTRAINT fk_user_exercise FOREIGN KEY (user_exercise_id) REFERENCES user_exercise(id_user_exercise),
    
    CONSTRAINT ckc_status CHECK (status IN ('Ativo', 'Inativo')), 
    CONSTRAINT ckc_day CHECK (suggest_day IN ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'))
);

CREATE TABLE IF NOT EXISTS training_log (
	id_training_log INT NOT NULL AUTO_INCREMENT,
    training_id INT NOT NULL,
    training_date DATE DEFAULT (CURRENT_DATE),
    
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_training_log)
);

CREATE TABLE IF NOT EXISTS training_set (
	id_set INT NOT NULL AUTO_INCREMENT,
    training_log_id INT NOT NULL,
    set_order INT NOT NULL,
    rep INT NOT NULL,
    weight DECIMAL(10,2),
    type_set VARCHAR(50),
    
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_set, training_log_id, set_order),
    
	CONSTRAINT fk_training_log FOREIGN KEY (training_log_id) REFERENCES training_log(id_training_log),
	CONSTRAINT ckc_type CHECK (type_set IN ('Falha', 'Aquecimento', 'Trabalho', 'Top-set'))
);

INSERT INTO exercise (exercise_name, muscle_group, description, url_image) VALUES
('Supino Reto', 'Peito', 'Exercício para peitoral com barra', NULL),
('Agachamento Livre', 'Quadriceps', 'Exercício composto para pernas', NULL),
('Puxada na Barra', 'Costas', 'Exercício para dorsais', NULL),
('Rosca Direta', 'Bíceps', 'Exercício para bíceps', NULL),
('Tríceps Corda', 'Tríceps', 'Exercício isolado para tríceps', NULL);

INSERT INTO user_exercise (exercise_id, user_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

INSERT INTO training (user_exercise_id, name_training, type_training, status, suggest_day) VALUES
(1, 'Treino A', 'Peito e Tríceps', 'Ativo', 'Segunda'),
(2, 'Treino B', 'Pernas', 'Ativo', 'Terça'),
(3, 'Treino C', 'Costas e Bíceps', 'Ativo', 'Quarta');

INSERT INTO training_log (training_id, training_date) VALUES
(1, '2026-04-25'),
(2, '2026-04-26'),
(3, '2026-04-27');


INSERT INTO training_set (training_log_id, set_order, rep, weight, type_set) VALUES
(1, 1, 12, 40.00, 'Aquecimento'),
(1, 2, 10, 60.00, 'Trabalho'),
(1, 3, 8, 70.00, 'Top-set');


INSERT INTO training_set (training_log_id, set_order, rep, weight, type_set) VALUES
(2, 1, 12, 50.00, 'Aquecimento'),
(2, 2, 10, 80.00, 'Trabalho'),
(2, 3, 6, 100.00, 'Top-set');


INSERT INTO training_set (training_log_id, set_order, rep, weight, type_set) VALUES
(3, 1, 12, 30.00, 'Aquecimento'),
(3, 2, 10, 50.00, 'Trabalho'),
(3, 3, 8, 60.00, 'Falha');

SELECT * FROM user;