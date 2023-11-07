import {
    FILTER_BY_TEMPER,
    GET_ALL_TEMPERS,
    GET_DOGS,
    GET_DOGS_BY_NAME,
    ORDER,
    FILTER_ALPHABETICALLY,
    GET_DOGS_FROM_DB,
  } from "./actions-types";
  
  const initalState = {
    dogs: [],
    allDogs: [],
    dogsOrigin: "All",
    allTempers: [],
  };
  
  const reducer = (state = initalState, action) => {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case GET_DOGS_BY_NAME:
        return {
          ...state,
          dogs: action.payload,
        };
  
      case GET_ALL_TEMPERS:
        return {
          ...state,
          allTempers: action.payload,
        };
  
      case ORDER:
        let orderDogs;
        if (action.payload === "upwards") {
          orderDogs = state.dogs.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
  
        if (action.payload === "weight") {
          orderDogs = state.dogs.sort((a, b) => (a.weight > b.weight ? 1 : -1));
        }
  
        if (action.payload === "downwards") {
          orderDogs = state.dogs.sort((a, b) => (b.id > a.id ? 1 : -1));
        }
        return {
          ...state,
          dogs: [...orderDogs],
        };
  
        case FILTER_BY_TEMPER:
          const index = action.payload;
          const temperToFilter = state.allTempers[index];
          let filteredDogsByTemper;
        
          if (action.payload === "All") {
            filteredDogsByTemper = state.allDogs;
          } else {
            filteredDogsByTemper = state.allDogs.filter((dog) =>
              dog.temperament && dog.temperament.includes(temperToFilter)
            );
          }
          return {
            ...state,
            dogs: filteredDogsByTemper,
          };
        
  
      case FILTER_ALPHABETICALLY:
        let filteredDogs;
        if (action.payload === "abc") {
          filteredDogs = state.dogs
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
        } else if (action.payload === "xyz") {
          filteredDogs = state.dogs
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));
        }
        return {
          ...state,
          dogs: filteredDogs,
        };
  
      case GET_DOGS_FROM_DB:
        const newDogsOrigin = action.payload; // API / DB
        const filteredDogsOrigin = state.allDogs.filter((dog) => {
          return newDogsOrigin === "api" ? !dog.createdAtDatabase : dog.createdAtDatabase;
        });
        return { 
          ...state, 
          dogs: filteredDogsOrigin, 
          dogsOrigin: newDogsOrigin 
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;