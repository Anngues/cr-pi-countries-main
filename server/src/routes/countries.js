const express = require('express');
const { Op } = require('sequelize');
const { Country, Activities } = require('../db.js'); // Ajusta la ruta correcta hacia db.js

const router = express.Router();

// Ruta GET para buscar países por nombre
router.get('/name', async (req, res) => {
  try {
    const { name } = req.query;
    let countries;
      if (name) {
        countries = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name.toLowerCase()}%`
              
            }
          },
          include: Activities
        });
        if(countries.length === 0){
        res.status(404).send({ 'msg': 'No existe' })
        }
      } else {
        countries = await Country.findAll();
      }
      res.json(countries)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar países' });
  }

});

// Ruta GET para obtener todos los países
router.get('/', async (req, res) => {
  try {
    const countries = await Country.findAll({
      include: Activities,
    });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener países' });
  }
});

// Ruta GET para obtener el detalle de un país específico
router.get('/:idPais', async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.idPais, {
      include: Activities,
    });
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'País no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el país' });
  }
});



module.exports = router;