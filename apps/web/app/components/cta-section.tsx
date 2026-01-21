'use client';

import { motion } from 'motion/react';
import { ChevronRight, Github, Star } from 'lucide-react';
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
    <section className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-5xl mx-auto text-center relative z-10'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-xl sm:text-2xl text-white/70 mb-16 max-w-3xl mx-auto font-light'
        >
          Join developers using Limitly for rate limiting. Free, fast, and fully
          type-safe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-col sm:flex-row gap-5 justify-center items-center'
        >
          <Button
            href='/docs'
            className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-base sm:text-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-white/20'
          >
            Get Started Free
            <ChevronRight className='w-5 h-5' />
          </Button>

          <Button
            href='https://github.com/emmanueltaiwo/limitly'
            className='w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-200 text-base sm:text-lg backdrop-blur-sm inline-flex items-center justify-center gap-2'
          >
            <Github className='w-5 h-5' />
            <span>View on GitHub</span>
            {githubStars !== null && githubStars > 0 && (
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sm font-semibold border border-white/20'>
                <Star className='w-4 h-4 fill-current' />
                {githubStars.toLocaleString()}
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
