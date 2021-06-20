import Navbar from "./Navbar";

const categories = [
    {
        name: "Electronics",
        id: 1,
        image: "./assets/electronics-category.jpg",
    },
    {
        name: "Stationery",
        id: 2,
        image: "./assets/stationery-category.jpg",
    },
    {
        name: "Home",
        id: 3,
        image: "./assets/home-category.jpg",
    },
    {
        name: "Fashion",
        id: 4,
        image: "./assets/fashion-category.jpg",
    },
];

function onClick(category) {
    document.getElementById(`${category}-form`).submit();
}

export default function HomePage(props) {
    return (
        <>
            <Navbar searchBar={false} />

            <div className="flex-box">
                {categories.map((category) => {
                    return (
                        <div
                            className="card flex-element"
                            key={category.id}
                            onClick={(e) => onClick(category.name)}
                        >
                            <img
                                src={category.image}
                                width="240px"
                                height="240px"
                                className="card-img-top"
                                alt="product"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Product: {category.name}
                                </h5>
                            </div>

                            <form
                                method="GET"
                                action="/search"
                                id={`${category.name}-form`}
                                style={{ display: "none" }}
                            >
                                <input
                                    type="text"
                                    name="category"
                                    value={category.name}
                                />
                            </form>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
