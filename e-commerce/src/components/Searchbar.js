import { useState } from "react";
// import { Link } from "react-router-dom";

export default function Searchbar(props) {
    const [product, setProduct] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        console.log("here i am");
        console.log(product);

        props.setProducts(
            props.products.filter((p) =>
                p.name
                    .toLowerCase()
                    .trim()
                    .includes(product.toLowerCase().trim())
            )
        );

        setProduct("");
    }

    return (
        <form action="/search" className="d-flex mx-3" onSubmit={onSubmit}>
            <input
                className="form-control me-2 search-box"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={product}
                onChange={(e) => setProduct(e.target.value.toLowerCase())}
            />
            <button
                className="btn btn-outline-success text-white search-button mx-2"
                type="submit"
            >
                {/* <Link to="/search">Search</Link> */}Search
            </button>
        </form>
    );
}
