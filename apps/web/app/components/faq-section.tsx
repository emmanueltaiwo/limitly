'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: 'Is Limitly really free?',
      a: 'Yes! Limitly is completely free. No API keys, no payments, no usage limits. We provide a free hosted service that you can use immediately.',
    },
    {
      q: 'Does it work with my framework?',
      a: "Limitly works with any Node.js framework: Express, Next.js, Fastify, Hono, and more. It's framework agnostic and works in both Node.js and browser environments.",
    },
    {
      q: 'How does it work?',
      a: 'Limitly uses a centralized service architecture. Your application uses the SDK to make HTTP requests to our hosted rate limiting service, which uses Redis and the token bucket algorithm to track and enforce rate limits.',
    },
    {
      q: 'What is the token bucket algorithm?',
      a: "Token bucket is a rate limiting algorithm that allows bursts of traffic while maintaining an average rate. It's more accurate than fixed window limits and provides smoother rate limiting behavior.",
    },
    {
      q: 'Can I use it with multiple services?',
      a: 'Yes! Each service can have isolated rate limits using service IDs. This prevents cross-site collisions - the same IP across multiple apps gets separate rate limits per service.',
    },
    {
      q: 'What happens if the service is down?',
      a: 'Limitly has graceful degradation built-in. If the service is unavailable, the SDK will allow requests to pass through, ensuring your application continues to work even if rate limiting is temporarily unavailable.',
    },
  ];

  return (
    <section id='faq' className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter'>
            Frequently asked{' '}
            <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
              questions
            </span>
          </h2>
        </motion.div>

        <div className='space-y-4'>
          {faqs.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div
                  className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border ${
                    isOpen
                      ? 'border-white/30 bg-linear-to-br from-white/10 to-white/5'
                      : 'border-white/10 bg-linear-to-br from-white/5 to-white/2'
                  } backdrop-blur-xl hover:border-white/20 transition-all duration-200 cursor-pointer`}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <button className='flex items-start justify-between gap-4 sm:gap-6 font-bold text-lg sm:text-xl lg:text-2xl w-full text-left'>
                    <span
                      className={`flex-1 transition-colors ${
                        isOpen ? 'text-white' : 'text-white/90'
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className='shrink-0 p-2 rounded-lg bg-white/5'
                    >
                      <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
                    </motion.div>
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
                        <p className='text-white/70 leading-relaxed text-base sm:text-lg lg:text-xl mt-6 pt-6 border-t border-white/10'>
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
