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
    CONSTRAINT ckc_day CHECK (status IN ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'))
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