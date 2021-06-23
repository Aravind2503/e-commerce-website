import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard2(props) {
    const { name, images, category, price, id, brand, manufacturer } =
        props.product;
    const image11 = images[0];

    console.log("this is immagagasdasd", image11.image.data);

    // function encode(input) {
    //     var keyStr =
    //         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    //     var output = "";
    //     var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    //     var i = 0;

    //     while (i < input.length) {
    //         chr1 = input[i++];
    //         chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
    //         chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    //         enc1 = chr1 >> 2;
    //         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    //         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    //         enc4 = chr3 & 63;

    //         if (isNaN(chr2)) {
    //             enc3 = enc4 = 64;
    //         } else if (isNaN(chr3)) {
    //             enc4 = 64;
    //         }
    //         output +=
    //             keyStr.charAt(enc1) +
    //             keyStr.charAt(enc2) +
    //             keyStr.charAt(enc3) +
    //             keyStr.charAt(enc4);
    //     }
    //     return output;
    // }

    var bytes = new Uint8Array(image11.image.data);
    // const encoded = encode(bytes);
    // // console.log("this is the image", image11.image.data);

    let imagee = new Blob([bytes], { type: "image/png" });
    let imageUrl = URL.createObjectURL(imagee);
    // setImage1({ image: imageUrl });

    return (
        <div style={cardStyle}>
            <div style={{ margin: "30px" }}>
                <img
                    // src={`data:image/png;base64, ${encoded}`}
                    src={imageUrl}
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
                >
                    {name}
                </Link>
                <br></br>
                price: <h6>{price} Rs</h6>
                brand: <h6>{brand}</h6>
                manufacturer: <h6>{manufacturer}</h6>
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
    // display: "flex",
    position: "relative",
    padding: "50px 0px",
    justifyContent: "center",
    alignItems: "center",
    overflowWrap: "normal",
};

const linkStyle = {
    // textDecoration: "inherit",
    color: "inherit",
    fontSize: "25px",
};
