export default function ({ children }) {
    return (
        <div className="text-center align-center message">
            <div>{children}</div>
            <div className="loader"></div>
        </div>
    );
}
