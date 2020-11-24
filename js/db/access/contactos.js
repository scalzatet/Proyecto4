const db = require("../index");

const detallesContactos = `SELECT CONTACTOS.ID AS contactosId,
CONTACTOS.NOMBRE AS nombre, CONTACTOS.APELLIDO AS apellido, CONTACTOS.EMAIL AS email, CONTACTOS.CARGO AS cargo, CONTACTOS.canal_favorito AS canal_favorito, CONTACTOS.INTERES AS interes,
CIUDADES.ID AS ciudadId, CIUDADES.CIUDAD AS ciudad,
COMPANIAS.ID AS companiaId, COMPANIAS.NOMBRE AS compania
FROM CONTACTOS CONTACTOS
INNER JOIN CIUDADES CIUDADES
ON CONTACTOS.CIUDADID = CIUDADES.ID
INNER JOIN COMPANIAS COMPANIAS
ON CONTACTOS.COMPANIAID = COMPANIAS.ID`;

const encontrarTodos = async () => {
  return await db.sequelize.query(detallesContactos, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPorEmail = async (body) => {
  return await db.sequelize.query(`SELECT * FROM CONTACTOS WHERE EMAIL = "${body.email}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPorId = async (id) => {
  return await db.sequelize.query(`SELECT * FROM CONTACTOS WHERE ID = "${id}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const agregar = async (body) => {
  return await db.sequelize.query(
    `INSERT INTO CONTACTOS (nombre, apellido, email, ciudadId, companiaId, cargo, canal_favorito, interes) 
     VALUES ("${body.nombre}","${body.apellido}","${body.email}","${body.ciudadId}","${body.companiaId}", "${body.cargo}", "${body.canal_favorito}", ${body.interes});`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const actualizarContacto = async (body, id) => {
  return await db.sequelize.query(
    `UPDATE CONTACTOS SET NOMBRE = "${body.nombre}",  APELLIDO = "${body.apellido}", EMAIL="${body.email}", CIUDADID=${body.ciudadId},
    COMPANIAID=${body.companiaId}, CARGO="${body.cargo}", canal_favorito="${body.canal_favorito}",
    INTERES="${body.interes}" WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.UPDATE }
  );
};

const eliminarContacto = async (id) => {
  return await db.sequelize.query(
    `DELETE FROM CONTACTOS WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};





module.exports = {
  encontrarTodos,
  encontrarPorEmail,
  encontrarPorId,
  actualizarContacto,
  eliminarContacto,
  agregar,
  
};