const { Dog, Temperaments } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');

async function getDogId(req, res) {
    try {
        const { idRaza } = req.params;

        if (/^\d+$/.test(idRaza)) {
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
                    height: apiDog.height.metric,
                    weight: apiDog.weight.metric,
                    life_span: apiDog.life_span,
                    temperament: apiDog.temperament
                };

                return res.status(200).json(dog);
            }
        }

        const dbDog = await Dog.findByPk(idRaza, {
            include: [Temperaments] 
        });

        if (dbDog) {
            const dog = {
                id: dbDog.id,
                name: dbDog.name,
                height: dbDog.height,
                weight: dbDog.weight,
                life_span: dbDog.lifespan,
                temperaments: dbDog.Temperaments.map(temp => temp.name)
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
