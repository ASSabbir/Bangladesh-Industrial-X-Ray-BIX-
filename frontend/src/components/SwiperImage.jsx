import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../assets/image/1.webp'
import img2 from '../assets/image/2.webp'
import img3 from '../assets/image/3.webp'
import img4 from '../assets/image/4.webp'
import img5 from '../assets/image/5.webp'


// Carousel images — drop real site/inspection photography at these paths
// (or swap the URLs via the admin panel later); PageImage falls back to a
// clean placeholder tile automatically if a file isn't there yet.
const SLIDER_IMAGES = [
    { src: img1, label: "Field Radiography" },
    { src: img2, label: "Phased Array Inspection" },
    { src: img3, label: "Rope Access Services" },
    { src: img4, label: "Certified Technicians" },
    { src: img5, label: "Certified Technicians" },
];


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SwiperImage() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
               
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {SLIDER_IMAGES.map((img) => (
                    <SwiperSlide key={img.src}>
                        <div className="h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[500px]">
                            <img src={img.src}
                            alt={img.label}
                            label={img.label}
                            className="w-full h-full object-cover"  />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
