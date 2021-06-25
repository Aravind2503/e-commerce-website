import { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateCartInfo } from "../context/CartInfo";

export default function ProductCard2(props) {
    const { name, images, category, price, id, brand, manufacturer } =
        props.product;

    const { removeProduct: removeCartItem, insertProduct: insertCartItem } =
        useUpdateCartInfo();
    const image = images[0];

    return (
        <div style={cardStyle}>
            <div style={{ margin: "30px" }}>
                <img
                    src={`data:image/png;base64, ${image}`}
                    width="250px"
                    height="250px"
                    className="card-img-top"
                    alt="product"
                    style={{ float: "left", objectFit: "fill" }}
                />
            </div>
            <div style={info}>
                <Link
                    style={linkStyle}
                    to={{
                        pathname: "/details",
                        state: props.product,
                    }}
                    className="linkHover"
                >
                    {name}
                </Link>
                <br></br>
                price: <h6>{price} Rs</h6>
                brand: <h6>{brand}</h6>
                manufacturer: <h6>{manufacturer}</h6>
            </div>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "30px",
                    marginRight: "0",
                    marginLeft: "auto",
                    display: "block",
                }}
                className="AddCartButton"
            >
                <input
                    type="submit"
                    value="Add to Cart"
                    style={{
                        padding: "10px",
                        backgroundColor: "orange",
                        borderColor: "black",
                    }}
                    onClick={(e) => insertCartItem([id])}
                />
            </div>
        </div>
    );
}

const cardStyle = {
    display: "flex",
    width: "100%",
    margin: "20px",
    padding: "5px",
    borderBottom: "2px solid grey",
};

const info = {
    position: "relative",
    padding: "50px 0px",
    justifyContent: "center",
    alignItems: "center",
    overflowWrap: "normal",
};

const linkStyle = {
    // textDecoration: "inherit",
    // color: "black",
    fontSize: "25px",
};
