import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getAllTempers } from "../redux/actions";
import { Paginacion } from "../components/Paginacion";

import Card from "../components/Card";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);
  const maximo = dogs.length / porPagina

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTempers())
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <NavBar />
      <div>
        {dogs.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((dog) => {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              height={dog.height}
              weight={dog.weight}
              life_span={dog.life_span}
              temperaments={dog.temperaments}
            />
          );
        })}
      </div>
      
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
    </div>
  );
}

export default Home;
