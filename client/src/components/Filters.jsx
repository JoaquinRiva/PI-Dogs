import { useDispatch, useSelector } from "react-redux";
import { orderCards, filterByTemper, filterAlphabetically, filterFromDb } from "../redux/actions"
function Filters() {
    const dispatch = useDispatch()
    const allTempers = useSelector(state=> state.allTempers)

    const handleOrder = (event)=>{
        dispatch(orderCards(event.target.value))
    }

    const handleFilterByTemper = (event)=>{
        console.log(event.target.value)
        dispatch(filterByTemper(event.target.value))
    }

    const handleAlphabeticalFilter = (event) => {
        const filterValue = event.target.value; 
        dispatch(filterAlphabetically(filterValue));
      };

    const handleFilterDb = (event)=>{
      console.log(event.target.value)
      dispatch(filterFromDb(event.target.value))
    }
  return (
    <div>
      <select onChange={handleFilterDb}>
        <option value="api">API</option>
        <option value="db">Perros creados</option>
      </select>

      <select onChange={handleAlphabeticalFilter}>
        <option value="abc">A-Z</option>
        <option value="xyz">Z-A</option>
      </select>

      <select onChange={handleOrder}>
        <option value="upwards">De arriba para abajo</option>
        <option value="downwards">De abajo para arriba</option>
        <option value="weight">Por peso</option>
      </select>

      <select onChange={handleFilterByTemper}>
                <option value="All">All</option>
           {allTempers.map((temperament, index)=>{
            return <option key={index} value={index}>{temperament}</option>
           })}
           </select>
    </div>
  );
}

export default Filters;