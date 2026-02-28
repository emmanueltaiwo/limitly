'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Layers } from 'lucide-react';
import { useState } from 'react';

const faqs: { q: string; a: string }[] = [
  {
    q: 'Is Limitly really free?',
    a: 'Yes. No API keys, no payments, no usage limits. Use the hosted service or bring your own Redis.',
  },
  {
    q: 'Does it work with my framework?',
    a: 'Limitly works with any Node.js framework: Express, Next.js, Fastify, Hono, and more. Framework agnostic.',
  },
  {
    q: 'How does it work?',
    a: 'Your app uses the SDK to talk to the rate limiting service. We use Redis and the token bucket algorithm to track and enforce limits.',
  },
  {
    q: 'What is the token bucket algorithm?',
    a: 'It allows bursts while keeping an average rate. More accurate and smoother than fixed windows.',
  },
  {
    q: 'Can I use it with multiple services?',
    a: 'Yes. Each service has isolated limits via service IDs—same IP across apps gets separate limits per service.',
  },
  {
    q: 'What if the service is down?',
    a: 'Graceful degradation: if the service is unavailable, the SDK allows requests through so your app keeps working.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id='faq' className='py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-3xl mx-auto'>
        <header className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-white/95 font-mono tracking-tight flex items-center gap-2'>
            <Layers className='w-6 h-6 text-blue-500/70' />
            Call stack
          </h2>
          <p className='mt-2 text-sm text-white/50 font-mono'>
            Frequently asked questions.
          </p>
        </header>

        <div className='rounded-lg border border-white/10 bg-[#111] overflow-hidden'>
          <div className='px-3 py-2 border-b border-white/10 bg-[#0d0d0d]'>
            <span className='text-xs text-white/40 font-mono'>FRAMES</span>
          </div>
          <div className='divide-y divide-white/5'>
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className='w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-white/2 transition-colors'
                  >
                    <span className='font-mono text-sm text-white/90'>
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className='shrink-0 text-white/40'
                    >
                      <ChevronRight className='w-4 h-4' />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden'
                      >
                        <div className='px-4 pb-4 pt-0'>
                          <p className='font-mono text-xs text-white/60 leading-relaxed border-l-2 border-blue-500/30 pl-3'>
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
