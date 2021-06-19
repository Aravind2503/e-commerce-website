import Searchbar from "./Searchbar";

export default function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">
                        Supermarket
                    </a>
                    {props.searchBar && (
                        <Searchbar setProducts={props.setProducts} />
                    )}
                    <a className="navbar-brand" href="/search">
                        Search
                    </a>
                    <a className="navbar-brand" href="/profile">
                        {props.username || "Username"}
                    </a>
                </div>
            </nav>
        </>
    );
}
