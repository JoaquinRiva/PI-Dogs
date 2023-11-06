require("dotenv").config();
const { Router } = require('express');
const axios = require("axios")
const {API_KEY} = process.env;
const getTemperaments = require("../controllers/getTemperaments");
const getDogId = require("../controllers/getDogId");
const getDogName = require("../controllers/getDogName");
const postDog = require("../controllers/postDog");
const getDogs = require("../controllers/getDogs");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', getDogs)
router.get('/dogs/:idRaza', getDogId);
router.get('/dogsname', getDogName);
router.get('/dogstemperaments', getTemperaments);
//POST
router.post('/dogs', postDog)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
