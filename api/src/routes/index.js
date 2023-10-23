require("dotenv").config();
const { Router } = require('express');
const axios = require("axios")
const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', async (req, res) => {
    try {
        const url = "https://api.thedogapi.com/v1/breeds";
        const response = await axios.get(url, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const dogsData = response.data;

        const dogs = await Promise.all(
            dogsData.map(async (dog) => {
                return {
                    id: dog.id,
                    image: dog.image.url,
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span
                };
            })
        );

        res.status(200).json(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de perros" });
    }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
