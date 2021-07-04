import Navbar from "./Navbar";
import {
    useCartInfo,
    useCartProducts,
    useUpdateCartInfo,
} from "../context/CartInfo";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";
import { useEffect, useRef } from "react";
import { useUserInfo } from "../context/UserInfo";

import { MdDone } from "react-icons/md";
import { booleanLiteral } from "@babel/types";

export default function CheckoutPage(props) {
    const cart = useCartInfo();
    const products = useCartProducts();
    const { address, token } = useUserInfo();
    const { placeOrderAndClearCart } = useUpdateCartInfo();
    const loading = useRef();
    const success = useRef();
    const empty = useRef();

    function getTotal() {
        let total = 0;

        for (const product of products) {
            total += parseFloat(product.price) * parseInt(cart[product._id]);
        }

        return total;
    }

    return (
        <div>
            <Navbar />
            <div ref={loading} className="d-none">
                <Loading size="small" />
            </div>

            <div ref={success} className="text-center d-none">
                <MdDone size="144px" />
                <h2>Order Placed Successfully</h2>
            </div>

            {cart.length ? (
                <div
                    className="checkout"
                    style={{ width: "70%", margin: "auto" }}
                >
                    <div className="my-3">
                        <h1>Checkout</h1>
                    </div>
                    <div className="my-3">
                        Your Total:
                        <h5 className="d-inline"> Rs. {getTotal()}</h5>
                    </div>

                    <div
                        style={{
                            overflow: "auto",
                            height: "400px",
                            border: "2px solid lightgrey",
                        }}
                        className="flex-box mt-2 checkout-cart my-3"
                    >
                        <h5 className="mb-3">Your Cart :</h5>
                        {cart.length ? (
                            products.length === cart.length ? (
                                products.map((product, index) => {
                                    return (
                                        <ProductCard2
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

                    <div className="my-3">
                        <div>Your Delivery Address: </div>
                        <div>{address}</div>
                    </div>

                    <div className="my-3 mb-5">
                        Payment :<h5 className="d-inline"> COD</h5>
                    </div>

                    <div className="text-center m-2 fixed-bottom">
                        <button
                            className="btn btn-success px-5"
                            onClick={(e) => {
                                loading.current.classList.toggle("d-none");
                                placeOrderAndClearCart();

                                // empty.current.classList.add("d-none");
                                loading.current.classList.toggle("d-none");
                                success.current.classList.toggle("d-none");
                                // window.location.replace("/order");
                            }}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center" ref={empty}>
                    {/* <h3>Cart Is Empty</h3> */}
                    <Link to="/home">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
}
