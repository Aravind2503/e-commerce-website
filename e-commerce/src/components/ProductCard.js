import { useUpdateCartInfo } from "../context/CartInfo";
import ProductButton from "./ProductButton";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const { name, image, category, price, _id } = props.product;
    const { removeProduct: removeCartItem, insertProduct: insertCartItem } =
        useUpdateCartInfo();
    return (
        <>
            {/* <div className="card flex-element my-2">
                <img
                    src={`data:image/png;base64, ${image}`}
                    width="240px"
                    height="240px"
                    className="card-img-top"
                    alt="product"
                />
                <div className="card-body">
                    <h5 className="card-title">Product: {name}</h5>
                    <h6>Price: {price}</h6>
                    <div>Category: {category}</div>
                    <hr />
                    <button href="#" className="btn btn-primary m-1">
                        MoreDetails
                    </button>
                    <button className="btn btn-primary m-1">Add To Cart</button>
                </div>
            </div> */}

            <div className="product-container flex-box">
                <div className="product-image me-2">
                    <img
                        src={`data:image/png;base64, ${image}`}
                        height="220px"
                        alt={name}
                    />
                </div>

                <div className="product-info ms-2">
                    <h5 className="product-name" style={{ width: "100%" }}>
                        Product: {name}
                    </h5>
                    <h6 className="product-price">Price: {price}</h6>
                    <div>Category: {category}</div>
                    <hr />
                    <Link
                        to="/details"
                        to={{
                            pathname: "/details",
                            state: props.product,
                        }}
                    >
                        <button className="btn btn-primary m-1">
                            MoreDetails
                        </button>
                    </Link>

                    {/* {props.removeButton ? (
                        <button
                            className="btn btn-primary m-1"
                            onClick={(e) => removeCartItem(_id)}
                        >
                            Remove Item
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary m-1"
                            onClick={(e) => insertCartItem(_id)}
                        >
                            Add To Cart
                        </button>
                    )} */}

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
                    )}
                </div>
            </div>
            <div className="separator">
                <hr />
            </div>
        </>
    );
}
