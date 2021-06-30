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
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    console.log(current);

    if (!Array.isArray(images) || FaSlideshare.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextSlide}
            />
            {images.map((image, index) => {
                return (
                    <div
                        className={index === current ? "slide active" : "slide"}
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
        </section>
    );
};

export default ImageSlider;
