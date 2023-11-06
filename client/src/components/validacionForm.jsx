const validacionForm = (data)=>{
  const errors = {};

  if (data.name.length > 20) {
    errors.name = "The name cannot be longer than 20 characters";
  }

  if (data.height < 10 || data.height > 150) {
    errors.height = "A height between 10 cm to 150 cm is recommended for realism";
  }

  if (data.weight < 5 || data.weight > 70) {
    errors.weight = "A weight between 5 kg to 70 kg is recommended for realism";
  }

  if (data.life_span < 3 || data.life_span > 20) {
    errors.life_span = "The average lifespan for a healthy dog is between 3 to 20 years";
  }

  return errors;
};
export default validacionForm;