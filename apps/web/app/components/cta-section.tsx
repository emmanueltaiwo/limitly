'use client';

import { motion } from 'motion/react';
import { ChevronRight, Github, Star } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { useState, useEffect } from 'react';

export function CTASection() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/emmanueltaiwo/limitly', {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setStars(data.stargazers_count ?? 0))
      .catch(() => setStars(null));
  }, []);

  return (
    <section className='py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-3xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='rounded-lg border border-white/10 bg-[#111] p-8 sm:p-10 text-center'
        >
          <h2 className='text-xl sm:text-2xl font-semibold text-white font-mono mb-2'>
            Ready to ship?
          </h2>
          <p className='text-sm text-white/50 font-mono mb-8'>
            Join developers using Limitly. Free, fast, type-safe.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
            <Button
              href='/docs'
              className='inline-flex w-full md:w-fit items-center gap-2 px-5 py-2.5 rounded-md bg-blue-500 text-black hover:bg-blue-400 font-semibold text-sm font-mono'
            >
              Get Started Free
              <ChevronRight className='w-4 h-4' />
            </Button>
            <Button
              href='https://github.com/emmanueltaiwo/limitly'
              className='inline-flex w-full md:w-fit items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-white/80 hover:bg-white/5 font-mono text-sm'
            >
              <Github className='w-4 h-4' />
              GitHub
              {stars !== null && stars > 0 && (
                <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-blue-400/90 text-xs font-mono'>
                  <Star className='w-3 h-3 fill-current' />
                  {stars.toLocaleString()}
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
