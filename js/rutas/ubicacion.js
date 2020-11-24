const router = require("express").Router();

const access = require("../db/access/ubicacion");


router.get("/", async (req, res) => {
  try {
    let ciudades = await access.encontrarTodos();
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.get("/regiones", async (req, res) => {
  try {
    let regiones = await access.encontrarRegiones();
    return res.json(regiones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/regiones/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let regiones = await access.encontrarRegionPorId(id);
  
      return res.json(regiones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/paises/:regionid", async (req, res) => {
  try {
    const { regionid } = req.params;

    let paises = await access.encontrarPaisPorRegionId(regionid);
    return res.json(paises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/ciudades/:paisId", async (req, res) => {
  try {
    const { paisId } = req.params;

    let ciudades = await access.encontrarCiudadPorPaisId(paisId);
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/paises", async (req, res) => {
  try {
    let paises = await access.encontrarPaises();
    return res.json(paises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

////////////////////////POST///////////////////////

router.post('/regiones/crear', async (req, res)=>{
  try {
    const region = await access.encontrarRegionPorDescripcion(req.body);
    console.log(region);
    if (region.length) {
      return res.status(409).json({ error: "La Región ya Existe!" });
    }
    await access.agregarRegion(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





router.post('/paises/crear', async (req, res)=>{
  try {
    const country = await access.encontrarPaisporDescripcion(req.body);
    if (country.length) {
      return res.status(409).json({ error: "El País ya Existe!!" });
    }
    await access.agregarPais(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/ciudades/crear', async (req, res)=>{
  try {
    const ciudad = await access.encontrarCiudadDescripcion(req.body);
    if (ciudad.length) {
      return res.status(409).json({ error: "La Ciudad ya Existe!!" });
    }
    await access.agregarCiudad(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



/////////////////////////ACTUALIZAR////////////////////////

router.put("/regiones/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.actualizarRegion(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put("/paises/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.actualizarPais(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/ciudades/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await access.actualizarCiudad(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



/////////////////////ELIMINAR//////////////////

router.delete("/regiones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarRegion(id);

    res.json({ message: "Región Eliminada con Éxito!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete("/paises/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarPais(id);

    res.json({ message: "País Eliminado con Éxito!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/ciudades/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await access.eliminarCiudad(id);

    res.json({ message: "Ciudad Eliminada con Éxito!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;