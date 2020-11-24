const router = require("express").Router();

const access = require("../db/access/companias");


router.get("/", async (req, res) => {
    try {
      const companias = await access.encontrarTodos();
      res.status(200).json(companias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});




router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let compania = await access.encontrarPorId(id);

    return res.json(compania);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.post('/agregar', async (req, res)=>{
  try {
    const compania = await access.encontrarPorEmail(req.body);
    if (compania.length) {
      return res.status(409).json({ error: "La Compañìa ya existe!" });
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
      
    await access.actualizarCompania(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarCompania(id);

    res.json({ message: "Compañìa Eliminada con Èxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;