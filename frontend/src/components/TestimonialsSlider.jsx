/**
 * TestimonialsSlider.jsx
 * Swiper-based testimonial carousel — same pattern as SwiperImage.jsx,
 * styled with your existing card / text-accent / text-primary classes.
 */

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';

import SectionHeading from './SectionHeading'; // adjust path if needed

// Profile photos — drop real client photos at these paths, or leave as-is
// for now; each client below gets a circular avatar next to their quote.
// import avatar1 from '../assets/image/testimonials/rafiqul-islam.webp';
// import avatar2 from '../assets/image/testimonials/kamal-hossain.webp';
// import avatar3 from '../assets/image/testimonials/faruk.webp';
// import avatar4 from '../assets/image/testimonials/nasrin-akter.webp';
// import avatar5 from '../assets/image/testimonials/tanvir-ahmed.webp';
// import avatar6 from '../assets/image/testimonials/shahidul-alam.webp';

const TESTIMONIALS = [
    {
        quote: "BIX delivered radiography services on our pipeline project with excellent quality and full compliance to standards.",
        name: "Engr. Rafiqul Islam",
        role: "Project Manager, GTCL",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQELt9wIrJOcoA/profile-displayphoto-scale_400_400/B56Z2SHS6oK4Ag-/0/1776272881334?e=2147483647&v=beta&t=-KXWInzBX2D2nSnUuZ4hid9kEFE-njEtRHU9meJ1i7s',
    },
    {
        quote: "Professional PWHT and NDT team — turnaround jobs completed on schedule every time.",
        name: "Md. Kamal Hossain",
        role: "QA/QC Head, KAFCO",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGGTueFgnU10g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696556554703?e=2147483647&v=beta&t=76pAKCayir9W5tKNqLwtBMf45C9qNgYc1xPqT_FPEA4',
    },
    {
        quote: "Reliable ultrasonic thickness gauging service for our shipbuilding projects.",
        name: "S. M. Faruk",
        role: "Site Engineer, Western Marine Shipyard",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQELt9wIrJOcoA/profile-displayphoto-scale_400_400/B56Z2SHS6oK4Ag-/0/1776272881334?e=2147483647&v=beta&t=-KXWInzBX2D2nSnUuZ4hid9kEFE-njEtRHU9meJ1i7s',
    },
    {
        quote: "Their phased array and TOFD team handled our weld inspections with precision — clear reports, zero delays.",
        name: "Nasrin Akter",
        role: "Inspection Coordinator, Chevron Bangladesh",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQELt9wIrJOcoA/profile-displayphoto-scale_400_400/B56Z2SHS6oK4Ag-/0/1776272881334?e=2147483647&v=beta&t=-KXWInzBX2D2nSnUuZ4hid9kEFE-njEtRHU9meJ1i7s',
    },
    {
        quote: "BIX's rope access crew inspected our LPG spheres safely and efficiently without shutting down operations.",
        name: "Tanvir Ahmed",
        role: "Plant Manager, Petromax LPG",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQELt9wIrJOcoA/profile-displayphoto-scale_400_400/B56Z2SHS6oK4Ag-/0/1776272881334?e=2147483647&v=beta&t=-KXWInzBX2D2nSnUuZ4hid9kEFE-njEtRHU9meJ1i7s',
    },
    {
        quote: "Consistent, certified NDT support across every turnaround — one of our most dependable inspection partners.",
        name: "Shahidul Alam",
        role: "Maintenance Head, Eastern Refinery Ltd",
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQELt9wIrJOcoA/profile-displayphoto-scale_400_400/B56Z2SHS6oK4Ag-/0/1776272881334?e=2147483647&v=beta&t=-KXWInzBX2D2nSnUuZ4hid9kEFE-njEtRHU9meJ1i7s',
    },
];

export default function TestimonialsSlider() {
    return (
        <section className="py-20 bg-background">
            <div className="container-page">
                <SectionHeading eyebrow="Client Voices" title="Testimonials" />

                <Swiper
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="testimonialSwiper pb-12 !items-stretch"
                >
                    {TESTIMONIALS.map((t, i) => (
  <SwiperSlide key={i}>
    <div className="card p-6 h-[300px] flex flex-col justify-between">
      <div>
        <div className="text-accent text-sm mb-3">★★★★★</div>
        <p className="text-textmuted text-sm italic line-clamp-4">
          "{t.quote}"
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="font-semibold text-primary text-sm">{t.name}</p>
          <p className="text-xs text-textmuted">{t.role}</p>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}
                </Swiper>

                
            </div>
        </section>
    );
}