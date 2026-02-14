CREATE DATABASE chefs_pot;

USE chefs_pot;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    creator_id INT,
    image VARCHAR(100),
    ingredients TEXT NOT NULL,
    spices TEXT NOT NULL,
    steps TEXT NOT NULL,
    portions INT NOT NULL,
    created DATE NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipes_modified (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_id INT,
    creator_id INT,
    ingredients TEXT NOT NULL,
    spices TEXT NOT NULL,
    steps TEXT NOT NULL,
    portions INT NOT NULL,
    FOREIGN KEY (original_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE recipes_favourite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    user_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE recipes_modified
ADD CONSTRAINT uc_recipe_mdoified_unique UNIQUE (original_id, creator_id);

ALTER TABLE recipes_favourite
ADD CONSTRAINT uc_recipes_favourite_unique UNIQUE (recipe_id, user_id);
