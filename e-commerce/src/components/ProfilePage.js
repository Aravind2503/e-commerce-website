import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useUserInfoUpdate } from "../UserInfoContext";

const ProfilePage = () => {
    const [user, setUser] = useState({});

    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const updateFields = (e) => {
        // e.preventDefault();
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwZDQzOTU3OTkxYTNkZWMxNWFlYTUiLCJpYXQiOjE2MjQyOTg1NTN9.naWSz7ur4TBDqvCuecEjrkj6ek0y8LU7wLYABCkEe94`,
            },
            body: JSON.stringify({
                name,
                age,
                email,
                password,
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
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwZDQzOTU3OTkxYTNkZWMxNWFlYTUiLCJpYXQiOjE2MjQyOTg1NTN9.naWSz7ur4TBDqvCuecEjrkj6ek0y8LU7wLYABCkEe94",
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
    }, []);

    return (
        <div>
            <div>
                <Navbar search={false} />
            </div>
            <div className="profcontainer">
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
                    />
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;

const profPagestyle = {};
