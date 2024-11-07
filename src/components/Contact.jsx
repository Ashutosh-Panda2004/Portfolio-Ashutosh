import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";

const InputField = ({ label, type = "text", name, placeholder, textarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    focused: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
    unfocused: { scale: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <motion.label 
        className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
          isFocused ? 'text-blue-400' : 'text-white'
        }`}
      >
        {label}
      </motion.label>
      <motion.div
        variants={variants}
        animate={isFocused ? "focused" : "unfocused"}
        className="relative"
      >
        {textarea ? (
          <textarea
            name={name}
            rows="6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white 
                     placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white 
                     placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-300 backdrop-blur-sm"
            placeholder={placeholder}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-6">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/30"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(30,64,175,0.2), rgba(88,28,135,0.2), rgba(0,0,0,0.3))",
            "linear-gradient(to bottom right, rgba(88,28,135,0.2), rgba(30,64,175,0.2), rgba(0,0,0,0.3))",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="text-5xl font-bold text-white mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="text-white/70 text-lg"
            >
              Let's create something amazing together
            </motion.p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <InputField
                label="Full Name"
                name="name"
                placeholder="John Doe"
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
              />
              <InputField
                label="Message"
                name="message"
                placeholder="Your message here..."
                textarea
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                         font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block mr-2"
                      />
                      Sending...
                    </motion.div>
                  ) : submitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Message Sent! ✨
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");




