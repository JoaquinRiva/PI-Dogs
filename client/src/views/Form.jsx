import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import validacionForm from "../components/validacionForm";
import { getAllTempers } from "../redux/actions";

function Form() {
  const temperaments = useSelector(state => state.allTempers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTempers());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (
        checked ? [...prevData.temperaments, value] : prevData.temperaments.filter((temp) => temp !== value)
      ) : value,
    }));

    
    const newErrors = validacionForm({
      ...formData,
      [name]: type === "checkbox" ? (
        checked ? [...formData.temperaments, value] : formData.temperaments.filter((temp) => temp !== value)
      ) : value,
    });

    setErrors(newErrors);
  };

  const sendDog = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:3001/dogs",
        formData
      );
      
      if (response.data.id) {
        console.log("Dog created", response.data.id);
        navigate(`/detail/${response.data.id}`);
      } else {
        console.log("Server didn't provide a valid ID for this dog");
      }
    } catch (error) {
      console.log("Error when creating dog", error, formData);
    }
  };

  return (
    <form onSubmit={sendDog}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="height">Height:</label>
      <input type="text" name="height" onChange={handleChange} />
      {errors.height && <p>{errors.height}</p>}

      <label htmlFor="weight">Weight:</label>
      <input type="text" name="weight" onChange={handleChange} />
      {errors.weight && <p>{errors.weight}</p>}

      <label htmlFor="life_span">Life Span:</label>
      <input type="text" name="life_span" onChange={handleChange} />
      {errors.life_span && <p>{errors.life_span}</p>}

      <div>
        <label>Temperaments:</label>
        {temperaments.map((temper) => (
          <label key={temper.id}>
            <input
              type="checkbox"
              name="temperaments"
              value={temper.name}
              checked={formData.temperaments.includes(temper.name)}
              onChange={handleChange}
            />
            {temper.name}
          </label>
        ))}
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default Form;
