import { useEffect, useState, useRef } from "react";
import { useUserInfo } from "../context/UserInfo";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";

export default function OrderProductCard({ products_quantity, item }) {
    const [products, setProducts] = useState([]);
    const { token } = useUserInfo();
    const productListDiv = useRef();
    const dropdown = useRef();
    const dropup = useRef();

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
            }
            setProducts((p) => [...p, ...product]);
            // console.log("product in orderpage", product_id);
            return product;
        }
    }

    useEffect(() => {
        Object.keys(products_quantity).forEach((key) => {
            if (key !== "length") fetchProduct(key);
        });
    }, [products_quantity]);

    return (
        <div>
            <h5
                onClick={(e) => {
                    productListDiv.current.classList.toggle("d-none");
                    dropdown.current.classList.toggle("d-none");
                    dropup.current.classList.toggle("d-none");
                }}
            >
                {item.createdAt.split("T")[0]}
                <div ref={dropup} className="d-none d-inline mx-2">
                    <IoMdArrowDropupCircle size="16px" className="m-auto" />
                </div>

                <div ref={dropdown} className="d-inline mx-2">
                    <IoMdArrowDropdownCircle size="16px" className="m-auto" />
                </div>
            </h5>

            <div style={{ fontSize: "12px" }}>
                <div>Time: {item.createdAt.split("T")[1].split(".")[0]}</div>
                <div>OrderID: {item._id}</div>
                <div>Number of Products: {item.products.length}</div>
            </div>

            <div ref={productListDiv} className="d-none">
                {products.length !==
                Object.keys(products_quantity).length - 1 ? (
                    <div>
                        <Loading size="small" />
                        {"products length = " +
                            products.length +
                            "    products_quantity =" +
                            Object.keys(products_quantity).length}

                        {"products  = " +
                            JSON.stringify(products.length) +
                            "    products_quantity =" +
                            JSON.stringify(Object.keys(products_quantity))}
                    </div>
                ) : (
                    products.map((product, index) => {
                        const {
                            name,
                            image,
                            category,
                            price,
                            _id,
                            manufacturer,
                            brand,
                        } = product;
                        return (
                            <div
                                className="flex-box p-2 m-2 mt-1 pt-1 bg-light"
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                key={_id}
                            >
                                <div
                                    className="flex-element flex-image p-1 m-1 border-0"
                                    style={{
                                        flexBasis: "45%",
                                        flexGrow: "0",
                                        flexShrink: "initial",
                                    }}
                                >
                                    <img
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
                                    style={{
                                        flexBasis: "50%",
                                    }}
                                >
                                    {category !== "Fashion" ? (
                                        <Link
                                            to={{
                                                pathname: "/details",
                                                state: product,
                                            }}
                                            className="linkHover"
                                        >
                                            <h3>{name}</h3>
                                        </Link>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: "/detailsfashion",
                                                state: product,
                                            }}
                                            className="linkHover"
                                        >
                                            <h3>{name}</h3>
                                        </Link>
                                    )}

                                    <div>
                                        price:{" "}
                                        <h4 className="d-inline">{price} Rs</h4>
                                    </div>

                                    <div>
                                        brand:{" "}
                                        <h6 className="d-inline">{brand}</h6>
                                    </div>
                                    <div>
                                        manufacturer:{" "}
                                        <h6 className="d-inline">
                                            {manufacturer}
                                        </h6>
                                    </div>
                                    <div>
                                        quantity:{" "}
                                        <h6 className="d-inline">
                                            {products_quantity[_id]}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
