import Navbar from "./Navbar";
import { useCartInfo, useCartProducts } from "../context/CartInfo";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";
import { useEffect } from "react";
import { useUserInfo } from "../context/UserInfo";

export default function CheckoutPage(props) {
    const cart = useCartInfo();
    const products = useCartProducts();
    const { address, token } = useUserInfo();

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
            <div className="checkout" style={{ width: "70%", margin: "auto" }}>
                <div className="my-3">
                    <h1>Checkout</h1>
                </div>
                <div className="my-3">
                    Your Total:<h5 className="d-inline"> Rs. {getTotal()}</h5>
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
                    <button className="btn btn-success px-5">
                        <Link
                            style={{ textDecoration: "None", color: "white" }}
                            to="#"
                        >
                            Place Order
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
