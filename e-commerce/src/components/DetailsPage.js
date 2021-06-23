const DetailsPage = (props) => {
    const product = props.location.state;
    return <div>{console.log(product)}</div>;
};

export default DetailsPage;
