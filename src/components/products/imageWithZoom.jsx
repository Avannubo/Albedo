import Image from 'next/image';
import React, { useState } from 'react';

const ImageWithZoom = ({ src, alt, className }) => {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect(); // Use e.currentTarget instead of e.target
        const offsetX = e.pageX - left - window.pageXOffset; // Calculate offsetX relative to the image
        const offsetY = e.pageY - top - window.pageYOffset; // Calculate offsetY relative to the image
        const xPercent = (offsetX / width) * 100;
        const yPercent = (offsetY / height) * 100;
        setZoomPosition({ x: xPercent, y: yPercent });
    };


    return (
        <div className={`relative overflow-hidden ${className}`} onMouseMove={handleMouseMove}>
            <Image
                src={src}
                alt={alt}
                className=" object-cover transition-transform duration-300 transform-gpu"
                style={{
                    transform: `scale(1.8) translate(-${zoomPosition.x}%, -${zoomPosition.y}%)`,
                }}
                width={4000}
                height={5050}
            />
        </div>
    );
};

export default ImageWithZoom;
