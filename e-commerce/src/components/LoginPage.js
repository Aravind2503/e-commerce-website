import Navbar from "./Navbar";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserInfoUpdate } from "../context/UserInfo";

export default function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberuser, setRememberuser] = useState(false);
    const updateUser = useUserInfoUpdate();
    const errorDiv = useRef();

    function onSubmit(e) {
        e.preventDefault();

        async function login() {
            try {
                const response = await fetch(
                    "http://localhost:9001/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    }
                );

                if (!response.ok) {
                    errorDiv.current.innerHTML =
                        "<div>Wrong Email or Password!</div>Please Try Again...";
                    errorDiv.current.classList.toggle("d-none");
                    errorDiv.current.style.margin = "22px auto auto auto";
                    errorDiv.current.style.width = "70%";

                    return null;
                } else {
                    const userInfo = await response.json();
                    console.log("inside login", userInfo);
                    if (userInfo)
                        updateUser({
                            name: userInfo.user.name,
                            token: userInfo.token,
                            remember: rememberuser,
                        });
                    window.location.replace("/home");
                    return userInfo;
                }
            } catch (err) {
                console.log("Wrong Credentials");
            }
        }

        login().catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <Navbar searchBar={false} />
            <div
                ref={errorDiv}
                className="d-none alert alert-danger text-center"
            ></div>
            <div className="container border border-dark border-4 p-5 mt-4">
                <h1 className="text-center">Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userid" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="userid"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userpassword" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberuser"
                            value={rememberuser}
                            onChange={(e) => {
                                console.log(e.currentTarget.checked);
                                setRememberuser(e.currentTarget.checked);
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberuser"
                        >
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

            <div className="text-center">
                New here ?<Link to="/register"> Register</Link>
            </div>
        </div>
    );
}
