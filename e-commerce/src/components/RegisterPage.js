import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useUserInfoUpdate } from "../context/UserInfo";

export default function RegisterPage(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(undefined);
    const [password, setPassword] = useState("");
    const [rememberuser, setRememberuser] = useState(true);

    const errorDiv = useRef();
    const updateUser = useUserInfoUpdate();

    function onSubmit(e) {
        e.preventDefault();
        console.log({
            name,
            email,
            age,
            password,
        });
        async function register() {
            const response = await fetch("http://localhost:9001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    age,
                    password,
                }),
            });

            console.log("response", response);
            if (response.ok) {
                const userinfo = await response.json();
                console.log(userinfo);

                updateUser({
                    name: userinfo.user.name,
                    token: userinfo.token,
                    remember: rememberuser,
                });

                window.location.replace("/home");
                return userinfo;
            } else {
                const error = await response.json();

                if (error.email)
                    errorDiv.current.innerHTML =
                        "Email Already In Use. Please Use Other Email";
                else errorDiv.current.innerHTML = error.message;

                errorDiv.current.classList.toggle("d-none");
                errorDiv.current.style.margin = "22px auto auto auto";
                errorDiv.current.style.width = "70%";
            }
        }

        register().catch((err) => {
            console.log(err);
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
                <h1 className="text-center">Register</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username :
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userage" className="form-label">
                            Age :
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="userage"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberuser"
                            checked={rememberuser}
                            onChange={(e) =>
                                setRememberuser(e.currentTarget.checked)
                            }
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
                Already A User ?<Link to="/login"> Login</Link>
            </div>
        </div>
    );
}
