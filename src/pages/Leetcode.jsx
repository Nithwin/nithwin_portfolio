import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "../components/Section";
import { BiAdjust } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { VscPassFilled } from "react-icons/vsc";
import { FaTrophy } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { motion } from "framer-motion";
const LEETCODE_USERNAME = "vmnithwin"; // <-- Change this

const Leetcode = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchLeetcodeStats = async () => {
      try {
        // Using LeetCode's public API endpoint
        const response = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
        );

        // Transform the response to match our existing structure
        const transformedStats = {
          allQuestionsCount: [
            { difficulty: "Easy", count: response.data.totalEasy },
            { difficulty: "Medium", count: response.data.totalMedium },
            { difficulty: "Hard", count: response.data.totalHard },
          ],
          matchedUser: {
            submitStats: {
              acSubmissionNum: [
                { difficulty: "Easy", count: response.data.easySolved },
                { difficulty: "Medium", count: response.data.mediumSolved },
                { difficulty: "Hard", count: response.data.hardSolved },
              ],
            },
            contestRating: response.data.ranking,
            profile: {
              ranking: response.data.ranking,
              reputation: response.data.totalSolved,
            },
          },
        };

        setStats(transformedStats);
      } catch (error) {
        console.error("Failed to fetch LeetCode stats:", error);
        setStats(null);
      }
    };

    fetchLeetcodeStats();
  }, []);

  // Helper to get count by difficulty
  const getCount = (difficulty) =>
    stats?.matchedUser?.submitStats?.acSubmissionNum?.find(
      (item) => item.difficulty === difficulty
    )?.count || 0;

  return (
    <Section id="leetcode">
      <div className="flex flex-col items-center relative py-[2rem] justify-between gap-[2rem] lg:py-[1rem] w-full ">
        <motion.div
          initial={{
            opacity: 0,
            y: 50, // Adding initial y offset for better entrance
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Animate to normal position
          }}
          viewport={{
            margin: "-100px",
            once: false,
          }}
          transition={{
            duration: 0.8, // Animation duration
            delay: 0.2, // Delay before animation starts
            ease: "easeOut", // Smoother easing function
          }}
          className="relative"
        >
          <div className="absolute top-[1.5rem] left-[4.5rem] lg:-top-4 lg:left-14 w-30 h-30 lg:w-52 bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter -z-50"></div>
          <div className="absolute -top-[2rem] left-[5.5rem] lg:-top-4 lg:left-14 w-30 h-30 lg:w-52 bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter -z-50"></div>
          <p className="text-[2rem] font-semibold text-body-1 lg:text-[3.7rem] text-center">
            Leetcode
          </p>
          <p className="text-body-2 text-[13px] lg:text-[1.2rem] text-center ">
            Track my progress and achievements
          </p>
        </motion.div>
        {!stats ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="w-full flex flex-col lg:flex-row gap-5 z-10">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }}
                className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]"
              >
                <div className="flex justify-between">
                  <p className="text-[1.2rem] text-body-4">Easy Problem</p>
                  <div className="size-7">
                    <VscPassFilled className="h-full w-full text-green-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-4xl font-medium text-green-500 pb-2">
                    {getCount("Easy")}
                  </div>
                  <div className="w-full  rounded-full h-2 mb-4 bg-gray-200">
                    <div
                      className="bg-green-600 h-2 rounded-full dark:bg-green-500"
                      style={{
                        width: `${
                          stats.allQuestionsCount &&
                          stats.matchedUser?.submitStats?.acSubmissionNum
                            ? Math.round(
                                (getCount("Easy") /
                                  stats.allQuestionsCount.find(
                                    (q) => q.difficulty === "Easy"
                                  )?.count) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }}
                className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]"
              >
                <div className="flex justify-between">
                  <p className="text-[1.2rem] text-body-4">Medium Problem</p>
                  <div className="size-7">
                    <BiAdjust className="h-full w-full text-yellow-400" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-4xl font-medium text-yellow-400  pb-2">
                    {getCount("Medium")}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700">
                    <div
                      className="bg-yellow-400 h-2 rounded-full "
                      style={{
                        width: `${
                          stats.allQuestionsCount &&
                          stats.matchedUser?.submitStats?.acSubmissionNum
                            ? Math.round(
                                (getCount("Medium") /
                                  stats.allQuestionsCount.find(
                                    (q) => q.difficulty === "Medium"
                                  )?.count) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }}
                className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1.5rem]"
              >
                <div className="flex justify-between">
                  <p className="text-[1.2rem] text-body-4">Hard Problem</p>
                  <div className="size-7">
                    <CgDanger className="h-full w-full text-red-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-4xl font-medium text-red-500 pb-2">
                    {getCount("Hard")}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className=" h-2 rounded-full bg-red-500"
                      style={{
                        width: `${
                          stats.allQuestionsCount &&
                          stats.matchedUser?.submitStats?.acSubmissionNum
                            ? Math.round(
                                (getCount("Hard") /
                                  stats.allQuestionsCount.find(
                                    (q) => q.difficulty === "Hard"
                                  )?.count) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col w-full gap-5 lg:flex-row lg:gap-[10rem]">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }}
                className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1rem] lg:px-[1.5rem] lg:justify-between lg:pb-[1.2rem]"
              >
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
                    {stats.matchedUser?.contestRating
                      ? `Rating: ${stats.matchedUser.contestRating}`
                      : "No contest data"}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }}
                className="flex flex-col w-full px-[1rem] bg-white/10 pt-[1.3rem] pb-[0.5rem] rounded-2xl gap-[1rem]  lg:px-[1.5rem]"
              >
                <div className="flex justify-between">
                  <p className="text-[1.5rem] text-body-4">Achievements</p>
                </div>
                <div>
                  <div className="flex items-center pb-3 gap-2 lg:gap-4">
                    <FaMedal className="size-6 lg:size-7.5 text-yellow-400" />
                    <p className=" text-sm font-medium text-body-2 lg:text-xl">
                      {getCount("Easy") + getCount("Medium") + getCount("Hard")}
                      + Problems Solved
                    </p>
                  </div>
                  <div className="flex items-center pb-3 gap-2 lg:gap-4">
                    <SlBadge className="size-6 lg:size-7.5 text-cyan-400" />
                    <p className="text-sm font-medium text-body-2 lg:text-xl">
                      {/* Streak info not available via API */}
                      Streak: N/A
                    </p>
                  </div>
                  <div className="flex items-center pb-3 gap-2 lg:gap-4">
                    <FaStar className="size-6 lg:size-7.5 text-purple-400" />
                    <div className="text-sm font-medium text-body-2 lg:text-xl">
                      {/* Top 10% info not available via API */}
                      Top 10% in Weekly Contest (static)
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

export default Leetcode;
