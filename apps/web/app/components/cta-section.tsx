'use client';

import { motion } from 'motion/react';
import { ChevronRight, Github, Star, Sparkles } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { useState, useEffect } from 'react';

export function CTASection() {
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/github-stars')
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stars))
      .catch(() => setGithubStars(null));
  }, []);

  return (
    <section className='py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Enhanced background effects */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <motion.div
          className='w-[1000px] h-[1000px] bg-white/5 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-2xl'
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className='max-w-5xl mx-auto text-center relative z-10'>
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-white rounded-full'
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-10 sm:mb-12 tracking-tighter'
        >
          Ready to get{' '}
          <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
            started?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-xl sm:text-2xl text-white/70 mb-16 max-w-3xl mx-auto font-light'
        >
          Join developers using Limitly for rate limiting. Free, fast, and fully
          type-safe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='flex flex-col sm:flex-row gap-5 justify-center items-center'
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
              <span className='relative z-10'>Get Started Free</span>
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
              href='https://github.com/emmanueltaiwo/limitly'
              className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group inline-flex items-center justify-center gap-2'
            >
              <Github className='w-5 h-5 relative z-10' />
              <span className='relative z-10'>View on GitHub</span>
              {githubStars !== null && githubStars > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sm font-semibold border border-white/20'
                >
                  <Star className='w-4 h-4 fill-current' />
                  {githubStars.toLocaleString()}
                </motion.span>
              )}
              <motion.div
                className='absolute inset-0 bg-white/5'
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
