const DescriptionList = ({ desc }) => {
    const descList = desc.split("|");
    return (
        <div>
            <ul>
                {descList.map((desc, index) => {
                    return <li>{desc}</li>;
                })}
            </ul>
        </div>
    );
};

export default DescriptionList;
