import {
    useCartInfo,
    useCartProducts,
    useUpdateCartInfo,
} from "../context/CartInfo";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

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
                                    removeButton={true}
                                    product={product}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <div className="text-center">
                            <h3>Loading Please Wait...</h3>
                        </div>
                    )
                ) : (
                    <div className="text-center">
                        <h3>Cart Is Empty</h3>
                        <Link to="/search">Continue Shopping</Link>
                    </div>
                )}
            </div>
        </>
    );
}
