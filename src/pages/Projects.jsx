import React, { useRef, useState, useEffect } from "react";
import Section from "../components/Section";
import {
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
} from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { motion } from "framer-motion";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShowMore = () => {
    setVisibleProjects((prev) =>
      prev + 3 <= projects.length ? prev + 3 : projects.length
    );
  };

  const handleShowLess = () => {
    setVisibleProjects(3);
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="projects">
      <div className="flex flex-col items-center relative py-[1rem] justify-between gap-[2rem] lg:py-[1rem] w-full">
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
          <div className="absolute top-[1.5rem] left-[0rem] lg:-top-4 lg:left-14 w-30 h-30 lg:w-52 bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <div className="absolute -top-[1.5rem] left-[4rem] lg:-top-4 lg:left-14 w-30 h-30 lg:w-52 bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <p className="text-[2rem] font-semibold text-body-4 lg:text-[3.7rem] text-center">
            My Projects
          </p>
        </motion.div>

        {/* Scroll Navigation Buttons - Only visible on lg screens */}
        <div className="hidden lg:flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-4 z-10 pointer-events-none">
          <button
            onClick={() => scroll("left")}
            className="bg-primary/10 hover:bg-primary/20 p-4 rounded-full backdrop-blur-sm pointer-events-auto transition-all"
          >
            <FaChevronLeft className="text-2xl text-primary" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-primary/10 hover:bg-primary/20 p-4 rounded-full backdrop-blur-sm pointer-events-auto transition-all"
          >
            <FaChevronRight className="text-2xl text-primary" />
          </button>
        </div>

        {/* Projects Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 lg:flex-row lg:overflow-x-auto lg:w-full lg:max-w-[90rem] lg:mx-auto lg:px-4 lg:pb-4 
            lg:snap-x lg:snap-mandatory scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
        >
          {projects
            .slice(
              0,
              window.innerWidth >= 1024 ? projects.length : visibleProjects
            )
            .map((project) => (
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
                  ease: "easeOut", // Smoother easing function
                }}
                key={project.id}
                className="px-3 py-[0.8rem] border-2 rounded-lg shadow-lg hover:shadow-primary/20 
                  border-gray-500/30 bg-black/5 backdrop-blur-2xl lg:min-w-[24rem] lg:max-w-[26rem] flex flex-col lg:gap-2 
                  transition-all duration-300 hover:border-primary/50 lg:snap-center"
              >
                <div className="aspect-video overflow-hidden rounded-lg shadow-lg group">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="mb-[1rem]">
                    <p className="text-[1.1rem] lg:text-xl font-medium text-body-1 py-1.5 lg:py-[0.8rem]">
                      {project.title}
                    </p>
                    <p className="text-[0.9rem] lg:text-base font-inter text-body-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-between flex-row gap-7 lg:gap-[1rem] pt-[0.8rem] lg:py-[0.8rem]">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md lg:text-base border-2 border-primary text-primary font-bold 
                          tracking-wide px-[0.6rem] rounded-full w-full hover:bg-primary/10 transition-colors py-[0.7rem] text-center"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md lg:text-base border-2 border-primary bg-primary text-black 
                          font-bold tracking-wide px-[0.6rem] rounded-full w-full hover:bg-primary/90 transition-colors py-[0.7rem] text-center"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Mobile Show More/Less Button */}
        {window.innerWidth < 1024 && projects.length > 3 && (
          <div className="flex pt-[1.5rem] lg:hidden">
            <button
              onClick={
                visibleProjects < projects.length
                  ? handleShowMore
                  : handleShowLess
              }
              className="mx-auto border-2 px-[1.8rem] py-[0.8rem] rounded-full flex gap-4 items-center 
                hover:bg-primary/10 transition-colors"
            >
              <p className="text-lg">
                {visibleProjects < projects.length ? "Show More" : "Show Less"}
              </p>
              {visibleProjects < projects.length ? (
                <FaArrowDown className="size-4" />
              ) : (
                <FaArrowUp className="size-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Projects;
