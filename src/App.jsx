import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './styles/globals.css';
import Main from "./pages/Main";

// Loading component
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 bg-background flex items-center justify-center z-50"
  >
    <div className="relative w-24 h-24">
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #6B46C1, #9C42FF)', // Purple gradient
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: '0 0 20px rgba(156, 66, 255, 0.6)', // Glowing effect
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: ["0 0 5px rgba(107, 70, 193, 0.5)", "0 0 20px rgba(107, 70, 193, 0.8)", "0 0 5px rgba(107, 70, 193, 0.5)"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        style={{
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: '#18181b',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        style={{
          width: '10%',
          height: '10%',
          background: '#9C42FF', // Purple accent color
          borderRadius: '50%',
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [1, 0.2, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  </motion.div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Main />
      )}
    </AnimatePresence>
  );
};

export default App;