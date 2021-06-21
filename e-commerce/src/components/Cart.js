import { Link } from "react-router-dom";

export default function Cart(props) {
    return (
        <div className="nav-item btn-group me-4">
            <h6>({props.numProducts})</h6>
            <Link className="text-white" to="/cart">
                Cart
            </Link>
        </div>
    );
}
