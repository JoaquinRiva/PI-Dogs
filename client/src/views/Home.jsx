import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getAllTempers } from "../redux/actions";
import Card from "../components/Card";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTempers())
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {dogs.map((dog) => {
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
      <h1>Home</h1>
    </div>
  );
}

export default Home;
