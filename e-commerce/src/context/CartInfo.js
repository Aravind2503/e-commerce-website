import React, { useContext, useState, useEffect } from "react";
import { useUserInfo } from "./UserInfo";

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
    const [cart, setCart] = useState({ length: 0 });
    const [cartProducts, setCartProducts] = useState([]);
    const { token } = useUserInfo();

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
        if (products.__proto__) delete products.__proto__;
        console.log("PATCH CART ::::", products);
        const response = await fetch("http://localhost:9001/cart", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                products,
            }),
        });
    }

    const updateCartInfo = {
        insertProduct: function (productId) {
            const newCart = JSON.parse(JSON.stringify(cart));

            if (cart[productId] !== undefined) {
                newCart[productId] += 1;
            } else {
                newCart[productId] = 1;
                newCart.length += 1;
                fetchProduct(productId);
            }

            setCart(newCart);

            if (token) patchCart(token, newCart);
        },

        removeProduct: function (productId) {
            const newCart = JSON.parse(JSON.stringify(cart));

            if (cart[productId] !== undefined) {
                if (cart[productId] <= 1) {
                    delete newCart[productId];
                    newCart.length -= 1;
                    setCartProducts(
                        cartProducts.filter((p) => productId !== p._id)
                    );
                } else {
                    newCart[productId] -= 1;
                }
            }
            setCart(newCart);

            console.log(
                "request to removeProduct",
                productId,
                cart,
                cartProducts
            );

            if (token) patchCart(token, newCart);
        },

        clear: function () {
            setCart({ length: 0 });
            patchCart(token, { length: 0 });
        },

        placeOrder: function () {
            async function orderUpdate() {
                const res = await fetch("http://localhost:9001/order", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        history: cart,
                    }),
                });

                if (res) {
                    console.log(await res.json());
                }
            }
            if (cart.length >= 1) orderUpdate();
        },

        placeOrderAndClearCart: function () {
            updateCartInfo.placeOrder();
            updateCartInfo.clear();
        },
    };

    useEffect(() => {
        // console.log("in cart info, ", token);
        async function fetchCart(token) {
            const response = await fetch("http://localhost:9001/cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const cartInfo = await response.json();
                cartInfo.length = parseInt(cartInfo.length);
                setCart(cartInfo);

                Object.keys(cartInfo).forEach((key) => {
                    if (key !== "length") fetchProduct(key);
                });

                // console.log(
                //     "in useEffect of cart context",
                //     cartInfo,
                //     cartProducts
                // );
            } else {
                console.log("error", response);
            }
        }

        if (token) fetchCart(token);
    }, [token]);

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
