const router = require('express').Router();

const { vLogin, vPassword, vContrasena } = require("../middlewares/user");


const jwt = require('jsonwebtoken');
const access = require("../db/access/usuarios");
const secret = '$eCr3t';
const roleIdA = 2;


//////////////////////////////Loguear usuario///////////////////////

router.post('/login', vLogin, async (req, res) => {
    try {
        const user = await access.encontrarUsuario(req.body);
        //TOKEN
        const { pass } = req.body;
        
        if (!user.length) {
            return res.status(401).json({ error: "Información Incorrecta 1" });
        }
        console.log(user[0].contrasena);
        if (user[0].contrasena == pass) {

            const payload = {
            user: user[0].usuario,
            id: user[0].id,
            roleId: user[0].roleId
            }
            const token = jwt.sign(payload, secret);
            return res.header("auth-token", token).json(token);
        } else {
        return res.status(401).json({ error: "Información Incorrecta 2" });
        }
    } catch (error) {
        console.log('Datos mal');
        res.status(400).json({error: '"No se pudo loggear el usuario. Algo està mal"'});
    }
});


router.get("/", async (req, res) => {
  try {
    const usuarios = await access.encontrarTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let usuario = await access.encontrarPorId(id);

    return res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.post('/agregar', vPassword, vContrasena, async (req, res)=>{
  try {
    const usuario = await access.encontrarPorEmail(req.body);
    if (usuario.length) {
      return res.status(409).json({ error: "El Usuario ya Existe!" });
    }
    await access.agregar(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", vContrasena, async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.actualizarUsuario(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarUsuario(id);

    res.json({ message: "Usuario Eliminado con Éxito!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 
module.exports = router;
