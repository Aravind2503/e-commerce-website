export default function ProductCard(props) {
    const { name, image, category, price, id } = props.product;

    return (
        <div className="card flex-element">
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
                <a href="#" className="btn btn-primary m-1">
                    MoreDetails
                </a>
                <button className="btn btn-primary m-1">Add To Cart</button>
            </div>
        </div>
    );
}
