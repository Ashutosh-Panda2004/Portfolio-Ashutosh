import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGithub, FaLaptopCode, FaTwitter, FaInstagram, FaFacebook, FaFileDownload } from 'react-icons/fa';
import { styles } from '../styles';
import ashutosh from '../assets/ashutosh.jpeg';
import SkillsGraph from "./Skillsgraph.jsx";

const AboutMe = () => {
  return (
    <>
    <div className="bg-gray-900 py-2 px-4 md:px-20 lg:px-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionText}>About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={ashutosh}
              alt="Ashutosh Panda"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white">Ashutosh Panda</h3>
            <p className="text-gray-400 mt-4">
              As a dedicated and versatile problem-solver, I have honed my skills
              in various disciplines, including programming, project management,
              and innovative thinking. With a passion for technology and a
              relentless drive to find solutions, I have taken on challenging
              projects and consistently delivered exceptional results.
            </p>
            <p className="text-gray-400 mt-4">
              Throughout my academic and professional journey, I have
              consistently demonstrated a strong work ethic, a keen eye for
              detail, and the ability to thrive in both collaborative and
              independent environments. My diverse skill set and unwavering
              commitment to excellence make me a valuable asset in any
              endeavor.
            </p>
            <p className="text-gray-400 mt-4">
              Beyond my technical expertise, I am a passionate advocate for
              innovation and continuous learning. I stay up-to-date with the
              latest industry trends and actively seek opportunities to expand
              my knowledge and contribute to the advancement of technology.
            </p>
            
            {/* Resume Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <a 
                href="https://shorturl.at/vnssb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
              >
                <FaFileDownload className="mr-2" size={20} />
                <span className="font-semibold">View Resume</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-8 mt-8"
            >
              <a href="https://linkedin.com/in/ashutosh2004" target="_blank" rel="noopener noreferrer">
                <div className="p-4 bg-white rounded-full hover:bg-gray-300 transition-colors duration-300">
                  <FaLinkedin className="text-black hover:text-gray-700 hover:scale-150 transition-all duration-300" size={24} />
                </div>
              </a>
              <a href="mailto:ashutoshpanda.india@gmail.com">
                <div className="p-4 bg-white rounded-full hover:bg-gray-300 transition-colors duration-300">
                  <FaEnvelope className="text-black hover:text-gray-700 hover:scale-150 transition-all duration-300" size={24} />
                </div>
              </a>
              <a href="https://github.com/Ashutosh-Panda2004" target="_blank" rel="noopener noreferrer">
                <div className="p-4 bg-white rounded-full hover:bg-gray-300 transition-colors duration-300">
                  <FaGithub className="text-black hover:text-gray-700 hover:scale-150 transition-all duration-300" size={24} />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
     
    </div>

    <SkillsGraph></SkillsGraph>

  
    
    </>
  );
};

export default AboutMe;






