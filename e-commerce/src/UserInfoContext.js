import React, { useState, useContext, useEffect } from "react";

const UserInfo = React.createContext();
const UserInfoUpdate = React.createContext();

export function useUserInfo() {
    return useContext(UserInfo);
}

export function useUserInfoUpdate() {
    return useContext(UserInfoUpdate);
}

export function UserInfoProvider({ children }) {
    const [user, setUser] = useState({
        name: null,
        token: null,
    });

    function updateUserInfo({ name, token, remember }) {
        setUser({ name, token });
        console.log("inside context provider", name, token, remember);
        if (remember) localStorage.setItem("token", token);
        else if (localStorage.token) localStorage.removeItem("token");
    }

    useEffect(() => {
        console.log("i am inside this!");
        async function fetchUser() {
            const response = await fetch("http://localhost:9001/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });

            if (response.ok) {
                const userinfo = await response.json();
                console.log("userinfo in context provider", userinfo);
                if (userinfo) {
                    setUser({
                        name: userinfo.name,
                        token: localStorage.token,
                    });
                }
                return userinfo;
            }
            console.log("not authenticated");
            return null;
        }

        if (localStorage && localStorage.token) fetchUser();
    }, []);

    return (
        <UserInfo.Provider value={user}>
            <UserInfoUpdate.Provider value={updateUserInfo}>
                {children}
            </UserInfoUpdate.Provider>
        </UserInfo.Provider>
    );
}
