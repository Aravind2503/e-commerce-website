import { useCartInfo, useCartProducts } from "../context/CartInfo";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard2 from "./ProductCard2";
import Loading from "./Loading";

export default function CartPage(props) {
    const cart = useCartInfo();
    const products = useCartProducts();

    return (
        <>
            <Navbar />

            {cart.length !== 0 && (
                <div className="text-center m-2 fixed-bottom">
                    <button className="btn btn-success px-5">
                        <Link
                            style={{
                                textDecoration: "None",
                                color: "white",
                            }}
                            to="/checkout"
                        >
                            Checkout
                        </Link>
                    </button>
                </div>
            )}

            <div className="flex-box mt-2 mb-5">
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
        </>
    );
}
