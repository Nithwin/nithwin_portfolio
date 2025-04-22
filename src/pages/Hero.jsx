import React from "react";
import Section from "../components/Section";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { GiPirateFlag } from "react-icons/gi";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import Typewriter from "typewriter-effect"; // ✅ Correct import
import FancyWave from "../components/FancyWave";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { motion, transform } from "framer-motion";
const Hero = () => {
  return (
    <Section id={"home"}>
      <div className="flex flex-col items-center relative py-[2rem] justify-between gap-[2rem] lg:flex-row-reverse lg:py-[1rem]">
        <div className="relative  lg:px-[2rem] lg:pe-[4rem]">
          <div className="size-[15rem] lg:size-[25rem] overflow-hidden flex justify-center items-center rounded-full ">
            <HiOutlineLightBulb className="absolute text-primary top-[1rem] size-10 right-[1rem] lg:right-[5rem]" />
            <div className="size-15 rounded-full bg-primary/30 blur-xl absolute top-[0.7rem] right-[4.5rem] mix-blend-plus-lighter"></div>

            <LiaLaptopCodeSolid className="absolute text-primary bottom-[4rem] size-10 left-[1.5rem] lg:bottom-[9rem] lg:left-[1rem]" />
            <div className="size-15 rounded-full bg-primary/30 blur-xl absolute bottom-[3.5rem] left-[1rem] lg:bottom-[8.4rem] lg:left-[0.5rem] mix-blend-plus-lighter"></div>

            <RiArrowUpDoubleFill className="absolute text-primary bottom-[4.4rem] size-10 right-[1.5rem] lg:bottom-[9.5rem] lg:right-[4.5rem]" />
            <div className="size-15 rounded-full bg-primary/30 blur-xl absolute bottom-[4rem] right-[1.2rem] lg:bottom-[9rem] lg:right-[4rem] mix-blend-plus-lighter"></div>

            <GiPirateFlag className="absolute text-primary top-[1.4rem] size-10 -left-[0.4rem]" />
            <div className="size-15 rounded-full bg-primary/30 blur-lg absolute top-[1rem] -left-[1rem] mix-blend-plus-lighter"></div>
            <motion.img
              initial={{
                transform: "translateY(0px)",
              }}
              animate={{
                transform: "translateY(8px)",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
              src="./assets/hero.png"
              alt=""
              className="h-full w-full scale-[1.3] translate-y-9 object-contain"
            ></motion.img>
          </div>
        </div>
        <div className="flex flex-col gap-1 lg:gap-[0.5rem] relative lg:pe-[2rem] lg:ps-[1rem] bg-gra">
          <h1 className="text-2xl lg:text-5xl">Hi There,</h1>

          <div className="relative">
            <h1 className="text-[2.3rem] lg:text-[70px] font-montserrat font-semibold bg-gradient-to-r from-purple-600 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              <Typewriter
                options={{
                  strings: ["I'm Nithwin", "I'm Designer", "I'm Developer"],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                }}
              />
            </h1>
            {/* 
            <div className="w-[19rem] h-[15rem] lg:w-[25rem] lg:h-[16rem] lg:left-[2rem] lg:-top-5 rounded-full bg-primary/20 lg:bg-primary/20  lg:blur-2xl blur-2xl absolute -top-20 -left-5 -z-20 mix-blend-plus-lighter"></div> */}

            <div className="absolute -top-[2rem] left-0 lg:-top-4 lg:left-10 w-80 h-80 bg-primary/25 rounded-full blur-[120px] mix-blend-plus-lighter"></div>
            <div className="absolute -top-[2rem] left-0 lg:-top-4 lg:left-10 w-20 h-20 bg-primary/25 rounded-full blur-[120px] mix-blend-plus-lighter"></div>
          </div>
          <div className="pb-4">
            <FancyWave />
          </div>
          <p className="text-xs lg:text-lg text-gray-300/80">
            I Level Up Alone | Web & Mobile Developer | Designer
          </p>
          <div className="pt-[1.5rem]">
            <ul className="flex gap-[1.5rem] lg:gap-[2.5rem]">
              <li>
                <a href="">
                  <FaGithub className="size-7 lg:size-10" />
                </a>
              </li>
              <li>
                <a href=" ">
                  <FaLinkedin className="size-7 lg:size-10" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaInstagramSquare className="size-7 lg:size-10" />
                </a>
              </li>
              <li>
                <a href="">
                  <SiLeetcode className="size-7 lg:size-10" />
                </a>
              </li>
              <li>
                <a href="">
                  <TbReportAnalytics className="size-7 lg:size-10" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
