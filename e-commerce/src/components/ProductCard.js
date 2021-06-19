export default function ProductCard(props) {
    const { name, image, category, price, id } = props.product;

    return (
        <div
            className="card"
            style={{
                width: "18rem",
                flexDirection: "left",
                textAlign: "center",
                margin: "auto",
            }}
        >
            <img
                src={`data:image/png;base64, ${image}`}
                className="card-img-top"
                alt="product"
            />
            <div className="card-body">
                <h5 className="card-title">Product: {name}</h5>
                <h6>Price: {price}</h6>
                <div>Category: {category}</div>
                <hr />
                <a href="#" className="btn btn-primary">
                    MoreDetails
                </a>
                &nbsp;&nbsp;
                <button className="btn btn-primary">Add To Cart</button>
            </div>
        </div>
    );
}
