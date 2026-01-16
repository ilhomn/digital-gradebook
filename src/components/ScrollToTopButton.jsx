import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = ({ containerSelector }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const container = document.querySelector(containerSelector);
        if (container) {
            if (container.scrollTop > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };

    const scrollToTop = () => {
        const container = document.querySelector(containerSelector);
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = document.querySelector(containerSelector);
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerSelector]);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
