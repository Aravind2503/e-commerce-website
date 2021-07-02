import Navbar from "./Navbar";
import ProductCard from "./ProductCard2";
import { useState, useEffect } from "react";
import { useUserInfo } from "../context/UserInfo";
import Loading from "./Loading";
import { useCartInfo } from "../context/CartInfo";
import SubCategoryButtons from "./SubCategoryButtons";

export default function SearchPage2() {
    const [products, setProducts] = useState({});
    const [productSubSet, setProductSubSet] = useState({});
    const [subCategories, setSubCategories] = useState([]);
    const cart = useCartInfo();
    const token = useUserInfo().token;
    const [pageCategory, setPageCategory] = useState("");

    useEffect(() => {
        let isMounted = true;
        const urlParams = new URLSearchParams(window.location.search);
        var category = urlParams.get("category"); // get the category here
        setPageCategory(category);

        var subcategory = urlParams.get("subcategory"); // get the category here

        //change the subcategories here based on the category
        if (category === "Fashion") {
            setSubCategories(["Women", "Men", "Kids", "Bags and Luggage"]);
        } else if (category === "Electronics") {
            setSubCategories([
                "Laptops",
                "Mobiles",
                "TV and Entertainment",
                "Audio",
            ]);
        } else if (category === "Home") {
            setSubCategories(["Appliances", "Utensils"]);
        } else if (category === "Stationery") {
            setSubCategories(["Art Supplies", "School"]);
        }

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
        } else if (subcategory === null && category !== null) {
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
        } else {
            console.log("this is the subcategory", subcategory);
            requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    category,
                    subcategory,
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
            <SubCategoryButtons
                subCategories={subCategories}
                category={pageCategory}
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
