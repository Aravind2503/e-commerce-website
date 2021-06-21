import Searchbar from "./Searchbar";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useUserInfo, useUserInfoUpdate } from "../UserInfoContext";

export default function Navbar(props) {
    const username = useUserInfo().name;
    const updateUser = useUserInfoUpdate();

    function logout(e) {
        updateUser({
            name: null,
            token: null,
            remember: false,
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-4" to="/home">
                        Super Market
                    </Link>
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
                                <li className="nav-item btn-group">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/search"
                                    >
                                        Search
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {props.searchBar && (
                            <Searchbar
                                setProducts={props.setProducts}
                                products={props.products}
                            />
                        )}
                        {props.searchBar && <Cart />}

                        {username ? (
                            <div className="nav-item btn-group me-4">
                                <div
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {username || "USERNAME"}
                                </div>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/cart"
                                        >
                                            Go to cart
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/profile"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="nav-item btn-group me-4 text-white me-4 ms-2"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
