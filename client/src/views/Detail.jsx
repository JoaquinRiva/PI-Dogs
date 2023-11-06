import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { normalizeTemperaments } from "../redux/actions"; 

function Detail() {
  const { id } = useParams();
  const [dogs, setDogs] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`)
      .then(({ data }) => {
        if (data.name) {
          data.temperaments = normalizeTemperaments(data); // Normalizo los temperamentos
          setDogs(data);
        } else {
          window.alert("error");
        }
      });
  }, [id]);

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <div>
        <h2>ID: {dogs.id}</h2>
        <img src={dogs.image} alt={dogs.name} />
      </div>
      <h2>NAME: {dogs.name}</h2>
      <h2>Height: {dogs.height}</h2>
      <h2>Weight: {dogs.weight}</h2>
      <h2>LifeSpan: {dogs.life_span}</h2>
      <h2>Temperaments:</h2>
      <ul>
        {dogs.temperaments ? (
          dogs.temperaments.map((temperament, index) => (
            <li key={index}>{temperament}</li>
          ))
        ) : (
          <li>No temperaments available</li>
        )}
      </ul>
    </div>
  );
}

export default Detail;
