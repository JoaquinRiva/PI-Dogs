const { Dog, Temperaments } = require('../db');
const { v4: uuidv4 } = require('uuid');

const postDog = async (req, res) => {
    try {
      const { image, name, height, weight, lifespan, temperaments } = req.body;
  
      if (!temperaments || temperaments.length === 0) {
        return res.status(400).json({ error: 'Debes proporcionar al menos un temperamento.' });
      }
  
      let existingDog = await Dog.findOne({ where: { name } });
  
      if (existingDog) {
        
        existingDog.image = image;
        existingDog.height = height;
        existingDog.weight = weight;
        existingDog.lifespan = lifespan;
        await existingDog.save();
      } else {
        
        existingDog = await Dog.create({
          id: uuidv4(), 
          image,
          name,
          height,
          weight,
          lifespan,
        });
      }
  
      for (const tempName of temperaments) {
        const temp = await Temperaments.findOne({
          where: { name: tempName },
        });
  
        if (temp) {
          await existingDog.addTemperaments(temp);
        }
      }
  
      res.status(201).json({ id: existingDog.id, message: 'Raza de perro creada o actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear o actualizar la raza de perro' });
    }
  };
  
  
  module.exports = postDog;
  
  