import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaReact, FaCogs, FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SkillsGraph = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visualType, setVisualType] = useState('bars');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const skills = [
    { 
      category: "Languages",
      icon: <FaCode className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600",
      items: [
        { name: "Python", level: 90, description: "Data structures, algorithms, web scraping" },
        { name: "C++", level: 85, description: "DSA, competitive programming" },
        { name: "JavaScript", level: 80, description: "Full-stack web development" },
        { name: "Java", level: 75, description: "Object-oriented programming" },
        { name: "HTML/CSS", level: 85, description: "Responsive web design" }
      ]
    },
    { 
      category: "Frameworks & Libraries",
      icon: <FaReact className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      items: [
        { name: "React", level: 85, description: "Component-based UI development" },
        { name: "Node.js", level: 80, description: "Server-side JavaScript" },
        { name: "Express", level: 75, description: "RESTful API development" },
        { name: "Tailwind", level: 90, description: "Utility-first CSS framework" },
        { name: "Three.js", level: 70, description: "3D graphics programming" }
      ]
    },
    { 
      category: "Programming Paradigms",
      icon: <FaCogs className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      hoverColor: "from-green-600 to-teal-600",
      items: [
        { name: "OOP", level: 90, description: "Object-oriented design patterns" },
        { name: "Functional", level: 85, description: "Pure functions, immutability" },
        { name: "Event-Driven", level: 80, description: "Asynchronous programming" },
        { name: "Procedural", level: 85, description: "Structured programming" }
      ]
    }
  ];

  const renderVisualization = (skillCategory) => {
    const data = skillCategory.items.map(item => ({
      name: item.name,
      value: item.level,
      description: item.description
    }));

    switch (visualType) {
      case 'line':
        return (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#fff"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#fff" domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'pie':
        return (
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={2000}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return (
          <div className="h-80 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#fff"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#fff" domain={[0, 100]} />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8"
                  animationDuration={2000}
                  onMouseEnter={(data) => setHoveredSkill(data.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="bg-gray-900 py-20 px-4 md:px-20 min-h-screen flex items-center justify-center"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Technical Expertise
        </motion.h2>

        <motion.div 
          className="flex justify-center gap-4 mb-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {['bars', 'pie', 'line'].map((type, index) => (
            <motion.button
              key={type}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
              onClick={() => setVisualType(type)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                visualType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {type === 'bars' && <FaChartBar />}
              {type === 'line' && <FaChartLine />}
              {type === 'pie' && <FaChartPie />}
              {type.charAt(0).toUpperCase() + type.slice(1)} Chart
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {['all', ...new Set(skills.map(s => s.category))].map((category, index) => (
            <motion.button
              key={category}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {skills
              .filter(skillCategory => 
                selectedCategory === 'all' || skillCategory.category === selectedCategory
              )
              .map((skillCategory, categoryIndex) => (
                <motion.div
                  key={skillCategory.category}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  exit="exit"
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
                >
                  <motion.div 
                    className={`p-6 bg-gradient-to-r ${skillCategory.color}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        {skillCategory.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">{skillCategory.category}</h3>
                    </div>
                  </motion.div>
                  
                  <div className="p-6">
                    {renderVisualization(skillCategory)}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsGraph;