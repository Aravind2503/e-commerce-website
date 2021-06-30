import { Link } from "react-router-dom";
import { useCartInfo } from "../context/CartInfo";
import { FiShoppingCart } from "react-icons/fi";

export default function Cart(props) {
    const numProducts = useCartInfo().length;

    return (
        <div className="nav-item btn-group me-1">
            <Link className="text-white" to="/cart">
                <div className="d-inline" style={{ fontSize: "12px" }}>
                    ({numProducts})
                </div>
                <FiShoppingCart size="22px" />
            </Link>
        </div>
    );
}
