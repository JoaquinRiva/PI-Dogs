const axios = require("axios")
require('dotenv').config()
const {API_KEY} = process.env
const {Dog,Temperament} = require('../db')
const URL = "https://api.thedogapi.com/v1/breeds"

async function getDogs(req, res) {
  try {
    
    const apiResponse = await axios(`${URL}?api_key=${API_KEY}`);
    const apiData = apiResponse.data;

    
    const dbDogs = await Dog.findAll({
      include: Temperament, 
    });

    
    const apiDogs = apiData.map((dog) => ({
      name: dog.name,
      id: dog.id,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
      createdAtDatabase: false
    }));

    const dogs = dbDogs.map((dbDog) => ({
      name: dbDog.name,
      id: dbDog.id,
      height: dbDog.height,
      weight: dbDog.weight,
      life_span: dbDog.life_span,
      image: dbDog.image,
      temperament: dbDog.temperaments.map((temperament) => temperament.name).join(", "),
      createdAtDatabase: true,
    }));

    const allDogs = [...dogs,...apiDogs ];
    console.log(allDogs)

    res.status(200).json(allDogs);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = getDogs;