const express = require('express');
const { Activities, Country } = require('../db'); // Ajusta la ruta correcta hacia db.js

const router = express.Router();

// Ruta GET para obtener todas las actividades turísticas
router.get('/', async (req, res) => {
  try {
    const activities = await Activities.findAll({
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
    const { name, difficulty, durationHours, season, country } = req.body;
    
    if (!name || !difficulty || !durationHours || !season || !country) {
      return res.status(400).json({ error: 'Missing required fields'})
    }

    const activity = await Activities.create({
      name,
      difficulty,
      durationHours,
      season,
    });
      const countries = await Country.findAll({
        where: {
          name: country,
        },
      });
      await activity.setCountries(countries);
      console.log(activity);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;