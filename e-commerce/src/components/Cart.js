import { Link } from "react-router-dom";
import { useCartInfo } from "../context/CartInfo";

export default function Cart(props) {
    const numProducts = useCartInfo().length;

    return (
        <div className="nav-item btn-group me-4">
            <Link className="text-white" to="/cart">
                ({numProducts}) Cart
            </Link>
        </div>
    );
}
