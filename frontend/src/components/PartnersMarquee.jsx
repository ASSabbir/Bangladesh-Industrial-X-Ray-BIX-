/**
 * PartnersMarquee.jsx
 * Simple two-row infinite logo marquee — row 1 left, row 2 right.
 */

import Marquee from "react-fast-marquee";

import logo1 from "../assets/image/partners/1.webp";
import logo2 from "../assets/image/partners/2.webp";
import logo3 from "../assets/image/partners/3.webp";
import logo4 from "../assets/image/partners/4.webp";
import logo5 from "../assets/image/partners/5.webp";
import logo6 from "../assets/image/partners/6.webp";
import logo7 from "../assets/image/partners/7.webp";
import logo8 from "../assets/image/partners/8.webp";
import logo9 from "../assets/image/partners/9.webp";
import logo10 from "../assets/image/partners/10.webp";
import logo11 from "../assets/image/partners/11.webp";
import logo12 from "../assets/image/partners/12.webp";
import logo13 from "../assets/image/partners/13.webp";
import logo14 from "../assets/image/partners/14.webp";
import logo15 from "../assets/image/partners/15.webp";
import logo16 from "../assets/image/partners/16.webp";
import logo17 from "../assets/image/partners/17.webp";
import logo18 from "../assets/image/partners/18.webp";
import logo19 from "../assets/image/partners/19.webp";
import logo20 from "../assets/image/partners/20.webp";
import logo21 from "../assets/image/partners/21.webp";
import logo22 from "../assets/image/partners/22.webp";
import logo23 from "../assets/image/partners/23.webp";
import logo24 from "../assets/image/partners/24.webp";
import logo25 from "../assets/image/partners/25.webp";
import logo26 from "../assets/image/partners/26.webp";
import logo27 from "../assets/image/partners/27.webp";
import logo28 from "../assets/image/partners/28.webp";
import logo29 from "../assets/image/partners/29.webp";
import logo30 from "../assets/image/partners/30.webp";
import logo31 from "../assets/image/partners/31.webp";
import logo32 from "../assets/image/partners/32.webp";
import logo33 from "../assets/image/partners/33.webp";
import logo34 from "../assets/image/partners/34.webp";
import logo35 from "../assets/image/partners/35.webp";
import logo36 from "../assets/image/partners/36.webp";
import logo37 from "../assets/image/partners/37.webp";
import logo38 from "../assets/image/partners/38.webp";
import logo39 from "../assets/image/partners/39.webp";
import logo40 from "../assets/image/partners/40.webp";

const rowLeft = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
  logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20,
];

const rowRight = [
  logo21, logo22, logo23, logo24, logo25, logo26, logo27, logo28, logo29, logo30,
  logo31, logo32, logo33, logo34, logo35, logo36, logo37, logo38, logo39, logo40,
];

export default function PartnersMarquee() {
  return (
    <section className="py-10 bg-white space-y-6">
      <Marquee gradient={false} speed={50} >
        {rowLeft.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Partner ${i + 1}`}
            className="h-10 mx-6 sm:mx-8 object-contain"
          />
        ))}
      </Marquee>

      <Marquee gradient={false} speed={50} direction="right" >
        {rowRight.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Partner ${i + 21}`}
            className="h-10 mx-6 sm:mx-8 object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
}