import React, { useEffect, useState } from 'react';
import '../components/RoomSlider.css';
import sd1 from '../assets/sd1.png'
import sd2 from '../assets/sd2.png'
import sd3 from '../assets/sd3.png'
const RoomSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateSlides = () => {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.style.width = "380px";
                slide.style.height = "500px";
            } else {
                slide.style.width = "350px";
                slide.style.height = "450px";
            }
        });
    };

    const nextSlide = () => {
        const slider = document.querySelector(".slider");
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % 3;
            slider.style.transform = `translateX(-${newIndex * 380}px)`;
            return newIndex;
        });
    };

    const prevSlide = () => {
        const slider = document.querySelector(".slider");
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex - 1 + 3) % 3;
            slider.style.transform = `translateX(-${newIndex * 380}px)`;
            return newIndex;
        });
    };

    useEffect(() => {
        updateSlides();
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className='problemContainar'>
            <div className="containersliper">
            {/* Left Section */}
            <div className="left-section">
                <h1>50+ Beautiful rooms inspiration</h1>
                <p>Our designer has curated an exclusive collection of beautiful room designs to inspire your next home transformation.</p>
                <button className="explore-btn">Explore More</button>
            </div>

            {/* Right Section (Slider) */}
            <div className="slider-container">
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <div className="slider">
                    <div className="slide" style={{ width: "380px", height: "500px" }}>
                        <img src={sd1} alt="Inner Peace" />
                        <div className="info">
                            <p>Bed Room</p>
                            <h3>Inner Peace</h3>
                        </div>
                    </div>
                    <div className="slide" style={{ width: "350px", height: "450px" }}>
                        <img src={sd2} alt="Modern Living" />
                        <div className="info">
                            <p>Living Room</p>
                            <h3>Modern Living</h3>
                        </div>
                    </div>
                    <div className="slide" style={{ width: "350px", height: "450px" }}>
                        <img src={sd3} alt="Culinary Haven" />
                        <div className="info">
                            <p>Kitchen</p>
                            <h3>Culinary Haven</h3>
                        </div>
                    </div>
                </div>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
        </div>
    );
};

export default RoomSlider;