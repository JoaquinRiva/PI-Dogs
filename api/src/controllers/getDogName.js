const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperaments } = require("../db");
const { Op } = require("sequelize");

async function getDogName(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "El parámetro 'name' es requerido" });
        }

        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        const dbDog = await Dog.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` 
                }
            }
        });

        if (apiResponse.data && apiResponse.data.length > 0) {
            const apiDogs = apiResponse.data;

            const dogsFromAPI = apiDogs.map(apiDog => {
                return {
                    id: apiDog.id,
                    image: apiDog.reference_image_id,
                    name: apiDog.name,
                    height: apiDog.height.metric,
                    weight: apiDog.weight.metric,
                    life_span: apiDog.life_span,
                    temperament: apiDog.temperament
                };
            });

            return res.status(200).json(dogsFromAPI);
        } else if (dbDog) {
            const dogFromDB = {
                id: dbDog.id,
                image: dbDog.image,
                name: dbDog.name,
                height: dbDog.height,
                weight: dbDog.weight,
                life_span: dbDog.lifespan
            };
            return res.status(200).json(dogFromDB);
        } else {
            return res.status(404).json({ error: "Raza no encontrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de perros" });
    }
}

module.exports = getDogName;
