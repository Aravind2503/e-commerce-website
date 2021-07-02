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
        else {
            sessionStorage.setItem("token", token);
            if (localStorage.token) localStorage.removeItem("token");
        }
    }

    useEffect(() => {
        async function fetchUser(token) {
            const response = await fetch("http://localhost:9001/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userinfo = await response.json();
                console.log("userinfo in context provider", userinfo);
                if (userinfo) {
                    setUser({
                        name: userinfo.name,
                        token: token,
                        address: userinfo.address,
                    });
                }
                return userinfo;
            }
            console.log("not authenticated");
            return null;
        }

        if (localStorage && localStorage.token) fetchUser(localStorage.token);
        else if (sessionStorage && sessionStorage.token)
            fetchUser(sessionStorage.token);
    }, []);

    return (
        <UserInfo.Provider value={user}>
            <UserInfoUpdate.Provider value={updateUserInfo}>
                {children}
            </UserInfoUpdate.Provider>
        </UserInfo.Provider>
    );
}
