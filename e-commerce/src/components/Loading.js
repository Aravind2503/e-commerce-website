export default function ({ children, size }) {
    return (
        <div className="text-center align-center message">
            <div className="mb-3">{children}</div>
            <div className={(size && `loader${size}`) || "loader"}></div>
        </div>
    );
}
