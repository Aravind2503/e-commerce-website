import Navbar from "./Navbar";
import ProductCard from "./ProductCard2";
import { useState, useEffect } from "react";
import { useUserInfo } from "../context/UserInfo";
import Loading from "./Loading";
import { useCartInfo } from "../context/CartInfo";

export default function SearchPage2() {
    const [products, setProducts] = useState({});
    const [productSubSet, setProductSubSet] = useState({});
    const cart = useCartInfo();
    const token = useUserInfo().token;

    useEffect(() => {
        let isMounted = true;
        const urlParams = new URLSearchParams(window.location.search);
        var category = urlParams.get("category"); // get the category here
        var requestOptions;
        if (category === null) {
            requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                // body: JSON.stringify({}),
            };
        } else {
            //to get all the items from the database
            requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    category,
                }),
            };
        }

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
    }, [token]);

    return (
        <>
            <Navbar
                searchBar={true}
                products={products}
                setProducts={setProductSubSet}
            />
            <div className="flex-box mt-2">
                {products.length ? (
                    productSubSet.length ? (
                        productSubSet.map((product) => {
                            return (
                                <ProductCard
                                    product={product}
                                    key={product._id}
                                />
                            );
                        })
                    ) : (
                        <div>
                            <h3>Sorry Couldn't Find Anything :(</h3>
                            <ul>
                                <li>Try searching for something else </li>
                            </ul>
                        </div>
                    )
                ) : (
                    <Loading size="small">Loading...</Loading>
                )}
            </div>
        </>
    );
}
