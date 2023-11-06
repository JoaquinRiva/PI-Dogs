import { useState } from "react";
import {useDispatch} from "react-redux";
import { getDogsByName } from "../redux/actions";

export default function SearchBar() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const handleSearch = ()=> {
        dispatch(getDogsByName(name))
    }
    return(
        <div>
            <input 
            type="search"
            value={name}
            onChange={(event=> setName(event.target.value))}
            
            placeholder="Buscar Raza" 
            />
            <div>
              <button className="boton" onClick={handleSearch}>Buscar</button>  
            </div>
            
                
            
        </div>
    )
}