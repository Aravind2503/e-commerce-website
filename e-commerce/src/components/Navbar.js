import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand ms-4" href="/home">
                        Super Market
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!props.searchBar && (
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/search"
                                    >
                                        Search
                                    </a>
                                </li>
                            )}
                        </ul>
                        {props.searchBar && (
                            <Searchbar
                                setProducts={props.setProducts}
                                products={props.products}
                            />
                        )}

                        {props.username ? (
                            <div className="nav-item btn-group me-4">
                                <div
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {props.username || "USERNAME"}
                                </div>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/cart"
                                        >
                                            Go to cart
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/profile"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/logout"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="text-white me-4 ms-2">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
