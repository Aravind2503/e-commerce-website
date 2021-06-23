import Navbar from "./Navbar";
import ProductCard from "./ProductCard2";
import { useState, useEffect } from "react";

export default function SearchPage2() {
    const [products, setProducts] = useState({});
    const [productSubSet, setProductSubSet] = useState({});

    useEffect(() => {
        let isMounted = true;
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category"); // get the category here

        //to get all the items from the database
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwZDQzOTU3OTkxYTNkZWMxNWFlYTUiLCJpYXQiOjE2MjQyOTg1NTN9.naWSz7ur4TBDqvCuecEjrkj6ek0y8LU7wLYABCkEe94`,
            },
            body: JSON.stringify({
                category,
            }),
        };
        fetch("http://localhost:9001/products/search", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) setProducts(data);
                if (isMounted) setProductSubSet(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        return () => (isMounted = false);
    }, []);

    return (
        <>
            <Navbar
                searchBar={true}
                products={products}
                setProducts={setProductSubSet}
            />
            <div className="flex-box mt-2">
                {productSubSet.length ? (
                    productSubSet.map((product) => {
                        return (
                            <ProductCard product={product} key={product.id} />
                        );
                    })
                ) : (
                    <div>
                        <h3>Sorry Couldn't Find Anything :(</h3>
                        <ul>
                            <li>Try searching for something else </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
