const db = require("../index");

////////////////////

const encontrarUsuario = async (body) => {
    return await db.sequelize.query(
        `SELECT * FROM USUARIOS WHERE USUARIO = "${body.user}";`,
        { type: db.sequelize.QueryTypes.SELECT });
};

const encontrarPorEmail = async (body) => {
    return await db.sequelize.query(`SELECT * FROM USUARIOS WHERE EMAIL = "${body.email}";`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const encontrarTodos = async () => {
  return await db.sequelize.query(`SELECT USUARIOS.ID AS usuarioId,
  USUARIOS.USUARIO AS usuario, USUARIOS.NOMBRE AS nombre, USUARIOS.APELLIDO AS apellido, USUARIOS.EMAIL AS email,
  ROLES.ID AS roleId, ROLES.ROL AS rol
  FROM USUARIOS USUARIOS
  INNER JOIN ROLES ROLES
  ON USUARIOS.ROLEID = ROLES.ID`, {
    type: db.sequelize.QueryTypes.SELECT,
  });
};

const encontrarPorId = async (id) => {
    return await db.sequelize.query(`SELECT * FROM USUARIOS WHERE ID = "${id}";`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
  };

const agregar = async (body) => {
    return await db.sequelize.query(
      `INSERT INTO USUARIOS (usuario, nombre, apellido, email, contrasena, roleId) 
       VALUES ("${body.usuario}","${body.nombre}","${body.apellido}","${body.email}", "${body.contrasena}", "${body.roleId}");`,
      { type: db.sequelize.QueryTypes.INSERT }
    );
};

const actualizarUsuario = async (body, id) => {
    return await db.sequelize.query(
      `UPDATE USUARIOS SET USUARIO = "${body.usuario}", NOMBRE="${body.nombre}", APELLIDO="${body.apellido}",
      EMAIL="${body.email}", CONTRASENA="${body.contrasena}", ROLEID=${body.roleId} WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.UPDATE }
    );
};

const eliminarUsuario = async (id) => {
    return await db.sequelize.query(
      `DELETE FROM USUARIOS WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
  }; 

module.exports = {
    encontrarUsuario,
    encontrarPorEmail,
    encontrarTodos,
    encontrarPorId,
    agregar,
    actualizarUsuario,
    eliminarUsuario 
};