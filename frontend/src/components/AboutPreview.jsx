import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import PageImage from "./PageImage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from '../assets/image/1.webp'
import img2 from '../assets/image/2.webp'
import img3 from '../assets/image/3.webp'
import img4 from '../assets/image/4.webp'
import img5 from '../assets/image/5.webp'
import img6 from '../assets/image/30year.png'
import SwiperImage from "./SwiperImage";

// Short, punchy reasons a first-time visitor should trust BIX — this is the
// "why go with BIX" answer, kept scannable rather than paragraph-heavy.
const REASONS = [
    "30 years in Non-Destructive Testing — trusted since 1995",
    "ISO/IEC 17025:2017 BAB accredited testing laboratory",
    "Largest fleet of Pipeline X-Ray Crawlers in Bangladesh",
    "90+ certified NDT professionals across every discipline",
];

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

export default function AboutPreview() {
    return (
        <section className="py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-100 overflow-hidden">
            <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                {/* Left — text */}
                <div>
                    <p className="section-eyebrow">About BIX</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight leading-[1.15] mb-4 sm:mb-5">
                        Bangladesh's Most Trusted Name in Industrial Inspection
                    </h2>
                    <p className="text-textmuted text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl">
                        Since 1995, Bangladesh Industrial X-Ray has been the partner engineers call when a
                        weld, a pipeline, or a pressure vessel absolutely cannot fail. Accredited, certified,
                        and built on three decades of field experience — we don't just test your assets, we
                        protect them.
                    </p>

                    <ul className="space-y-3 sm:space-y-4 mb-7 sm:mb-9">
                        {REASONS.map((r) => (
                            <li key={r} className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                                    ✓
                                </span>
                                <span className="text-sm sm:text-[15px] text-primary/90 font-medium leading-snug">{r}</span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        to="/about"
                        className="btn-primary inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold"
                    >
                        Learn More About Us
                    </Link>
                </div>

                {/* Right — image carousel */}
                <div className="relative">
                    <div className="rounded-2xl overflow-hidden  border border-black/5">
                        {/* <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[500px]"
                        >
                            {SLIDER_IMAGES.map((img) => (
                                <SwiperSlide key={img.src}>
                                    <PageImage
                                        src={img.src}
                                        alt={img.label}
                                        label={img.label}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper> */}
                        <SwiperImage></SwiperImage>
                    </div>

                    {/* Accent stat card overlapping the carousel corner */}
                    <div className="hidden overflow-hidden sm:flex z-20 absolute -bottom-6 -left-6  text-white rounded-tr-2xl pl-5 pb-5 bg-gray-100 items-start ">
                        
                        <img src={img6} alt="" className="h-25 " />
                    </div>
                </div>
            </div>
        </section>
    );
}