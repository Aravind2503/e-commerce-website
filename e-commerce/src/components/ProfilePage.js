import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useUserInfo } from "../context/UserInfo";
import Loading from "./Loading";

const ProfilePage = () => {
    const token = useUserInfo().token;
    console.log(token);
    const [user, setUser] = useState({});

    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();

    const deleteUser = (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to delete your Profile ?")) {
            // e.preventDefault();
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch("http://localhost:9001/users/me", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    // setUser(data); // delete all the items from the cart here
                    console.log("delete route data", data);
                    window.location.replace("/home");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const updateFields = (e) => {
        // e.preventDefault();
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                age,
                email,
                password,
                address,
            }),
        };
        fetch("http://localhost:9001/users/me", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        fetch("http://localhost:9001/users/me", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    return token ? (
        <div>
            <div>
                <Navbar search={false} />
            </div>
            <div className="container">
                <h1>User Profile</h1>

                <br></br>
                <form onSubmit={updateFields}>
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        // value={user.name}
                        placeholder={user.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label">
                        Age
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        // value={user.age}
                        placeholder={user.age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label">
                        Delivery Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        // value={user.age}
                        placeholder={user.address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        // value={user.email}
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="**********"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="Submit"
                        value="Update"
                        className="btn-primary"
                        style={{ width: "100%" }}
                    />
                </form>
                <form onSubmit={deleteUser}>
                    <input
                        type="Submit"
                        value="Delete"
                        // className="btn-primary"
                        style={{
                            width: "100%",
                            backgroundColor: "red",
                            borderColor: "red",
                            color: "white",
                        }}
                    />
                </form>
            </div>
        </div>
    ) : (
        <Loading>loading...</Loading>
    );
};

export default ProfilePage;

const profPagestyle = {};
