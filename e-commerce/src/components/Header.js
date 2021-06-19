import Navbar from "./Navbar";

export default function Header(props) {
    return (
        <div>
            <Navbar setProducts={props.setProducts} />
        </div>
    );
}
