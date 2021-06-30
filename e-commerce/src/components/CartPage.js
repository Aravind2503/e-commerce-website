import {
    useCartInfo,
    useCartProducts,
    useUpdateCartInfo,
} from "../context/CartInfo";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

export default function CartPage(props) {
    const cart = useCartInfo();
    const products = useCartProducts();

    return (
        <>
            <Navbar />
            <div className="flex-box mt-2">
                {cart.length ? (
                    products.length === cart.length ? (
                        products.map((product, index) => {
                            return (
                                <ProductCard
                                    inCart={true}
                                    quantity={cart[product._id]}
                                    removeButton={true}
                                    product={product}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <Loading size="small">Loading Cart...</Loading>
                    )
                ) : (
                    <div className="text-center">
                        <h3>Cart Is Empty</h3>
                        <Link to="/home">Continue Shopping</Link>
                    </div>
                )}
            </div>
        </>
    );
}
