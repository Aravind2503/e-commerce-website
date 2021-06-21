import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState({});

    const updateFields = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNhMmRiZjlhMDJjMzNhZDA5YmUwMmEiLCJpYXQiOjE2MjQyNjc1OTF9.c1-M_maUKKpf1x8P9ipZZbkNUzJocvUmTthV4gejtXM",
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
    };

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNhMmRiZjlhMDJjMzNhZDA5YmUwMmEiLCJpYXQiOjE2MjQyNjc1OTF9.c1-M_maUKKpf1x8P9ipZZbkNUzJocvUmTthV4gejtXM",
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
            <div style={profPagestyle} className="profcontainer">
                <h1>User Profile</h1>
                <form onSubmit={updateFields}>
                    <br></br>
                    <label htmlFor="name" style={{ paddingRight: "10px" }}>
                        Name:
                    </label>
                    <input type="text" placeholder={user.name} name="name" />
                    <br></br>
                    <label htmlFor="age" style={{ paddingRight: "10px" }}>
                        Age:
                    </label>
                    <input type="text" placeholder={user.age} name="age" />
                    <br></br>
                    <label htmlFor="email" style={{ paddingRight: "10px" }}>
                        E-mail:
                    </label>
                    <input type="text" placeholder={user.email} name="email" />
                    <br></br>
                    <label htmlFor="email" style={{ paddingRight: "10px" }}>
                        Password:
                    </label>
                    <input type="text" placeholder="******" name="email" />
                    <br></br>

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
