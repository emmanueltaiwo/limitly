"use client";

import { motion } from "motion/react";
import { useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect } from "react";

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const yMouse = useSpring(mouseY, springConfig);
  
  // Transform mouse positions for cursor glow
  const cursorLeft = useTransform(x, (x) => x - 192);
  const cursorTop = useTransform(yMouse, (y) => y - 192);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Large animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-white/12 via-white/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ y }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-white/10 via-white/3 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ y }}
        />
        
        <motion.div 
          className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-gradient-to-r from-white/8 via-white/3 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          style={{ y }}
        />
        
        {/* Interactive cursor glow with smooth spring animation */}
        <motion.div
          className="absolute w-96 h-96 bg-white/8 rounded-full blur-3xl"
          style={{
            left: cursorLeft,
            top: cursorTop,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional floating orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              y,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced grid pattern with parallax */}
      <motion.div 
        className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10"
        style={{ y, opacity }}
      />
      
      {/* Animated radial gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-radial-gradient from-transparent via-black/30 to-black pointer-events-none -z-10"
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
