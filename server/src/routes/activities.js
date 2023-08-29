const express = require('express');
const { Tours, Country } = require('../db'); // Ajusta la ruta correcta hacia db.js

const router = express.Router();

// Ruta GET para obtener todas las actividades turísticas
router.get('/', async (req, res) => {
  try {
    const activities = await Tours.findAll({
      include: Country });
      console.log(activities);
      res.json(activities);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener actividades' });
  }
});

// Ruta POST para crear una actividad turística
router.post('/', async (req, res) => {
  try {
    const { name, type, difficulty, durationHours, season, country } = req.body;
    
    if (!name || !type || !difficulty || !durationHours || !season || !country) {
      return res.status(400).json({ error: 'Missing required fields'})
    }

    const activity = await Tours.create({
      name,
      type,
      difficulty,
      durationHours,
      season,
    });
      const countries = await Country.findAll({
        where: {
          name: country,
        },
      });
      await activity.addCountries(countries);
  
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;