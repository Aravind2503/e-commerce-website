import ImageSlider from "./ImageSlider";
import Navbar from "./Navbar";
import { useEffect } from "react";
import DescList from "./DescriptionList";
import { useUpdateCartInfo } from "../context/CartInfo";
import { useUserInfo } from "../context/UserInfo";

const DetailsPage = (props) => {
    const token = useUserInfo().token;
    const product = props.location.state;
    const { insertProduct: insertCartItem } = useUpdateCartInfo();

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
            <div className="flex-box m-5 small-margin-0">
                <div
                    className="flex-item flex-image mt-4"
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
                            height: "400px",
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

export default DetailsPage;
