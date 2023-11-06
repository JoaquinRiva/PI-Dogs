const axios = require('axios');
const { API_KEY } = process.env;
const { Temperaments } = require('../db'); 

const getTemperaments = async (req, res) => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (response.status === 200) {
      
      const breeds = response.data;
      const temperamentsSet = new Set();

      breeds.forEach((breed) => {
        if (breed.temperament) {
          const splitTemperaments = breed.temperament.split(',').map((t) => t.trim());
          splitTemperaments.forEach((temp) => temperamentsSet.add(temp));
        }
      });

      const temperamentsArray = Array.from(temperamentsSet);

      
      const savedTemperaments = await Promise.all(temperamentsArray.map(async (temp) => {
        const [temperament, created] = await Temperaments.findOrCreate({
          where: { name: temp },
        });

        return temperament;
      }));

      return res.json(savedTemperaments);
    } else {
      return res.status(response.status).json({ error: 'Error al obtener datos de temperamentos' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener datos de temperamentos' });
  }
};

module.exports = getTemperaments;
