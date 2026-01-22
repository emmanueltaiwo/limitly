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
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'TypeScript-First',
      description:
        'Fully typed with excellent IDE support. Catch errors at compile time, not runtime.',
    },
    {
      icon: Lock,
      title: 'Free Forever',
      description:
        'No API keys, no payments, no limits on usage. Completely free for all projects.',
    },
    {
      icon: Settings,
      title: 'Zero Config',
      description:
        'Works out of the box. Install, import, and start rate limiting in seconds.',
    },
    {
      icon: Gauge,
      title: 'Multiple Algorithms',
      description:
        'Choose from token bucket, sliding window, fixed window, or leaky bucket algorithms.',
    },
    {
      icon: Shield,
      title: 'Bring Your Own Redis',
      description:
        'Optional Redis URL for full tenant isolation. Use your own Redis or the hosted service.',
    },
    {
      icon: ChevronRight,
      title: 'Dynamic Config',
      description:
        'Set limits per request without redeployment. Adjust on the fly.',
    },
    {
      icon: BarChart,
      title: 'PostHog Analytics',
      description:
        'Optional PostHog integration to track rate limit events in your own analytics dashboard.',
    },
  ];

  return (
    <section id='features' className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tighter px-2'>
            Built for{' '}
            <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
              developers
            </span>
          </h2>
          <p className='text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light px-2'>
            Everything you need to implement sophisticated rate limiting without
            the complexity.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className='group'
              >
                <div className='relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/20 transition-all duration-300 cursor-pointer h-full'>
                  {/* Icon */}
                  <div className='mb-6 inline-flex p-4 rounded-2xl bg-linear-to-br from-white/10 to-white/5'>
                    <Icon className='w-7 h-7 sm:w-8 sm:h-8 text-white' />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className='text-xl sm:text-2xl font-bold mb-4 text-white'>
                      {feature.title}
                    </h3>
                    <p className='text-white/60 leading-relaxed text-sm sm:text-base'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
