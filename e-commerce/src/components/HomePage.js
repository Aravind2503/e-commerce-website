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
        image: "./assets/stationery.jpg",
    },
    {
        name: "Home",
        id: 3,
        image: "./assets/home.jpg",
    },
    {
        name: "Fashion",
        id: 4,
        image: "./assets/fashion.jpg",
    },
    {
        name: "Selfcare",
        id: 5,
        image: "./assets/selfcare.jpg",
    },
    {
        name: "Toys",
        id: 6,
        image: "./assets/toys.jpg",
    },
];

function onClick(category) {
    document.getElementById(`${category}-form`).submit();
}

export default function HomePage(props) {
    return (
        <>
            <Navbar searchBar={false} />

            <div className="flex-box mt-2">
                {categories.map((category) => {
                    return (
                        <div
                            className="card flex-element m-2"
                            key={category.id}
                            onClick={(e) => onClick(category.name)}
                            style={{ margin: "10px" }}
                        >
                            <img
                                src={category.image}
                                width="220px"
                                height="220px"
                                className="card-img-top"
                                alt="product"
                                style={{ objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
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
                                    onChange={(e) => {}}
                                />
                            </form>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
