"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, HelpCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "Is Limitly really free?",
      a: "Yes! Limitly is completely free. No API keys, no payments, no usage limits. We provide a free hosted service that you can use immediately.",
    },
    {
      q: "Does it work with my framework?",
      a: "Limitly works with any Node.js framework: Express, Next.js, Fastify, Hono, and more. It's framework agnostic and works in both Node.js and browser environments.",
    },
    {
      q: "How does it work?",
      a: "Limitly uses a centralized service architecture. Your application uses the SDK to make HTTP requests to our hosted rate limiting service, which uses Redis and the token bucket algorithm to track and enforce rate limits.",
    },
    {
      q: "What is the token bucket algorithm?",
      a: "Token bucket is a rate limiting algorithm that allows bursts of traffic while maintaining an average rate. It's more accurate than fixed window limits and provides smoother rate limiting behavior.",
    },
    {
      q: "Can I use it with multiple services?",
      a: "Yes! Each service can have isolated rate limits using service IDs. This prevents cross-site collisions - the same IP across multiple apps gets separate rate limits per service.",
    },
    {
      q: "What happens if the service is down?",
      a: "Limitly has graceful degradation built-in. If the service is unavailable, the SDK will allow requests to pass through, ensuring your application continues to work even if rate limiting is temporarily unavailable.",
    },
  ];

  return (
    <section id="faq" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white/20" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter">
            Frequently asked <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <motion.div 
                  className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border ${isOpen ? 'border-white/30 bg-gradient-to-br from-white/10 to-white/5' : 'border-white/10 bg-gradient-to-br from-white/5 to-white/2'} backdrop-blur-xl hover:border-white/30 transition-all duration-500 cursor-pointer relative overflow-hidden`}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "-100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: isOpen ? ["-200%", "200%"] : "-200%" }}
                    transition={{ duration: 2, repeat: isOpen ? Infinity : 0, delay: i * 0.2 }}
                  />
                  
                  <button
                    className="flex items-start justify-between gap-4 sm:gap-6 font-bold text-lg sm:text-xl lg:text-2xl w-full text-left relative z-10"
                  >
                    <span className={`flex-1 transition-colors ${isOpen ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden relative z-10"
                      >
                        <motion.p 
                          className="text-white/70 leading-relaxed text-base sm:text-lg lg:text-xl mt-6 pt-6 border-t border-white/10"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
