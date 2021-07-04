import Searchbar from "./Searchbar";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useUserInfo, useUserInfoUpdate } from "../context/UserInfo";

export default function Navbar(props) {
    const { name: username, token } = useUserInfo();
    const updateUser = useUserInfoUpdate();

    function logout(e) {
        updateUser({
            name: null,
            token: null,
            remember: false,
        });

        async function deleteServerToken() {
            await fetch("http://localhost:9001/users/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        deleteServerToken();

        window.location.replace("/home");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/home">
                        Super Market
                    </Link>
                    <button
                        className="navbar-toggler m-2"
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
                            <li className="nav-item btn-group">
                                {window.location.pathname.includes("/home") ? (
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/search"
                                    >
                                        Search
                                    </Link>
                                ) : (
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/home"
                                    >
                                        Home
                                    </Link>
                                )}
                            </li>
                        </ul>
                        {props.searchBar && (
                            <Searchbar
                                setProducts={props.setProducts}
                                products={props.products}
                            />
                        )}
                        {token && <Cart />}
                        {token ? (
                            <div className="nav-item btn-group">
                                <div
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ whiteSpace: "pre" }}
                                >
                                    {username
                                        ? username
                                              .padEnd(
                                                  (username.length + 18) / 2
                                              )
                                              .padStart(18)
                                        : "USERNAME"}
                                </div>
                                <ul
                                    className="dropdown-menu dropdown-menu-right p-3"
                                    style={{ right: 3, left: "auto" }}
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
                                            to="/order"
                                        >
                                            Order History
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
