-- Crear tabla rol
CREATE TABLE IF NOT EXISTS rol (
  id_rol SERIAL PRIMARY KEY,
  nombre_rol VARCHAR NOT NULL
);

-- Crear tabla privilegio
CREATE TABLE IF NOT EXISTS privilegio (
  id_privilegio SERIAL PRIMARY KEY,
  nombre_privilegio VARCHAR NOT NULL
);

-- Crear tabla usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  id_rol INTEGER NOT NULL REFERENCES rol(id_rol),
  nombre_usuario VARCHAR NOT NULL,
  contraseña VARCHAR NOT NULL,
  imagen_usuario VARCHAR,
  id_persona INTEGER
);

-- Crear tabla rol_privilegio (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS rol_privilegio (
  id_rol INTEGER NOT NULL REFERENCES rol(id_rol),
  id_privilegio INTEGER NOT NULL REFERENCES privilegio(id_privilegio),
  PRIMARY KEY (id_rol, id_privilegio)
);

-- Insertar datos de prueba en rol
INSERT INTO rol (nombre_rol) VALUES
('Administrador'),
('Usuario'),
('Invitado');

-- Insertar datos de prueba en privilegio
INSERT INTO privilegio (nombre_privilegio) VALUES
('Crear'),
('Leer'),
('Actualizar'),
('Eliminar');

-- Insertar datos de prueba en usuario
INSERT INTO usuario (id_rol, nombre_usuario, contraseña, imagen_usuario, id_persona) VALUES
(1, 'admin', 'admin123', 'admin.png', 101),
(2, 'usuario1', 'user123', NULL, 102),
(3, 'invitado1', 'guest123', NULL, NULL);

-- Insertar datos de prueba en rol_privilegio
INSERT INTO rol_privilegio (id_rol, id_privilegio) VALUES
(1, 1), -- Admin - Crear
(1, 2), -- Admin - Leer
(1, 3), -- Admin - Actualizar
(1, 4), -- Admin - Eliminar
(2, 2), -- Usuario - Leer
(2, 3), -- Usuario - Actualizar
(3, 2); -- Invitado - Leer
