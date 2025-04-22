import React from "react";
import Section from "../components/Section";
import { BiAdjust } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { VscPassFilled } from "react-icons/vsc";
import { FaTrophy } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
const Leetcode = () => {
  return (
    <Section>
      <div className="flex flex-col items-center relative py-[2rem] justify-between gap-[2rem] lg:py-[1rem] w-full ">
        <div>
          <p className="text-[2rem] font-semibold text-body-1 lg:text-[3.7rem] text-center">
            Leetcode
          </p>
          <p className="text-body-2 text-[13px] lg:text-[1.2rem] text-center ">
            Track my progress and achievements
          </p>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]">
            <div className="flex justify-between">
              <p className="text-[1.2rem] text-body-4">Easy Problem</p>
              <div className="size-7">
                <VscPassFilled className="h-full w-full text-green-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-medium text-green-500 pb-2">
                275
              </div>
              <div className="w-full  rounded-full h-2 mb-4 bg-gray-200">
                <div
                  className="bg-green-600 h-2 rounded-full dark:bg-green-500"
                  style={{
                    width: "76%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]">
            <div className="flex justify-between">
              <p className="text-[1.2rem] text-body-4">Medium Problem</p>
              <div className="size-7">
                <BiAdjust className="h-full w-full text-yellow-400" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-medium text-yellow-400  pb-2">
                275
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700">
                <div
                  className="bg-yellow-400 h-2 rounded-full "
                  style={{
                    width: "76%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]">
            <div className="flex justify-between">
              <p className="text-[1.2rem] text-body-4">Hard Problem</p>
              <div className="size-7">
                <CgDanger className="h-full w-full text-red-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-medium text-red-500 pb-2">
                275
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className=" h-2 rounded-full bg-red-500"
                  style={{
                    width: "76%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 lg:flex-row lg:gap-[10rem]">
          <div className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1rem] lg:px-[1.5rem] lg:justify-between lg:pb-[1.2rem]">
            <div className="flex justify-between">
              <p className="text-[1.5rem] text-body-4">Contest Rating</p>
              <div className="size-7">
                <FaTrophy className="h-full w-full text-yellow-600" />
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-200 rounded-lg h-10 mb-3 lg:h-16 ">
                <div className="bg-gradient-to-l from-[#AA00FF] to-[#0015ff] to-[150%] h-10 rounded-lg w-full lg:h-16"></div>
              </div>
              <div className="mb-1 text-sm font-medium text-body-4  pb-2">
                Top 5% Globally
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1rem]  lg:px-[1.5rem]">
            <div className="flex justify-between">
              <p className="text-[1.5rem] text-body-4">Achievements</p>
            </div>
            <div>
              <div className="flex items-center pb-3 gap-2 lg:gap-4">
                <FaMedal className="size-6 lg:size-7.5 text-yellow-400" />
                <p className=" text-sm font-medium text-body-2 lg:text-xl">
                  300+ Problems Solved
                </p>
              </div>
              <div className="flex items-center pb-3 gap-2 lg:gap-4">
                <SlBadge className="size-6 lg:size-7.5 text-cyan-400" />
                <p className="text-sm font-medium text-body-2 lg:text-xl">
                  100 Days Streak
                </p>
              </div>
              <div className="flex items-center pb-3 gap-2 lg:gap-4">
                <FaStar className="size-6 lg:size-7.5 text-purple-400" />
                <div className="text-sm font-medium text-body-2 lg:text-xl">
                  Top 10% in Weekly Contest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Leetcode;
