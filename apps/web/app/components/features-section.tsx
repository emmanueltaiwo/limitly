'use client';

import { motion } from 'motion/react';
import {
  Zap,
  Lock,
  Settings,
  Gauge,
  Shield,
  ChevronRight,
  BarChart,
  CircleDot,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'TypeScript-First',
    desc: 'Fully typed, catch errors at compile time.',
  },
  {
    icon: Lock,
    title: 'Free Forever',
    desc: 'No API keys, no payments, no usage caps.',
  },
  {
    icon: Settings,
    title: 'Zero Config',
    desc: 'Install, import, start rate limiting in seconds.',
  },
  {
    icon: Gauge,
    title: 'Multiple Algorithms',
    desc: 'Token bucket, sliding window, fixed window, leaky bucket.',
  },
  {
    icon: Shield,
    title: 'Bring Your Own Redis',
    desc: 'Full tenant isolation with your own Redis or hosted.',
  },
  {
    icon: ChevronRight,
    title: 'Dynamic Config',
    desc: 'Set limits per request without redeployment.',
  },
  {
    icon: BarChart,
    title: 'PostHog Analytics',
    desc: 'Optional PostHog integration for rate limit events.',
  },
];

export function FeaturesSection() {
  return (
    <section
      id='features'
      className='py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative'
    >
      <div className='max-w-6xl mx-auto'>
        <header className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-white/95 font-mono tracking-tight'>
            Watch
          </h2>
          <p className='mt-2 text-sm text-white/50 font-mono max-w-2xl'>
            Everything you need to implement rate limiting without the
            complexity.
          </p>
        </header>

        <div className='rounded-lg border border-white/10 bg-[#111] overflow-hidden'>
          <div className='px-3 py-2 border-b border-white/10 bg-[#0d0d0d] flex items-center gap-2'>
            <CircleDot className='w-3.5 h-3.5 text-blue-500/80' />
            <span className='text-xs text-white/40 font-mono'>
              BREAKPOINTS / FEATURES
            </span>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5'>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className='p-4 sm:p-5 hover:bg-white/2 transition-colors group'
                >
                  <div className='flex items-start gap-3'>
                    <div className='shrink-0 w-8 h-8 rounded flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-colors'>
                      <Icon className='w-4 h-4 text-white/70 group-hover:text-blue-400/90' />
                    </div>
                    <div className='min-w-0'>
                      <div className='font-mono text-sm font-medium text-white/95'>
                        {f.title}
                      </div>
                      <div className='mt-0.5 text-xs text-white/50 font-mono'>
                        {f.desc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
