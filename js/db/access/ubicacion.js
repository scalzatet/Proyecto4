const db = require("../index");

const detallesCiudades = `SELECT CIUDADES.ID AS ciudadId,
CIUDADES.CIUDAD AS ciudad,
PAISES.ID AS paisId, PAISES.PAIS AS paisDesc,
REGIONES.ID AS regionId, REGIONES.REGION AS regionDesc
FROM CIUDADES CIUDADES
INNER JOIN PAISES PAISES
ON CIUDADES.PAISID = PAISES.ID
INNER JOIN REGIONES REGIONES
ON PAISES.REGIONID = REGIONES.ID`;

const encontrarTodos = async () => {
    return await db.sequelize.query(detallesCiudades, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const encontrarRegiones = async () => {
  return await db.sequelize.query(`SELECT * FROM REGIONES`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPaises = async () => {
  return await db.sequelize.query(`SELECT * FROM PAISES`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarRegionPorId = async (id) => {
    return await db.sequelize.query(`SELECT * FROM REGIONES WHERE ID=${id};`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const encontrarPaisPorRegionId = async (regionId) => {
    return await db.sequelize.query(`SELECT * FROM PAISES WHERE REGIONID=${regionId};`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const encontrarCiudadPorPaisId = async (paisId) => {
  return await db.sequelize.query(`SELECT * FROM CIUDADES WHERE PAISID=${paisId};`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};


const encontrarRegionPorDescripcion = async (body) => {
  return await db.sequelize.query(`SELECT * FROM REGIONES WHERE REGION="${body.region}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const agregarRegion = async (body) => {
  return await db.sequelize.query(
    `INSERT INTO REGIONES (region) VALUES ("${body.region}");`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const encontrarPaisporDescripcion = async (body) => {
  return await db.sequelize.query(`SELECT * FROM PAISES WHERE pais="${body.pais}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const agregarPais = async (body) => {
  return await db.sequelize.query(
    `INSERT INTO PAISES (pais, regionId) VALUES ("${body.pais}", ${body.regionId});`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const encontrarCiudadDescripcion = async (body) => {
  return await db.sequelize.query(`SELECT * FROM CIUDADES WHERE ciudad="${body.ciudad}";`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const agregarCiudad = async (body) => {
  return await db.sequelize.query(
    `INSERT INTO CIUDADES (ciudad, paisId) VALUES ("${body.ciudad}", ${body.paisId});`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const actualizarRegion = async (body, id) => {
  return await db.sequelize.query(
    `UPDATE REGIONES SET REGION = "${body.region}" WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.UPDATE }
  );
};

const actualizarPais = async (body, id) => {
  return await db.sequelize.query(
    `UPDATE PAISES SET PAIS = "${body.pais}" WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.UPDATE }
  );
};

const actualizarCiudad = async (body, id) => {
  return await db.sequelize.query(
    `UPDATE CIUDADES SET CIUDAD = "${body.ciudad}" WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.UPDATE }
  );
};


const eliminarRegion = async (id) => {
  return await db.sequelize.query(
    `DELETE FROM REGIONES WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};

const eliminarPais = async (id) => {
  return await db.sequelize.query(
    `DELETE FROM PAISES WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};


const eliminarCiudad = async (id) => {
  return await db.sequelize.query(
    `DELETE FROM CIUDADES WHERE ID = ${id};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};


module.exports = {
    encontrarTodos,
    encontrarRegiones,
    encontrarRegionPorId,
    encontrarPaisPorRegionId,
    encontrarCiudadPorPaisId,
    encontrarRegionPorDescripcion,
    agregarRegion,
    encontrarPaisporDescripcion,
    agregarPais,
    encontrarPaises,
    encontrarCiudadDescripcion,
    agregarCiudad,
    actualizarRegion,
    actualizarPais,
    actualizarCiudad,
    eliminarRegion,
    eliminarPais,
    eliminarCiudad
};