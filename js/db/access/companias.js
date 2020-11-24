const db = require("../index");

const detallesCompanias = `SELECT COMPANIAS.ID AS companiaId,
COMPANIAS.NOMBRE AS nombre, COMPANIAS.DIRECCION AS direccion, COMPANIAS.EMAIL AS email, COMPANIAS.TELEFONO AS telefono,
CIUDADES.ID AS ciudadId, CIUDADES.CIUDAD AS ciudadDesc
FROM COMPANIAS COMPANIAS
INNER JOIN CIUDADES CIUDADES
ON COMPANIAS.CIUDADID = CIUDADES.ID`;

const encontrarTodos = async () => {
    return await db.sequelize.query(detallesCompanias, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const encontrarPorEmail = async (body) => {
  return await db.sequelize.query(`SELECT * FROM COMPANIAS WHERE EMAIL = "${body.email}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPorId = async (id) => {
  return await db.sequelize.query(`SELECT * FROM COMPANIAS WHERE ID = "${id}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const agregar = async (body) => {
  return await db.sequelize.query(
    `INSERT INTO COMPANIAS (nombre, direccion, email, telefono, ciudadId) 
     VALUES ("${body.nombre}","${body.direccion}", "${body.email}", "${body.telefono}", "${body.ciudadId}");`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const actualizarCompania = async (body, id) => {
  return await db.sequelize.query(
    `UPDATE COMPANIAS SET nombre="${body.nombre}", direccion="${body.direccion}",
    email="${body.email}", telefono="${body.telefono}", ciudadId=${body.ciudadId} WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.UPDATE }
  );
};

const eliminarCompania = async (id) => {
  return await db.sequelize.query(
    `DELETE FROM COMPANIAS WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};



module.exports = {
    encontrarTodos,
    encontrarPorEmail,
    agregar,
    actualizarCompania,
    eliminarCompania,
    encontrarPorId
};