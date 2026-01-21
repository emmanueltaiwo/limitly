'use client';

import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Lock, Shield } from 'lucide-react';
import { Button } from '@repo/ui/button';

export function HeroSection() {
  return (
    <section className='pt-32 pb-40 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center'>
      <div className='max-w-7xl mx-auto w-full relative z-10'>
        <div className='text-center relative'>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl mb-12'
          >
            <span className='w-2.5 h-2.5 bg-white rounded-full' />
            <span className='text-sm text-white/90 font-medium'>
              Free, fast, and feature-rich
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 sm:mb-10 leading-[0.95] tracking-tighter px-2'
          >
            <span className='block bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent'>
              Rate Limiting
            </span>
            <span className='block bg-linear-to-b from-white/90 via-white/60 to-white/30 bg-clip-text text-transparent mt-2 sm:mt-3'>
              Made Simple
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg sm:text-xl md:text-2xl text-white/70 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed font-light px-2'
          >
            The best TypeScript-first rate limiting SDK for Node.js and
            browsers. Redis-backed distributed rate limiting with optional
            bring-your-own Redis support.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-16 sm:mb-24 w-full px-4'
          >
            <Button
              href='/docs'
              className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-base sm:text-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-white/20'
            >
              Get Started
              <ChevronRight className='w-5 h-5' />
            </Button>
            <Button
              href='#install'
              className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-200 text-base sm:text-lg backdrop-blur-sm'
            >
              View Installation
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto'
          >
            {[
              {
                label: 'Open Source',
                value: '100%',
                icon: Sparkles,
              },
              {
                label: 'Free Forever',
                value: 'No Limits',
                icon: Lock,
              },
              {
                label: 'Type Safe',
                value: 'TypeScript',
                icon: Shield,
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className='relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/20 transition-all duration-300 text-center'
                >
                  <div className='absolute top-4 right-4 opacity-20'>
                    <Icon className='w-8 h-8 sm:w-10 sm:h-10' />
                  </div>
                  <div className='text-4xl sm:text-5xl font-black mb-3 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent'>
                    {stat.value}
                  </div>
                  <div className='text-sm sm:text-base text-white/70 font-medium'>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
