const jwt = require('jsonwebtoken');

const secret = '$eCr3t';
const roleIdA = 2; //Id cliente = 2 o Id admin = 1

const vLogin = (req, res, next) => {
    try {
        const { user, pass } = req.body;
        if(!user || !pass)
        return res.status(400).json({error: 'Los Datos están Incompletos (Usuario o contraseña)'});
        next()
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const vPassword = (req, res, next) => {
    try {
        const { contrasena, contrasenaRep } = req.body;
        if (!contrasena || !contrasenaRep) {
            return res.status(400).json({ error: "La Contraseña es requerida!" });
        } else {
            if (contrasena != contrasenaRep) {
                return res.status(400).json({ error: "Las contraseñas deben coincidir" });
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const vContrasena = (req, res, next) => {
    try {
        const { contrasena, contrasenaRep } = req.body;
        if (!contrasena || !contrasenaRep) {
            return res.status(400).json({ error: "La Contraseña es Requerida" });
        } else {
            if (contrasena != contrasenaRep) {
                return res.status(400).json({ error: "Contraseña Incorrecta" });
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    vLogin,
    vPassword,
    vContrasena
};