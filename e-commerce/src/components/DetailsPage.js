import ImageSlider from "./ImageSlider";
import Navbar from "./Navbar";
import { useEffect } from "react";
import DescList from "./DescriptionList";
import { useUpdateCartInfo } from "../context/CartInfo";
import { useUserInfo } from "../context/UserInfo";

const DetailsPage = (props) => {
    const token = useUserInfo().token;
    const product = props.location.state;
    const { removeProduct: removeCartItem, insertProduct: insertCartItem } =
        useUpdateCartInfo();

    //using this to scroll to the top always at page load
    useEffect(() => {
        window.scrollTo(0, 100);
    }, []);

    var i = 1;
    product.images.forEach((image) => {
        var url = `data:image/png;base64,${image}`;
        fetch(url)
            .then((res) => res.blob())
            .then((data) => console.log("this is the image", data, ++i));
    });

    return (
        <div>
            <div>
                <Navbar search={false} />
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ margin: "0px 0px 0px 50px" }}>
                    <ImageSlider images={product.images} />
                </div>

                <div
                    style={{
                        margin: "100px",
                        padding: "0px 50px",
                        width: "100%",
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
                            height: "500px",
                        }}
                        // className="scrHideEdge scrHideChrome"
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
                                    margin: "30px 0px",
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "orange",
                                    borderColor: "black",
                                }}
                                onClick={(e) => insertCartItem([product._id])}
                            />
                            <input
                                type="Submit"
                                // className="btn-primary"
                                value="Proceed to Checkout"
                                style={{
                                    margin: "10px 0px",
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "lavender",
                                    borderColor: "black",
                                }}
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

export default DetailsPage;
