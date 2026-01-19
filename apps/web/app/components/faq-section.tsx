"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
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
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tighter">
            Frequently asked <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">questions</span>
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
                <div className={`p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border ${isOpen ? 'border-white/30 bg-linear-to-br from-white/10 to-white/5' : 'border-white/10 bg-linear-to-br from-white/5 to-white/2'} backdrop-blur-xl hover:border-white/30 hover:bg-linear-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 cursor-pointer relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent"
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex items-start justify-between gap-4 sm:gap-6 font-bold text-base sm:text-lg lg:text-xl w-full text-left relative z-10"
                  >
                    <span className={`flex-1 ${isOpen ? 'text-white' : 'text-white/90'}`}>{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 16 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden relative z-10"
                  >
                    <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
