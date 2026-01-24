'use client';

import { motion } from 'motion/react';
import { ChevronRight, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@repo/ui/button';

interface ComparisonRow {
  feature: string;
  express: string;
  upstash: string;
  arcjet: string;
  unkey: string;
  limitly: string;
}

export function ComparisonSection() {
  const rows: ComparisonRow[] = [
    {
      feature: 'TypeScript Support',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅ (TypeScript-first)',
    },
    {
      feature: 'Type Safety',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅ (Full type exports)',
    },
    {
      feature: 'IntelliSense',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅ (JSDoc + types)',
    },
    {
      feature: 'Free',
      express: '✅',
      upstash: '⚠️ (Limited)',
      arcjet: '⚠️ (Limited)',
      unkey: '⚠️ (Limited)',
      limitly: '✅ (No limits)',
    },
    {
      feature: 'Distributed',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅ (Redis)',
    },
    {
      feature: 'Token Bucket',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅',
    },
    {
      feature: 'Dynamic Limits',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅',
    },
    {
      feature: 'Service Isolation',
      express: '❌',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅',
    },
    {
      feature: 'Rate Limit Headers',
      express: '❌ (manual)',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅ (automatic)',
    },
    {
      feature: 'Graceful Degradation',
      express: '❌',
      upstash: '❌',
      arcjet: '❌',
      unkey: '❌',
      limitly: '✅',
    },
    {
      feature: 'Zero Config',
      express: '✅',
      upstash: '✅',
      arcjet: '✅',
      unkey: '✅',
      limitly: '✅',
    },
    {
      feature: 'Self-Hosted Option',
      express: '✅',
      upstash: '❌',
      arcjet: '❌',
      unkey: '❌',
      limitly: '✅',
    },
  ];

  const services = [
    { name: 'express-rate-limit', key: 'express' as const },
    { name: 'Upstash', key: 'upstash' as const },
    { name: 'Arcjet', key: 'arcjet' as const },
    { name: 'Unkey', key: 'unkey' as const },
    { name: 'Limitly', key: 'limitly' as const, highlight: true },
  ];

  const getValue = (row: ComparisonRow, serviceKey: keyof ComparisonRow) => {
    return row[serviceKey];
  };

  const renderCell = (value: string) => {
    if (value.includes('✅')) {
      const text = value.replace('✅', '').trim();
      return (
        <div className='flex items-center justify-center gap-2'>
          <Check className='w-5 h-5 text-green-400' />
          {text && <span className='text-sm text-white/80'>{text}</span>}
        </div>
      );
    }
    if (value.includes('❌')) {
      const text = value.replace('❌', '').trim();
      return (
        <div className='flex items-center justify-center gap-2'>
          <X className='w-5 h-5 text-red-400/60' />
          {text && <span className='text-sm text-white/50'>{text}</span>}
        </div>
      );
    }
    if (value.includes('⚠️')) {
      const text = value.replace('⚠️', '').trim();
      return (
        <div className='flex items-center justify-center gap-2'>
          <AlertCircle className='w-5 h-5 text-yellow-400/80' />
          {text && <span className='text-sm text-white/70'>{text}</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <section id='comparison' className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tighter px-2'>
            Why choose{' '}
            <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
              Limitly?
            </span>
          </h2>
          <p className='text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light px-2'>
            See how Limitly compares to other rate limiting solutions
          </p>
        </motion.div>

        {/* Simple Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className='overflow-x-auto rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl'
        >
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/10'>
                <th className='text-left py-6 px-6 lg:px-8 text-sm font-semibold text-white/90 uppercase tracking-wider'>
                  Feature
                </th>
                {services.map((service) => (
                  <th
                    key={service.name}
                    className={`text-center py-6 px-4 lg:px-6 text-sm font-semibold ${
                      service.highlight
                        ? 'text-white bg-linear-to-br from-white/10 to-white/5'
                        : 'text-white/70'
                    }`}
                  >
                    {service.highlight && (
                      <span className='inline-block mb-1 px-2 py-0.5 rounded text-xs font-bold bg-white text-black'>
                        Best
                      </span>
                    )}
                    <div className={service.highlight ? 'mt-2' : ''}>
                      {service.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className='border-b border-white/5 hover:bg-white/5 transition-colors'
                >
                  <td className='py-6 px-6 lg:px-8 text-sm font-medium text-white/90'>
                    {row.feature}
                  </td>
                  {services.map((service) => {
                    const value = getValue(row, service.key);
                    return (
                      <td
                        key={service.name}
                        className={`py-6 px-4 lg:px-6 text-center ${
                          service.highlight
                            ? 'bg-linear-to-br from-white/5 to-white/2'
                            : ''
                        }`}
                      >
                        {renderCell(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className='mt-16 flex flex-col items-center gap-6 sm:gap-8'
        >
          <Button
            href='/docs'
            className='px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-base sm:text-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-white/20'
          >
            Get Started Free
            <ChevronRight className='w-5 h-5' />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
