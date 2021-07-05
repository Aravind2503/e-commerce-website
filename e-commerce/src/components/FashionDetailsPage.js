import ImageSlider from "./ImageSlider";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DescList from "./DescriptionList";
import { useUpdateCartInfo } from "../context/CartInfo";
import { useUserInfo } from "../context/UserInfo";
import { FaShareAltSquare } from "react-icons/fa";

const FashionDetailsPage = (props) => {
    const token = useUserInfo().token;
    const product = props.location.state;
    const { removeProduct: removeCartItem, insertProduct: insertCartItem } =
        useUpdateCartInfo();

    const [size, setSize] = useState();
    const [colour, setColour] = useState();

    const sizeArray = product.size.split(",");
    const colourArray = product.colour.split(",");

    //using this to scroll to the top always at page load
    useEffect(() => {
        window.scrollTo(0, 100);
    }, []);

    // var i = 1;
    // product.images.forEach((image) => {
    //     var url = `data:image/png;base64,${image}`;
    //     fetch(url)
    //         .then((res) => res.blob())
    //         .then((data) => console.log("this is the image", data, ++i));
    // });

    return (
        <div>
            <div>
                <Navbar search={false} />
            </div>
            <div className="flex-box  m-5 small-margin-0">
                <div
                    className="flex-item flex-image"
                    style={{ flexBasis: "20%", justifyContent: "center" }}
                >
                    <ImageSlider
                        images={product.images}
                        style={{ margin: "auto" }}
                    />
                </div>

                <div
                    className="flex-item product-info"
                    style={{
                        flexBasis: "50%",
                        flexGrow: "10",
                        justifyContent: "center",
                    }}
                >
                    <h3
                        style={{
                            borderBottom: "1px solid black",
                            padding: "20px 0px",
                        }}
                    >
                        {product.name}
                    </h3>
                    <br></br>

                    <div
                        style={{
                            overflowY: "scroll",
                            height: "300px",
                        }}
                    >
                        <h4>Price</h4>
                        <p>{product.price} Rs</p>
                        <br></br>

                        <h4>Brand</h4>
                        <p>{product.brand}</p>
                        <br></br>

                        <h4>Manufacturer</h4>
                        <p>{product.manufacturer}</p>
                        <br></br>

                        {sizeArray[0] !== "" ? (
                            <>
                                <h4>Size</h4>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    {sizeArray.map((size, index) => {
                                        return (
                                            <option value={size} key={index}>
                                                {size}
                                            </option>
                                        );
                                    })}
                                </select>
                                <br></br>
                                <br></br>
                            </>
                        ) : (
                            <></>
                        )}

                        {colourArray[0] !== "" ? (
                            <>
                                <h4>Colour</h4>

                                <select
                                    value={colour}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    {colourArray.map((colour, index) => {
                                        return (
                                            <option value={colour} key={index}>
                                                {colour}
                                            </option>
                                        );
                                    })}
                                </select>
                                <br></br>
                                <br></br>
                            </>
                        ) : (
                            <></>
                        )}

                        <h4>Product Description</h4>
                        {/* <p>{product.description}</p> */}
                        <DescList desc={product.description} />
                    </div>

                    {token ? (
                        <>
                            <input
                                type="Submit"
                                // className="btn-primary"
                                value="Add to Cart"
                                style={{
                                    // margin: "30px 0px",
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "orange",
                                    borderColor: "black",
                                }}
                                onClick={(e) => insertCartItem([product._id])}
                            />
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FashionDetailsPage;
