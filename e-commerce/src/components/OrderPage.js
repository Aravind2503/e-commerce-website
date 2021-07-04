import { useEffect, useState } from "react";
import { useUserInfo } from "../context/UserInfo";
import Navbar from "./Navbar";
import OrderProductCard from "./OrderProductCard";

export default function OrderPage(props) {
    const { token } = useUserInfo();
    const [orderHistory, setOrderHistory] = useState([]);

    async function fetchOrderHistory() {
        const response = await fetch("http://localhost:9001/order", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            // console.log("DATA IN ORDER PAGE ", data);
            setOrderHistory(data);
            return data;
        }
        console.log("COULD FETCH ORDER HISTORY");
        return [];
    }

    useEffect(() => {
        if (token) fetchOrderHistory();
    }, [token]);

    return (
        <div>
            <Navbar />
            <div style={{ width: "90%", margin: "auto" }}>
                <h2 className="my-3">Order History</h2>
                {/* <div>{JSON.stringify(orderHistory)}</div> */}
                <div>
                    {orderHistory.map((item, index) => {
                        return (
                            <div
                                className="mb-2 border border-dark mt-2 p-2"
                                key={index}
                            >
                                <OrderProductCard
                                    className="p-2"
                                    products_quantity={item.products}
                                    item={item}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
