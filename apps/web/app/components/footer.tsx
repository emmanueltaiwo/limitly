'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { NpmIcon } from './npm-icon';
import { Github, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/github-stars')
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stars))
      .catch(() => setGithubStars(null));
  }, []);

  return (
    <footer className='border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 relative bg-black/50 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='text-2xl font-black mb-3 inline-flex items-center gap-2'>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className='relative w-6 h-6'
              >
                <Image
                  src='/limitly-logo.png'
                  alt='Limitly Logo'
                  width={24}
                  height={24}
                  className='object-contain'
                />
              </motion.div>
              <span className='bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent'>
                Limitly
              </span>
            </h3>
            <p className='text-white/60 text-sm font-medium'>
              Free rate limiting for everyone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex items-center gap-6 sm:gap-8'
          >
            <Link
              href='/docs'
              className='text-white/60 hover:text-white transition-colors text-sm font-medium relative group'
            >
              Docs
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300' />
            </Link>
            <a
              href='https://www.npmjs.com/package/limitly-sdk'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/60 hover:text-white transition-colors relative group'
              aria-label='View on npm'
            >
              <NpmIcon className='w-5 h-5' />
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300' />
            </a>
            <a
              href='https://github.com/emmanueltaiwo/limitly'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/60 hover:text-white transition-colors text-sm font-medium relative group inline-flex items-center gap-2'
            >
              <Github className='w-5 h-5' />
              <span>GitHub</span>
              {githubStars !== null && githubStars > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold'
                >
                  <Star className='w-3 h-3 fill-current' />
                  {githubStars.toLocaleString()}
                </motion.span>
              )}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300' />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='border-t border-white/10 pt-8 mt-8 text-center'
        >
          <p className='text-white/50 text-sm font-medium'>
            © {new Date().getFullYear()} Limitly. Free rate limiting for
            everyone.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
