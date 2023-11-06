import { Link } from "react-router-dom";

function Card({ id, image, name, height, weight, life_span, temperaments }) {
  return (
    <div key={id}>
      <div>
        <img src={image} alt={name} />
        <h2>NAME: {name}</h2>
        <p>ID: {id}</p>
        <p>height: {height}</p>
        <p>weight: {weight}</p>
        <p>lifespan: {life_span}</p>
        <p>temperaments:</p>
        <ul>
          {temperaments.map((temperament, index) => (
            <li key={index}>{temperament}</li>
          ))}
        </ul>
        <Link to={`/detail/${id}`}>
          <button>Details of {name}</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;