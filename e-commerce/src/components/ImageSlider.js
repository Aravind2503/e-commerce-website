import { useState } from "react";
import {
    FaArrowAltCircleRight,
    FaArrowAltCircleLeft,
    FaSlideshare,
} from "react-icons/fa";

const ImageSlider = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const length = images.length;

    const nextSlide = () => {
        setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    const prevSlide = () => {
        setCurrent((current) => (current === 0 ? length - 1 : current - 1));
    };

    console.log(current);

    if (!Array.isArray(images) || FaSlideshare.length <= 0) {
        return null;
    }

    return (
        <div className="slider">
            <div className="left-arrow-div m-4">
                <FaArrowAltCircleLeft
                    onClick={prevSlide}
                    className="left-arrow"
                />
            </div>
            <div className="image-slider-div">
                {images.map((image, index) => {
                    return (
                        <div
                            className={
                                index === current
                                    ? "slide active image-slider-div"
                                    : "slide image-slider-div"
                            }
                            key={index}
                            style={{ border: "2px solid black" }}
                        >
                            {index === current && (
                                <img
                                    src={`data:image/png;base64, ${image}`}
                                    alt="product"
                                    className="image"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="right-arrow-div m-4">
                <FaArrowAltCircleRight
                    onClick={nextSlide}
                    className="right-arrow"
                />
            </div>
        </div>
    );
};

export default ImageSlider;
