import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function NavBar () {
    return(
        <div>
            <Link to='/'>
            <button>Inicio</button>
            </Link>
            <SearchBar />
            <Filters />
            <Link to='/form'>
                <button>Creacion de raza</button>
            </Link>
            
        </div>
    )
}

export default NavBar;