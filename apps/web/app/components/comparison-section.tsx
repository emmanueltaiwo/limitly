"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/button";

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
    { feature: "TypeScript Support", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅ (TypeScript-first)" },
    { feature: "Type Safety", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅ (Full type exports)" },
    { feature: "IntelliSense", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅ (JSDoc + types)" },
    { feature: "Free", express: "✅", upstash: "⚠️ (Limited)", arcjet: "⚠️ (Limited)", unkey: "⚠️ (Limited)", limitly: "✅ (No limits)" },
    { feature: "Distributed", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅ (Redis)" },
    { feature: "Token Bucket", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅" },
    { feature: "Dynamic Limits", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅" },
    { feature: "Service Isolation", express: "❌", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅" },
    { feature: "Rate Limit Headers", express: "❌ (manual)", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅ (automatic)" },
    { feature: "Graceful Degradation", express: "❌", upstash: "❌", arcjet: "❌", unkey: "❌", limitly: "✅" },
    { feature: "Zero Config", express: "✅", upstash: "✅", arcjet: "✅", unkey: "✅", limitly: "✅" },
    { feature: "Self-Hosted Option", express: "✅", upstash: "❌", arcjet: "❌", unkey: "❌", limitly: "✅" },
  ];

  return (
    <section id="comparison" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-8 tracking-tighter px-2">
            Why choose <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">Limitly?</span>
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light px-2">
            See how Limitly compares to other rate limiting solutions
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl p-1 sm:p-2 -mx-4 sm:mx-0"
        >
          <div className="inline-block min-w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-5 px-6 lg:px-8 text-sm font-bold text-white/90 uppercase tracking-wider">Feature</th>
                  <th className="text-center py-5 px-4 lg:px-6 text-sm font-semibold text-white/70">express-rate-limit</th>
                  <th className="text-center py-5 px-4 lg:px-6 text-sm font-semibold text-white/70">Upstash</th>
                  <th className="text-center py-5 px-4 lg:px-6 text-sm font-semibold text-white/70">Arcjet</th>
                  <th className="text-center py-5 px-4 lg:px-6 text-sm font-semibold text-white/70">Unkey</th>
                  <th className="text-center py-5 px-4 lg:px-6 text-sm font-bold text-white bg-linear-to-br from-white/20 to-white/10 rounded-t-xl relative">
                    <span className="relative z-10">Limitly</span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-br from-white/30 to-white/10 rounded-t-xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <td className="py-5 px-3 sm:px-4 lg:px-8 text-sm text-white/90 font-semibold group-hover:text-white transition-colors">{row.feature}</td>
                    <td className="py-5 px-2 sm:px-3 lg:px-6 text-sm text-center text-white/60">{row.express}</td>
                    <td className="py-5 px-2 sm:px-3 lg:px-6 text-sm text-center text-white/60">{row.upstash}</td>
                    <td className="py-5 px-2 sm:px-3 lg:px-6 text-sm text-center text-white/60">{row.arcjet}</td>
                    <td className="py-5 px-2 sm:px-3 lg:px-6 text-sm text-center text-white/60">{row.unkey}</td>
                    <td className="py-5 px-2 sm:px-3 lg:px-6 text-sm text-center text-white font-bold bg-linear-to-br from-white/10 to-white/5 relative">
                      <span className="relative z-10">{row.limitly}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-8 font-medium">
            ⚠️ Limited free tiers may have usage restrictions or require credit cards
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              href="/docs"
              className="px-10 py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-lg group inline-flex items-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/30"
            >
              Get Started Free
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
