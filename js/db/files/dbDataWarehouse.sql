CREATE SCHEMA IF NOT EXISTS dbDataWarehouse;

use dbDataWarehouse;

CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    rol varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (rol) VALUES ("Administrador"), ("Contacto");

CREATE TABLE IF NOT EXISTS usuarios (
  id int NOT NULL AUTO_INCREMENT,
  usuario varchar(255) NOT NULL,
  nombre varchar(255) NOT NULL,
  apellido varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  contrasena varchar(255) NOT NULL,
  roleId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY roleId (roleId),
  CONSTRAINT usuarios_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios 
(usuario, nombre, apellido, email, contrasena, roleId) 
VALUES ("scalzatet","Sarah","Alzate","scalzatet@gmail.com", "adminSA", 1),
("user1","Cristina","Tobon","ctobon@gmail.com", "1234", 2);

CREATE TABLE IF NOT EXISTS regiones (
    id int NOT NULL AUTO_INCREMENT,
    region varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO regiones
(region) 
VALUES ("Norteamérica"), ("Sudamérica"), ("Centroamérica");

CREATE TABLE IF NOT EXISTS paises (
    id int NOT NULL AUTO_INCREMENT,
    pais varchar(255) NOT NULL,
    regionId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY regionId (regionId),
    CONSTRAINT paises_ibfk_1 FOREIGN KEY (regionId) REFERENCES regiones (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO paises
(pais, regionId) 
VALUES ("Colombia", 2), ("México", 3), ("Estados Unidos", 1), ("Argentina", 2);

CREATE TABLE IF NOT EXISTS ciudades (
    id int NOT NULL AUTO_INCREMENT,
    ciudad varchar(255) NOT NULL,
    paisId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY paisId (paisId),
    CONSTRAINT ciudades_ibfk_1 FOREIGN KEY (paisId) REFERENCES paises (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ciudades
(ciudad, paisId) 
VALUES ("Medellin", 1), ("Cali", 1),
("Jalisco", 2), ("Guadalajara", 2),
("California", 3), ("Miami", 3),
("Buenos Aires", 4), ("Córdoba", 4);

CREATE TABLE IF NOT EXISTS companias (
  id int NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  direccion varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  telefono varchar(255) NOT NULL,
  ciudadId int DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT companias_ibfk_1 FOREIGN KEY (ciudadId) REFERENCES ciudades (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO companias (nombre, direccion, email, telefono, ciudadId)
VALUES ("AgroLevels", "Direccion 123", "agrolevels@gmail.com", "1111111", 1),
("Agrow", "Direccion 456", "agrow@gmail.com", "2222222", 2),
("Croper", "Direccion 789", "croper@gmail.com", "3333333", 3),
("AgriCapital", "Direccion 101", "agricapital@gmail.com", "4444444", 4);

CREATE TABLE IF NOT EXISTS contactos (
  id int NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  apellido varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  ciudadId int DEFAULT NULL,
  companiaId int DEFAULT NULL,
  cargo varchar(255) NOT NULL,
  canal_favorito varchar(255) NOT NULL,
  interes varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT contactos_ibfk_1 FOREIGN KEY (ciudadId) REFERENCES ciudades (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO contactos (nombre, apellido, email, ciudadId, companiaId, cargo, canal_favorito, interes)
VALUES ("Laura", "Tobon", "ltobon@gmail.com", 1, 3, "Director comercial", "Correo Electrónico", "0"),
("Sebastian", "Soto", "ssoto@gmail.com", 3, 2, "Líder de desarrollo", "WhatsApp", "25"),
("Valentina", "Jaramillo", "vjaramillo@gmail.com", 4, 4, "Lider de soporte", "WhatsApp", "50"),
("Esteban", "Ortiz", "eortiz@gmail.com", 2, 1, "Desarrollador Junior", "Correo Electrónico", "75"),
("Andrés", "Martínez", "amartinez@gmail.com", 3, 3, "Desarrollador Senior", "WhatsApp", "100");
