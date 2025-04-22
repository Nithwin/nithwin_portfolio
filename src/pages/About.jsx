import React from "react";
import Section from "../components/Section";

const About = () => {
  return (
    <Section>
      <div className="flex flex-col items-center relative py-[2rem] justify-between gap-[4rem] lg:flex-row-reverse lg:py-[1rem]">
        <div className="flex flex-col lg:w-1/2">
        <div className="absolute top-[1.5rem] left-[4.5rem] lg:-top-4 lg:left-10 w-30 h-30 bg-primary/45 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <p className="text-[2rem] font-semibold text-body-1 lg:text-[3.7rem] text-center lg:text-start">About Me</p>
          <p className="text-body-2 text-[13px] lg:text-[1.2rem] text-center lg:text-start">Developer | Problem Solver</p>
          <p className="text-body-3 pt-[0.8rem] text-[18px] font-inter lg:text-3xl text-justify lg:text-start">
            Hello, I'm Nithwin V M, a Full Stack Web and Mobile App Developer
            with a deep understanding of both Front-end and Back-end
            technologies. I love building beautiful, functional, and scalable
            applications, from mobile apps to web platforms.
          </p>
          <div className=""></div>
        </div>
        <div className="lg:w-1/2">
        <div className="h-[19rem] lg:h-[25rem] overflow-hidden flex justify-center items-center rounded-[3rem] ">
            <img src="./assets/about.png" alt="" className="h-full w-full scale-[1.3] translate-y-9 object-contain" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
