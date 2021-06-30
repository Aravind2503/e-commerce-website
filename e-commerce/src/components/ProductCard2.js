import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUpdateCartInfo } from "../context/CartInfo";
<<<<<<< HEAD
import { useUserInfo } from "../context/UserInfo";

export default function ProductCard2(props) {
    const token = useUserInfo().token;

    // useEffect(() => {}, []);

=======
import ProductButton from "./ProductButton";

export default function ProductCard2(props) {
>>>>>>> 27e7e16bf69cb00350e6ef3e49fa68a6fececd73
    const { name, images, category, price, _id, brand, manufacturer } =
        props.product;

    const { removeProduct: removeCartItem, insertProduct: insertCartItem } =
        useUpdateCartInfo();
    const image = images[0];

    return (
        <div className="flex-box p-2 m-2 mt-1 pt-1 bg-light">
            <div
                className="flex-element flex-image p-1 m-1 border-0"
                style={{
                    flexBasis: "30%",
                    flexGrow: "0",
                    flexShrink: "initial",
                }}
            >
                <img
                    src={`data:image/png;base64, ${image}`}
                    width="250px"
                    height="250px"
<<<<<<< HEAD
                    // className="card-img-top"
=======
>>>>>>> 27e7e16bf69cb00350e6ef3e49fa68a6fececd73
                    alt="product"
                    style={{ objectFit: "fixed" }}
                />
            </div>
            <div
                className="flex-element product-info p-1 m-1 border-0"
                style={{ flexBasis: "40%" }}
            >
                <Link
                    to={{
                        pathname: "/details",
                        state: props.product,
                    }}
                    className="linkHover"
                >
                    <h3>{name}</h3>
                </Link>

                <div>
                    price: <h4 className="d-inline">{price} Rs</h4>
                </div>

                <div>
                    brand: <h6 className="d-inline">{brand}</h6>
                </div>
                <div>
                    manufacturer: <h6 className="d-inline">{manufacturer}</h6>
                </div>
            </div>
            <div
                className="flex-element p-1 m-1 mb-4 text-center border-0"
                style={{
                    flexBasis: "20%",
                    flexShrink: "6",
                }}
            >
<<<<<<< HEAD
                {token ? (
                    <input
                        type="submit"
                        value="Add to Cart"
                        style={{
                            padding: "10px",
                            backgroundColor: "orange",
                            borderColor: "black",
                        }}
                        onClick={(e) => insertCartItem([_id])}
                    />
                ) : (
                    <div></div>
=======
                {!props.inCart ? (
                    <button
                        className="p-2 bg-warning"
                        onClick={(e) => insertCartItem(_id)}
                    >
                        Add to Cart
                    </button>
                ) : (
                    <ProductButton
                        productId={_id}
                        quantity={props.quantity}
                        removeItem={(e) => removeCartItem(_id)}
                        insertItem={(e) => insertCartItem(_id)}
                    />
>>>>>>> 27e7e16bf69cb00350e6ef3e49fa68a6fececd73
                )}
            </div>
            <hr className="flex-separator" />
        </div>
    );
}
