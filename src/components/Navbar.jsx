import React, { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { GiCrossedSwords } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav className="p-2 fixed w-full px-[1rem] top-0 left-0 right-0 bg-[#111111] lg:px-[2rem] lg:py-[0.7rem]">
      <div className="flex w-full justify-between border-b pb-[0.5rem] lg:pb-[1rem]">
        <div className="flex gap-2 items-center">
          <div className="shadow-blue lg:hidden">
            {!navOpen ? (
              <RiMenu3Fill
                onClick={() => setNavOpen(!navOpen)}
                className="size-10 text-primary"
              />
            ) : (
              <GiCrossedSwords
                onClick={() => setNavOpen(!navOpen)}
                className="size-8 text-primary"
              />
            )}
          </div>
          {/* Logo */}
          <div className="">
            <img src="./assets/logo.png" alt="Logo" className="size-10 bg-primary/10 backdrop-blur-3xl" />
          </div>
        </div>
        <div className="flex items-center">
          <ul className="flex justify-center items-center gap-[4.3rem]">
            <li>
              <a href="" className="text-lg">
                Home
              </a>
            </li>
            <li>
              <a href="" className="text-lg">
                About
              </a>
            </li>
            <li>
              <a href="" className="text-lg">
                Projects
              </a>
            </li>
            <li>
              <a href="" className="text-lg">
                Skills
              </a>
            </li>
            <li>
              <a href="" className="text-lg">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="w-20 h-10 bg-linear-to-r from-[#1e00ff] via-[#000000] to-[#AA00FF] p-[0.2rem] rounded-3xl">
            <div className="h-full w-full bg-gray-400 rounded-3xl">
              <div className="h-full w-1/2 bg-black rounded-full p-2">
                {}
                <MdDarkMode className="h-full w-full text-yellow-300" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            navOpen ? "translate-y-0" : "translate-y-250"
          } lg:hidden transition-transform ease-linear delay-150 fixed top-[3.5rem] left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-lg bg-white/10 shadow-lg rounded-xl border border-white/30`}
        >
          <ul className="flex flex-col justify-center items-center gap-[4.3rem]">
            <li>
              <a href="" className="text-2xl">
                Home
              </a>
            </li>
            <li>
              <a href="" className="text-2xl">
                About
              </a>
            </li>
            <li>
              <a href="" className="text-2xl">
                Projects
              </a>
            </li>
            <li>
              <a href="" className="text-2xl">
                Skills
              </a>
            </li>
            <li>
              <a href="" className="text-2xl">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
