const SubCategoryButtons = ({ subCategories, category }) => {
    const submitSubcategory = (subcategory) => {
        console.log("this is the subcategory", subcategory);
        window.location.replace(
            `/search?category=${category}&subcategory=${subcategory}`
        );
    };

    const gotoCategory = (category) => {
        window.location.replace(`/search?category=${category}`);
    };

    return (
        <div
            className="flex-box border border-dark mb-5"
            style={{ width: "100%" }}
        >
            <div className="flex-item">
                <button
                    style={categoryButtonStyle}
                    onClick={() => gotoCategory(category)}
                >
                    <h1>{category}</h1>
                </button>
            </div>
            <div className="flex-item">
                {subCategories.map((subcategory, index) => {
                    return (
                        <button
                            style={buttonStyle}
                            className="btn-subcategory"
                            key={index}
                            onClick={() => submitSubcategory(subcategory)}
                        >
                            {subcategory}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const buttonStyle = {
    // borderRadius: "16px",
    padding: "10px 20px",
    border: "none",
    margin: "16px 50px",
    backgroundColor: "transparent",
};

const categoryButtonStyle = {
    // borderRadius: "16px",
    padding: "10px 20px",
    border: "none",
    margin: "2px 50px",
    backgroundColor: "transparent",
};

export default SubCategoryButtons;
