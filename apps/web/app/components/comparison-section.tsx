'use client';

import { motion } from 'motion/react';
import { Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@repo/ui/button';

type ServiceKey = 'express' | 'upstash' | 'arcjet' | 'unkey' | 'limitly';

interface Row {
  feature: string;
  express: string;
  upstash: string;
  arcjet: string;
  unkey: string;
  limitly: string;
}

const rows: Row[] = [
  {
    feature: 'TypeScript Support',
    express: '❌',
    upstash: '✅',
    arcjet: '✅',
    unkey: '✅',
    limitly: '✅ (first)',
  },
  {
    feature: 'Type Safety',
    express: '❌',
    upstash: '✅',
    arcjet: '✅',
    unkey: '✅',
    limitly: '✅ (full)',
  },
  {
    feature: 'IntelliSense',
    express: '❌',
    upstash: '✅',
    arcjet: '✅',
    unkey: '✅',
    limitly: '✅',
  },
  {
    feature: 'Free',
    express: '✅',
    upstash: '⚠️',
    arcjet: '⚠️',
    unkey: '⚠️',
    limitly: '✅ (no limits)',
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
    feature: 'Rate Limit Headers',
    express: '❌',
    upstash: '✅',
    arcjet: '✅',
    unkey: '✅',
    limitly: '✅',
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
    feature: 'Self-Hosted Option',
    express: '✅',
    upstash: '❌',
    arcjet: '❌',
    unkey: '❌',
    limitly: '✅',
  },
];

const services: { name: string; key: ServiceKey; highlight?: boolean }[] = [
  { name: 'express-rate-limit', key: 'express' },
  { name: 'Upstash', key: 'upstash' },
  { name: 'Arcjet', key: 'arcjet' },
  { name: 'Unkey', key: 'unkey' },
  { name: 'Limitly', key: 'limitly', highlight: true },
];

function cellContent(value: string) {
  if (value.includes('✅')) {
    const rest = value.replace('✅', '').trim();
    return (
      <span className='inline-flex items-center gap-1.5 text-emerald-400/90'>
        <Check className='w-4 h-4 shrink-0' />
        {rest && (
          <span className='text-white/70 text-xs font-mono'>{rest}</span>
        )}
      </span>
    );
  }
  if (value.includes('❌')) {
    return (
      <span className='inline-flex items-center gap-1.5 text-white/30'>
        <X className='w-4 h-4 shrink-0' />
      </span>
    );
  }
  if (value.includes('⚠️')) {
    const rest = value.replace('⚠️', '').trim();
    return (
      <span className='inline-flex items-center gap-1.5 text-blue-400/80'>
        <AlertCircle className='w-4 h-4 shrink-0' />
        {rest && (
          <span className='text-white/60 text-xs font-mono'>{rest}</span>
        )}
      </span>
    );
  }
  return null;
}

export function ComparisonSection() {
  return (
    <section
      id='comparison'
      className='py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative'
    >
      <div className='max-w-6xl mx-auto'>
        <header className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-white/95 font-mono tracking-tight'>
            Network
          </h2>
          <p className='mt-2 text-sm text-white/50 font-mono max-w-2xl'>
            Compare Limitly to other rate limiting solutions.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='rounded-lg border border-white/10 bg-[#111] overflow-hidden overflow-x-auto'
        >
          <table className='w-full min-w-[640px] font-mono text-xs'>
            <thead>
              <tr className='border-b border-white/10 bg-[#0d0d0d]'>
                <th className='text-left py-3 px-4 text-white/50 font-medium uppercase tracking-wider'>
                  Feature
                </th>
                {services.map((s) => (
                  <th
                    key={s.key}
                    className={`text-center py-3 px-3 font-medium ${
                      s.highlight
                        ? 'text-blue-400/90 bg-blue-500/5'
                        : 'text-white/50'
                    }`}
                  >
                    {s.highlight && (
                      <span className='block text-[10px] text-blue-500/80 mb-0.5'>
                        BEST
                      </span>
                    )}
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className='border-b border-white/5 hover:bg-white/2 transition-colors'
                >
                  <td className='py-3 px-4 text-white/80'>{row.feature}</td>
                  {services.map((s) => (
                    <td
                      key={s.key}
                      className={`py-3 px-3 text-center ${s.highlight ? 'bg-blue-500/3' : ''}`}
                    >
                      {cellContent(row[s.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='mt-10 flex justify-center'
        >
          <Button
            href='/docs'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-500 text-black hover:bg-blue-400 font-semibold text-sm font-mono'
          >
            Get Started Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
