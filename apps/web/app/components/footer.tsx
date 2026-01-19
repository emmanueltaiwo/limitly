"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { NpmIcon } from "./npm-icon";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 relative bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-black mb-3 inline-flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ⚡
              </motion.span>
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Limitly
              </span>
            </h3>
            <p className="text-white/60 text-sm font-medium">Free rate limiting for everyone.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8"
          >
            <Link href="/docs" className="text-white/60 hover:text-white transition-colors text-sm font-medium relative group">
              Docs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <a
              href="https://www.npmjs.com/package/limitly-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors relative group"
              aria-label="View on npm"
            >
              <NpmIcon className="w-5 h-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://github.com/emmanueltaiwo/limitly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-sm font-medium relative group"
            >
              GitHub
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 pt-8 mt-8 text-center"
        >
          <p className="text-white/50 text-sm font-medium">© {new Date().getFullYear()} Limitly. Free rate limiting for everyone.</p>
        </motion.div>
      </div>
    </footer>
  );
}
