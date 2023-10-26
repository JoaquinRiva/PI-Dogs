require("dotenv").config();
const axios = require("axios");
const {API_KEY} = process.env;
const { Dog, Temperaments } = require("../db");

async function getDogId(req, res) {
    try {
        const { idRaza } = req.params;

        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (apiResponse.data) {
            
            const apiDog = apiResponse.data;
            const dog = {
                id: apiDog.id,
                image: apiDog.reference_image_id,
                name: apiDog.name,
                height: apiDog.height,
                weight: apiDog.weight,
                life_span: apiDog.life_span
            };
            return res.status(200).json(dog);
        }

        const dbDog = await Dog.findByPk(idRaza);

        if (dbDog) {
            
            const dog = {
                id: dbDog.id,
                image: dbDog.image, 
                name: dbDog.name,
                height: dbDog.height.imperial,
                weight: dbDog.weight.imperial,
                life_span: dbDog.lifespan
            };
            return res.status(200).json(dog);
        }

        
        res.status(404).json({ error: "Raza no encontrada" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de perros" });
    }
}


module.exports = getDogId;