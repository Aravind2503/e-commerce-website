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
        <div>
            <div
                style={{
                    display: "flex",

                    alignItems: "center",
                    // width: "100%",
                    borderBottom: "1px solid grey",
                }}
            >
                <div
                    style={{
                        justifyContent: "flex-start",
                        // marginRight: "auto",
                        // flex: "1",
                    }}
                >
                    <button
                        style={categoryButtonStyle}
                        onClick={() => gotoCategory(category)}
                    >
                        <h1>{category}</h1>
                    </button>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        marginLeft: "auto",
                        flex: "1",
                        // overflowX: "scroll",
                    }}
                >
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
        </div>
    );
};

const buttonStyle = {
    // borderRadius: "16px",
    padding: "10px 20px",
    border: "none",
    margin: "10px 50px",
    backgroundColor: "transparent",
};

const categoryButtonStyle = {
    // borderRadius: "16px",
    padding: "10px 20px",
    border: "none",
    margin: "10px 50px",
    backgroundColor: "transparent",
};

export default SubCategoryButtons;
