"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/button";

export function CTASection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-black mb-10 tracking-tighter"
        >
          Ready to get <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">started?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-white/70 mb-14 max-w-3xl mx-auto font-light"
        >
          Join developers using Limitly for rate limiting. Free, fast, and fully type-safe.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              href="/docs"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-base sm:text-lg group inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/30 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
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
              href="https://github.com/emmanueltaiwo/limitly"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group"
            >
              <span className="relative z-10">View on GitHub</span>
              <motion.div
                className="absolute inset-0 bg-white/5"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
