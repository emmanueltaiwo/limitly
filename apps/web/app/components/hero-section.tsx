'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ChevronRight,
  Sparkles,
  Lock,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@repo/ui/button';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={heroRef}
      className='pt-32 pb-40 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden'
    >
      {/* Animated gradient orbs */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-linear-to-br from-white/20 via-white/5 to-transparent rounded-full blur-3xl -z-10'
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ y }}
      />
      <motion.div
        className='absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-linear-to-tl from-white/15 via-white/5 to-transparent rounded-full blur-3xl -z-10'
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{ y }}
      />

      <div className='max-w-7xl mx-auto w-full relative z-10'>
        <div className='text-center relative'>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl mb-12 relative overflow-hidden group'
          >
            <motion.span
              className='w-2.5 h-2.5 bg-white rounded-full'
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-sm text-white/90 font-medium relative z-10'>
              Free, fast, and feature-rich
            </span>
            <motion.div
              className='absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent'
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Main heading with enhanced animations */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 sm:mb-10 leading-[0.95] tracking-tighter px-2'
            style={{ opacity }}
          >
            <motion.span
              className='bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent relative inline-block'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rate Limiting
              <motion.span
                className='absolute -top-2 -right-4 sm:-top-4 sm:-right-8 text-2xl sm:text-4xl opacity-30'
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                ⚡
              </motion.span>
            </motion.span>
            <motion.span
              className='block bg-linear-to-b from-white/90 via-white/60 to-white/30 bg-clip-text text-transparent mt-2 sm:mt-3'
              initial={{ opacity: 0, y: 30 }}
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
            className='text-lg sm:text-xl md:text-2xl text-white/70 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed font-light px-2'
            style={{ opacity }}
          >
            The best TypeScript-first rate limiting SDK for Node.js and
            browsers. Redis-backed distributed rate limiting with optional
            bring-your-own Redis support.
          </motion.p>

          {/* CTA buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-16 sm:mb-24 w-full px-4'
            style={{ opacity }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto'
            >
              <Button
                href='/docs'
                className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-base sm:text-lg group inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/40 relative overflow-hidden'
              >
                <span className='relative z-10'>Get Started</span>
                <motion.span
                  className='relative z-10'
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className='w-5 h-5' />
                </motion.span>
                <motion.div
                  className='absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto'
            >
              <Button
                href='#install'
                className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group'
              >
                <span className='relative z-10'>View Installation</span>
                <motion.div
                  className='absolute inset-0 bg-white/5'
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Grid with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto'
            style={{ opacity }}
          >
            {[
              {
                label: 'Open Source',
                value: '100%',
                icon: Sparkles,
                color: 'from-yellow-500/20 to-orange-500/10',
              },
              {
                label: 'Free Forever',
                value: 'No Limits',
                icon: Lock,
                color: 'from-green-500/20 to-emerald-500/10',
              },
              {
                label: 'Type Safe',
                value: 'TypeScript',
                icon: Shield,
                color: 'from-blue-500/20 to-cyan-500/10',
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className='group relative'
                >
                  <div
                    className={`relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/30 transition-all duration-500 text-center overflow-hidden`}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    {/* Shine effect */}
                    <motion.div
                      className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12'
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: i * 0.5,
                      }}
                    />
                    <motion.div
                      className='absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity'
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className='w-8 h-8 sm:w-10 sm:h-10' />
                    </motion.div>
                    <div className='relative z-10'>
                      <div className='text-4xl sm:text-5xl font-black mb-3 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent'>
                        {stat.value}
                      </div>
                      <div className='text-sm sm:text-base text-white/70 font-medium'>
                        {stat.label}
                      </div>
                    </div>
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
