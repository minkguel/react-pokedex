import React, { useEffect, useState } from "react";

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            className="btn btn-danger position-fixed bottom-0 end-0 m-4 shadow"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{ zIndex: 1000 }}
        >
            Go To Top
        </button>
    );
};

export default BackToTopButton;