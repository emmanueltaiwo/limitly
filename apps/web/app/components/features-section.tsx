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
      gradient: 'from-yellow-500/20 via-orange-500/10 to-transparent',
      iconGradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Lock,
      title: 'Free Forever',
      description:
        'No API keys, no payments, no limits on usage. Completely free for all projects.',
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      iconGradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Settings,
      title: 'Zero Config',
      description:
        'Works out of the box. Install, import, and start rate limiting in seconds.',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      iconGradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Gauge,
      title: 'Token Bucket',
      description:
        'Advanced token bucket algorithm for smooth, continuous rate limiting.',
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      iconGradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Bring Your Own Redis',
      description:
        'Optional Redis URL for full tenant isolation. Use your own Redis or the hosted service.',
      gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      iconGradient: 'from-indigo-400 to-blue-500',
    },
    {
      icon: ChevronRight,
      title: 'Dynamic Config',
      description:
        'Set limits per request without redeployment. Adjust on the fly.',
      gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
      iconGradient: 'from-rose-400 to-red-500',
    },
    {
      icon: BarChart,
      title: 'PostHog Analytics',
      description:
        'Optional PostHog integration to track rate limit events in your own analytics dashboard.',
      gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
      iconGradient: 'from-teal-400 to-cyan-500',
    },
  ];

  return (
    <section id='features' className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <motion.h2
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tighter px-2'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Built for{' '}
            <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
              developers
            </span>
          </motion.h2>
          <motion.p
            className='text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light px-2'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to implement sophisticated rate limiting without
            the complexity.
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className='group relative'
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-3xl bg-linear-to-br ${feature.gradient}`}
                />

                <div
                  className={`relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/30 transition-all duration-500 cursor-pointer h-full overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12'
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: i * 0.5,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className='mb-6 inline-flex p-4 rounded-2xl bg-linear-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500 relative overflow-hidden'
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 transition-opacity`}
                    />
                    <Icon
                      className={`w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 bg-linear-to-br ${feature.iconGradient} bg-clip-text text-transparent`}
                      style={{ WebkitTextFillColor: 'white' }}
                    />
                    <motion.div
                      className='absolute inset-0 bg-white/20'
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className='relative z-10'>
                    <h3 className='text-xl sm:text-2xl font-bold mb-4 bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent'>
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
