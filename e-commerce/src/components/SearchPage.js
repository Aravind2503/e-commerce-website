import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useState } from "react";

export default function SearchPage(props) {
    const [products, setProducts] = useState([]);

    return (
        <>
            <Navbar searchBar={true} setProducts={setProducts} />
            <div style={{ display: "flex" }}></div>
            {products.map((product) => {
                return <ProductCard product={product} key={product.id} />;
            })}
        </>
    );
}
