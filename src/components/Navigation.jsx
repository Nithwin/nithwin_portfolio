import React, { useEffect, useRef, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { GiCrossedSwords } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    const navbarHeight = 60; // Adjust this value based on your navbar height
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Close mobile menu if open
    setNavOpen(false);
  };

  return (
    <nav className="p-2 fixed w-full px-[1rem] top-0 left-0 right-0 bg-[#111111] lg:px-[3rem] lg:py-[0.7rem]">
      <div className="flex w-full justify-between border-b pb-[0.5rem] lg:pb-[1rem] ">
        <div className="flex gap-2 items-center">
          <div className="shadow-blue lg:hidden ">
            {!navOpen ? (
              <RiMenu3Fill
                onClick={() => setNavOpen(!navOpen)}
                className="size-10 text-primary"
              />
            ) : (
              <GiCrossedSwords
                onClick={() => setNavOpen(!navOpen)}
                className="size-10 text-primary"
              />
            )}
          </div>
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="h-[2.2rem] lg:h-[3rem] flex justify-center items-center">
              <video
                ref={videoRef}
                src="./assets/nithwin.mp4"
                loop
                muted
                autoPlay
                playsInline
                className="h-full w-full backdrop-blur-3xl cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Navigation Items for the PC view */}
        <div className="items-center hidden lg:flex">
          <ul className="flex justify-center items-center gap-[4.3rem]">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <li key={item.id}>
                <a
                  onClick={() => scrollToSection(item.id)}
                  className="text-lg cursor-pointer text-shadow-glow hover:text-primary transition-colors duration-300"
                  role="button"
                  tabIndex={0}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="">
          <div className="w-20 h-10 bg-linear-to-r from-[#1e00ff] via-[#000000] to-[#AA00FF] p-[0.2rem] rounded-3xl">
            <div
              onClick={() => setDark(!dark)}
              className={`${
                dark ? "bg-blue-200" : "bg-yellow-100"
              } transition-all delay-100 ease-linear h-full w-full rounded-3xl  cursor-pointer flex`}
            >
              <div
                className={` ${
                  dark ? "-translate-x-0 z-10" : "translate-x-9"
                }  transition-all delay-100 ease-linear h-full w-1/2 bg-black rounded-full p-2 `}
              >
                <MdDarkMode className="h-full w-full text-yellow-300 " />
              </div>
              <div
                className={` ${
                  dark ? "-translate-x-9" : "-translate-x-0 z-10"
                } transition-all delay-100 ease-linear h-full w-1/2 bg-black rounded-full p-2 `}
              >
                <MdLightMode className="h-full w-full text-yellow-300 " />
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Items for the Mobile view */}
        <div
          className={`${
            navOpen ? "translate-y-0" : "translate-y-250"
          } lg:hidden transition-transform ease-linear delay-150 fixed top-[3.5rem] left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-lg bg-white/10 shadow-lg rounded-xl border border-white/30`}
        >
          <ul className="flex flex-col justify-center items-center gap-[4.3rem]">
            <li>
              <a
                onClick={() => scrollToSection("home")}
                className="text-2xl cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("about")}
                className="text-2xl cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("projects")}
                className="text-2xl cursor-pointer"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("skills")}
                className="text-2xl cursor-pointer"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("contact")}
                className="text-2xl cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
