import Filters from "./Filters";
import SearchBar from "./SearchBar";

function NavBar () {
    return(
        <div>
            <SearchBar />
            <Filters />
        </div>
    )
}

export default NavBar;