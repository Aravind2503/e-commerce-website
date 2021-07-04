import { useRef } from "react";
import { Link } from "react-router-dom";
import { useUpdateCartInfo } from "../context/CartInfo";
import { useUserInfo } from "../context/UserInfo";
import ProductButton from "./ProductButton";

export default function ProductCard2(props) {
    const token = useUserInfo().token;
    const linkToDetails = useRef();
    // useEffect(() => {}, []);

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
                    onClick={(e) => {
                        linkToDetails.current.click();
                    }}
                    src={`data:image/png;base64, ${image}`}
                    width="250px"
                    height="250px"
                    // className="card-img-top"
                    alt="product"
                    style={{ objectFit: "fixed" }}
                />
            </div>
            <div
                className="flex-element product-info p-1 m-1 border-0"
                style={{ flexBasis: "40%" }}
            >
                {category !== "Fashion" ? (
                    <Link
                        to={{
                            pathname: "/details",
                            state: props.product,
                        }}
                        className="linkHover"
                        ref={linkToDetails}
                    >
                        <h3>{name}</h3>
                    </Link>
                ) : (
                    <Link
                        to={{
                            pathname: "/detailsfashion",
                            state: props.product,
                        }}
                        className="linkHover"
                    >
                        <h3>{name}</h3>
                    </Link>
                )}

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
                {!props.inCart ? (
                    token && (
                        <button
                            className="p-2 bg-warning"
                            onClick={(e) => insertCartItem(_id)}
                        >
                            Add to Cart
                        </button>
                    )
                ) : (
                    <ProductButton
                        productId={_id}
                        quantity={props.quantity}
                        removeItem={(e) => removeCartItem(_id)}
                        insertItem={(e) => insertCartItem(_id)}
                    />
                )}
            </div>
            <hr className="flex-separator" />
        </div>
    );
}
