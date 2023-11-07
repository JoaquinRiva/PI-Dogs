import { GET_DOGS, GET_DOGS_BY_NAME, GET_ALL_TEMPERS, ORDER, FILTER_BY_TEMPER, FILTER_ALPHABETICALLY, POST_DOGS, GET_DOGS_FROM_DB } from './actions-types';
import axios from 'axios';

// Función para normalizar temperamentos
export const normalizeTemperaments = (dog) => {
  if (dog.temperament) {
    return dog.temperament.split(', ').map((temp) => temp.trim());
  }
  return [];
};

export const getDogs = () => async (dispatch) => {
  try {
    const response = await axios('http://localhost:3001/dogs');
    const dogsData = response.data.map((dog) => ({
      ...dog,
      temperaments: normalizeTemperaments(dog),
    }));
    console.log(dogsData);

    dispatch({
      type: GET_DOGS,
      payload: dogsData,
    });
  } catch (error) {
    window.alert(error);
  }
};

export const getDogsByName = (name) => async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/dogsname?name=${name}`);
      const data = response.data.map((dog) => ({
        ...dog,
        temperaments: normalizeTemperaments(dog),
      }));
      console.log(data);
  
      dispatch({
        type: GET_DOGS_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.error("Error al buscar la raza:", error);
    window.alert("Raza no encontrada, intente con otro nombre");
    }
  }

  export const getAllTempers = () => async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/dogstemperaments");
      const temperaments = response.data.map((temperament) => temperament.name);
      console.log(temperaments);
  
      dispatch({
        type: GET_ALL_TEMPERS,
        payload: temperaments,
      });
    } catch (error) {
      window.alert(error);
    }
  }
  

export const postDogs = (dog)=> async(dispatch)=>{
    try {
        const url = "http://localhost:3001/dogs"
        const response = await axios.post(url, dog)
        const data = response.data
        console.log(dog)

        dispatch({
            type: POST_DOGS,
            payload: data
        })
    } catch (error) {
        window.alert(error)
    }
}

 
export const orderCards = (order)=>{
    return {
        type: ORDER, 
        payload: order
    }
}


export const filterByTemper = (temper)=>{
    return {
        type: FILTER_BY_TEMPER,
        payload: temper
    }
}

export const filterAlphabetically = (filterValue) => ({
    type: FILTER_ALPHABETICALLY,
    payload: filterValue,
});

export const filterFromDb = (filteredValue)=>({
    type: GET_DOGS_FROM_DB,
    payload: filteredValue
})