const router = require("express").Router();


const jwt = require("jsonwebtoken");
const access = require("../db/access/contactos");



router.get("/", async (req, res) => {
  try {
    const contactos = await access.encontrarTodos();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let contacto = await access.encontrarPorId(id);

    return res.json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/agregar', async (req, res)=>{
  try {
    const contacto = await access.encontrarPorEmail(req.body);
    if (contacto.length) {
      return res.status(409).json({ error: "El contacto ya existe" });
    }
    await access.agregar(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.actualizarContacto(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarContacto(id);

    res.json({ message: "Contacto Eliminado con Éxito!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;