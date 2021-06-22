import { removeProperties } from "@babel/types";
import React ,{ useRef, useState, useEffect  } from "react";

const CartInfo = React.createContext();
const UpdateCartInfo = React.createContext();

export function useCartInfo() {
    return CartInfo;
}

export function useUpdateCartInfo() {
    return UpdateCartInfo;
}


export function CartInfoProvider({children}) {
    //cart is the list of products
    const [cart, setCart] = useState([]);

    const updateCartInfo = {
        insertProduct: function(product) {
            setCart((cart) => {
                return [...cart, ...product]
            })
        },

        removeProduct: function(product) {
            setCart((cart) => cart.filter((p) => product._id !== p._id))
        }
    }


    useEffect(() => {
        async function fetchCart(token) {
            const response = await fetch("http://localhost:9001/cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.ok) {
                const cartInfo = await response.json();

                setCart(cartInfo);
            }
        }

        if(localStorage && localStorage.token) fetchCart(localStorage.token);
        else if(sessionStorage && sessionStorage.token) fetchCart(sessionStorage);
    })


    return (
        <CartInfo.Provider value={cart}>
            <UpdateCartInfo value={updateCartInfo}>
                {children}
            </UpdateCartInfo>
        </CartInfo.Provider>
    )
}