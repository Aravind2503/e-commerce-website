import { GrFormSubtract, GrFormAdd } from "react-icons/gr";

export default function ProductButton({
    quantity,
    productId,
    removeItem,
    insertItem,
}) {
    return (
        <div className="d-inline">
            <div
                onClick={removeItem}
                className="d-inline px-3 border border-danger rounded-pill"
            >
                <GrFormSubtract className="m-auto" />
            </div>
            <div className="d-inline px-3 user-select-none">{quantity}</div>
            <div
                onClick={insertItem}
                className="d-inline px-3 border border-success rounded-pill"
            >
                <GrFormAdd className="m-auto" />
            </div>
        </div>
    );
}
