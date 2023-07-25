import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import first from "./pexels-photo-7904452.jpg";
import second from "./pexels-photo-7653129.jpg";
import third from "./pexels-photo-6836421.jpg";
import fourth from "./pexel-photo.jpg";

const SelfSlidingImageCarousel = () => {
    const images = [
        first,
        second,
        third,
        fourth
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const imageStyle = {
        width: '1000px', 
        height: '400px', 
    };

    return (
        <Slider {...settings} >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} style={imageStyle} className='slider' />
                </div>
            ))}
        </Slider>
    );
};

export default SelfSlidingImageCarousel;
