// import { motion, useAnimation } from "framer-motion";
// import React, { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

// import { portfolio } from "../data";
// import { SectionWrapper } from "../hoc";
// import { styles } from "../styles";
// import { fadeIn, textVariant } from "../utils/motion";
// import AboutMe from "./Aboutme.jsx";

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   image,
// }) => {
//   const controls = useAnimation();
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("show");
//     }
//   }, [controls, inView]);

//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       ref={ref}
//       animate={controls}
//       initial="hidden"
//       variants={fadeIn("up", "spring", 0, 0.75)}
//       className={`w-full mt-[-2px] flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-5`}
//     >
//       <div className='relative w-full md:w-3/5'>
//         <img
//           src={image}
//           alt='project_image'
//           className='w-full h-auto object-cover md:rounded-3xl'
//         />
//       </div>

//       <div className={`w-full md:w-2/5 px-6 md:p-16 flex flex-col justify-center ${isEven ? "text-left md:text-left" : "text-left md:text-right"}`}>
//         <h3 className='text-white font-medium text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl lg:text-5xl leading-tight'>{name}</h3>
//         <p className='mt-4 text-secondary text-sm sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'>{description}</p>
//       </div>
//     </motion.div>
//   );
// };

// const Portfolio = () => {
//   return (
//     <>
//     <AboutMe></AboutMe>
//     <div className='text-center md:text-left md:px-20 lg:px-40'>
//       {/* <motion.div variants={textVariant()}>
//         <h2 className={`${styles.sectionText}`}>Portfolio</h2>
//       </motion.div> */}

      

//       <h2 className={`${styles.sectionText}`}>Portfolio</h2>


        
//       <div className='mt-10 md:mt-20 flex flex-col gap-10 md:gap-20'>
//         {portfolio.map((project, index) => (
//           <ProjectCard key={`project-${index}`} index={index} {...project} />
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default SectionWrapper(Portfolio, "portfolio");





















// // Portfolio.jsx

// import React, { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// import { portfolio } from "../data";
// import { SectionWrapper } from "../hoc";
// import { styles } from "../styles";
// import { fadeIn, textVariant } from "../utils/motion";
// import AboutMe from "./AboutMe.jsx"; // Ensure correct casing

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   image,
//   github, // Destructure the github prop
// }) => {
//   const controls = useAnimation();
//   const { ref, inView } = useInView({
//     threshold: 0,
//     triggerOnce: true, // Animate only once
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("show");
//     }
//   }, [controls, inView]);

//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       ref={ref}
//       animate={controls}
//       initial="hidden"
//       variants={fadeIn("up", "spring", 0.2 * index, 0.75)} // Stagger animations
//       className={`w-full mt-[-2px] flex flex-col md:flex-row ${
//         isEven ? "md:flex-row" : "md:flex-row-reverse"
//       } gap-5`}
//     >
//       <div className="relative w-full md:w-3/5">
//         <img
//           src={image}
//           alt={`${name} Screenshot`}
//           className="w-full h-auto object-cover md:rounded-3xl shadow-lg"
//         />
//       </div>

//       <div
//         className={`w-full md:w-2/5 px-6 md:p-16 flex flex-col justify-center ${
//           isEven ? "text-left md:text-left" : "text-left md:text-right"
//         }`}
//       >
//         <h3 className="text-white font-medium text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl lg:text-5xl leading-tight">
//           {name}
//         </h3>
//         <p className="mt-4 text-secondary text-sm sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl">
//           {description}
//         </p>

//         {/* GitHub Button */}
//         {github && (
//           <a
//             href={github}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-6 inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-300"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 mr-2"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
//             </svg>
//             GitHub
//           </a>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// const Portfolio = () => {
//   return (
//     <>
//       <AboutMe />
//       <div className="text-center md:text-left md:px-20 lg:px-40">
//         {/* Section Header with Animation */}
//         <motion.div variants={textVariant()} initial="hidden" animate="show">
//           <h2 className={`${styles.sectionText}`}>Portfolio</h2>
//         </motion.div>

//         {/* Portfolio Projects */}
//         <div className="mt-10 md:mt-20 flex flex-col gap-10 md:gap-20">
//           {portfolio.map((project, index) => (
//             <ProjectCard key={`project-${index}`} index={index} {...project} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Portfolio, "portfolio");





























import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { portfolio } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import AboutMe from "./AboutMe.jsx";

const titleAnimation = {
  hidden: {
    y: -50,
    opacity: 0,
    scale: 0.8,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1.5,
      bounce: 0.4,
    },
  },
};

const ProjectCard = ({ index, name, description, image, github }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: {
      x: isEven ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      rotateY: isEven ? -30 : 30,
    },
    show: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        duration: 1.2,
        bounce: 0.3,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={`w-full flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 relative`}
    >
      <motion.div 
        className="relative w-full md:w-3/5 overflow-hidden rounded-3xl shadow-2xl"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.div
          // className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
          variants={imageHoverVariants}
        />
        <motion.img
          src={image}
          alt={`${name} Screenshot`}
          variants={imageHoverVariants}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        variants={contentVariants}
        className={`w-full md:w-2/5 px-6 md:px-12 flex flex-col justify-center ${
          isEven ? "md:text-left" : "md:text-right"
        }`}
      >
        <motion.h3
          variants={contentVariants}
          className="text-white font-bold text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          {name}
        </motion.h3>
        
        <motion.p
          variants={contentVariants}
          className="mt-4 text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed"
        >
          {description}
        </motion.p>

        {github && (
          <motion.div
            variants={contentVariants}
            className="mt-6"
          >
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <>
      <AboutMe />
      <div className="relative py-20 md:px-20 lg:px-40">
        <motion.div
          variants={titleAnimation}
          initial="hidden"
          animate="show"
          className="text-center md:text-left mb-20"
        >
          <h2 className={`${styles.sectionText} relative inline-block`}>
            Portfolio
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
        </motion.div>

        <div className="flex flex-col gap-32">
          {portfolio.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Portfolio, "portfolio");