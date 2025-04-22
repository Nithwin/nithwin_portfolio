import React from "react";
import Section from "../components/Section";
import { motion } from "framer-motion";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiOpenjdk, 
  SiCplusplus, SiC, SiDart, SiReact, SiTailwindcss, SiBootstrap, 
  SiFlutter, SiChakraui, SiMui,
  SiAndroidstudio, SiFigma, SiFirebase, 
  SiVercel, SiMongodb, SiGithub
} from "react-icons/si";
import { FiVideo } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

const skillsData = {
  tools: [
    { name: "VS Code", color: "#007ACC", icon: VscVscode },
    { name: "Android Studio", color: "#3DDC84", icon: SiAndroidstudio },
    { name: "DaVinci Resolve", color: "#FF4B4B", icon: FiVideo },
    { name: "Figma", color: "#F24E1E", icon: SiFigma },
    { name: "Firebase", color: "#FFCA28", icon: SiFirebase },
    { name: "Vercel", color: "#FFFFFF", icon: SiVercel },
    { name: "MongoDB", color: "#47A248", icon: SiMongodb },
    { name: "GitHub", color: "#FFFFFF", icon: SiGithub },
  ],
  languages: [
    { name: "HTML", color: "#FF5733", icon: SiHtml5 },
    { name: "CSS", color: "#2965F1", icon: SiCss3 },
    { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript },
    { name: "TypeScript", color: "#007ACC", icon: SiTypescript },
    { name: "Python", color: "#3776AB", icon: SiPython },
    { name: "Java", color: "#007396", icon: SiOpenjdk },
    { name: "C++", color: "#00599C", icon: SiCplusplus },
    { name: "C", color: "#A8B9CC", icon: SiC },
    { name: "Dart", color: "#0175C2", icon: SiDart },
  ],
  frameworks: [
    { name: "React", color: "#61DAFB", icon: SiReact },
    { name: "Tailwind CSS", color: "#06B6D4", icon: SiTailwindcss },
    { name: "Bootstrap", color: "#7952B3", icon: SiBootstrap },
    { name: "Flutter", color: "#02569B", icon: SiFlutter },
    { name: "Chakra UI", color: "#319795", icon: SiChakraui },
    { name: "Material UI", color: "#007FFF", icon: SiMui },
  ],
};

const Skills = () => {
  return (
    <Section id="skills">
      <div className="flex flex-col items-center relative py-[1rem] justify-between gap-[1rem] lg:py-[1rem] w-full">
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
                }} className="pb-[1rem] relative">
          <div className="absolute top-[1.5rem] left-[4.5rem] lg:-top-4 lg:left-[8.5rem] w-30 h-30 lg:w-[44rem] bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <div className="absolute -top-[2rem] left-[4.5rem] lg:-top-4 lg:left-[8.5rem] w-30 h-30 lg:w-[44rem] bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <h2 className="text-[2rem] font-semibold text-body-4 lg:text-[3.7rem] text-center pb-[0.7rem]">
            Skills & Technologies
          </h2>
          <p className="text-body-2 text-[13px] lg:text-[1.2rem] text-center">
            I specialize in the following technologies and frameworks to bring
            ideas to life through innovative solutions.
          </p>
        </motion.div>

        {/* First row (Tools) */}
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
        className="py-[1rem] relative overflow-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
          <motion.div
            className="flex gap-7"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <div
                key={arrayIndex}
                className="flex gap-7 lg:gap-[4rem] lg:px-[2rem]"
              >
                {skillsData.tools.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={`${arrayIndex}-${index}`}
                      className="flex items-center justify-center rounded-full px-10 py-4 lg:py-6 lg:px-16 hover:scale-110 transition-all duration-200"
                      style={{
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0px 0px 15px 2px ${skill.color}40`,
                      }}
                    >
                      <Icon
                        style={{ color: skill.color }}
                        className="text-2xl lg:text-5xl"
                        title={skill.name}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Second row (Languages) */}
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
                }} className="py-[1rem] relative overflow-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
          <motion.div
            className="flex gap-7"
            animate={{ x: [-1000,0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <div
                key={arrayIndex}
                className="flex gap-7 lg:gap-[4rem] lg:px-[2rem]"
              >
                {skillsData.languages.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={`${arrayIndex}-${index}`}
                      className="flex items-center justify-center rounded-full px-10 py-4 lg:py-6 lg:px-16 hover:scale-110 transition-all duration-200"
                      style={{
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0px 0px 15px 2px ${skill.color}40`,
                      }}
                    >
                      <Icon
                        style={{ color: skill.color }}
                        className="text-2xl lg:text-5xl"
                        title={skill.name}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Third row (Frameworks) */}
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
                }} className="py-[1rem] relative overflow-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
          <motion.div
            className="flex gap-7"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <div
                key={arrayIndex}
                className="flex gap-7 lg:gap-[4rem] lg:px-[2rem]"
              >
                {skillsData.frameworks.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={`${arrayIndex}-${index}`}
                      className="flex items-center justify-center rounded-full px-10 py-4 lg:py-6 lg:px-16 hover:scale-110 transition-all duration-200"
                      style={{
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0px 0px 15px 2px ${skill.color}40`,
                      }}
                    >
                      <Icon
                        style={{ color: skill.color }}
                        className="text-2xl lg:text-5xl"
                        title={skill.name}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Skills;
