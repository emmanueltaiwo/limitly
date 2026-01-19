"use client";

import { motion, useRef } from "motion/react";
import { ChevronRight, Sparkles, Lock, Shield } from "lucide-react";
import { Button } from "@repo/ui/button";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={heroRef} className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center relative">
          {/* Floating badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-linear-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl mb-10 relative overflow-hidden group"
          >
            <motion.span 
              className="w-2.5 h-2.5 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-white/90 font-medium relative z-10">Free, fast, and feature-rich</span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tighter px-2"
          >
            <motion.span 
              className="block bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rate Limiting
              <motion.span
                className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 text-2xl sm:text-4xl opacity-20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
            </motion.span>
            <motion.span 
              className="block bg-linear-to-b from-white/80 via-white/50 to-white/20 bg-clip-text text-transparent mt-1 sm:mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Made Simple
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-xl md:text-2xl text-white/60 mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed font-light px-2"
          >
            The best TypeScript-first rate limiting SDK for Node.js and browsers. Redis-backed distributed rate limiting with zero configuration needed.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 sm:mb-20 w-full px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                href="/docs"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-base sm:text-lg group inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/30 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                href="#install"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group"
              >
                <span className="relative z-10">View Installation</span>
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Open Source", value: "100%", icon: Sparkles },
              { label: "Free Forever", value: "No Limits", icon: Lock },
              { label: "Type Safe", value: "TypeScript", icon: Shield },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/30 hover:bg-linear-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 text-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <motion.div
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.div>
                    <div className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3 relative z-10 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 font-medium relative z-10">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
