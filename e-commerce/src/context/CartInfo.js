import React, { useContext, useState, useEffect } from "react";

const CartInfo = React.createContext();
const UpdateCartInfo = React.createContext();
const CartProductsInfo = React.createContext();

export function useCartInfo() {
    return useContext(CartInfo);
}

export function useUpdateCartInfo() {
    return useContext(UpdateCartInfo);
}

export function useCartProducts() {
    return useContext(CartProductsInfo);
}

export function CartInfoProvider({ children }) {
    //cart is the list of products
    const [cart, setCart] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    async function fetchProduct(product_id) {
        const response = await fetch("http://localhost:9001/products/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: product_id,
            }),
        });

        if (response.ok) {
            const product = await response.json();
            if (product) {
                product[0].image = product[0].images[0];

                // console.log(
                //     "image data: ",
                //     product[0].images[0].image.data.slice(0, 100)
                // );
                // console.log(
                //     "image data: ",
                //     String.fromCharCode(
                //         product[0].images[0].image.data.slice(0, 100)
                //     )
                // );

                setCartProducts((p) => [...p, ...product]);
                console.log(product_id, "name: ", product, cartProducts);
            }
            return product;
        }
    }

    async function patchCart(token, products) {
        const response = await fetch("http://localhost:9001/cart", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                products: products,
            }),
        });
    }

    const updateCartInfo = {
        insertProduct: function (product) {
            const newCart = [...cart, ...product];
            setCart(newCart);

            fetchProduct(product);

            if (localStorage && localStorage.token)
                patchCart(localStorage.token, newCart);
            else if (sessionStorage && sessionStorage.token)
                patchCart(sessionStorage, newCart);
        },

        removeProduct: function (product) {
            const newCart = cart.filter((p) => product._id !== p);

            setCart(newCart);

            setCartProducts(cartProducts.filter((p) => product._id !== p._id));

            console.log(
                "request to removeProduct",
                product,
                cart,
                cart.filter((p) => product._id !== p),
                cartProducts,
                cartProducts.filter((p) => product._id !== p._id)
            );

            if (localStorage && localStorage.token)
                patchCart(localStorage.token, newCart);
            else if (sessionStorage && sessionStorage.token)
                patchCart(sessionStorage.token, newCart);
        },
    };

    useEffect(() => {
        async function fetchCart(token) {
            const response = await fetch("http://localhost:9001/cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const cartInfo = await response.json();
                setCart(cartInfo);

                cartInfo.forEach((item) => {
                    fetchProduct(item);
                });

                console.log(
                    "in useEffect of cart context",
                    cartInfo,
                    cartProducts
                );
            } else {
                console.log("error", response);
            }
        }

        if (localStorage && localStorage.token) fetchCart(localStorage.token);
        else if (sessionStorage && sessionStorage.token)
            fetchCart(sessionStorage.token);
    }, []);

    return (
        <CartInfo.Provider value={cart}>
            <UpdateCartInfo.Provider value={updateCartInfo}>
                <CartProductsInfo.Provider value={cartProducts}>
                    {children}
                </CartProductsInfo.Provider>
            </UpdateCartInfo.Provider>
        </CartInfo.Provider>
    );
}
