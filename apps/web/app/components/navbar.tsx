"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@repo/ui/button";
import { NpmIcon } from "./npm-icon";
import { Menu, X } from "lucide-react";
import { useState } from "react";


interface Props{
  hideLinks?:boolean
}
export function Navbar({hideLinks = false}:Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#install", label: "Installation" },
    { href: "#comparison", label: "Comparison" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl bg-black/40"
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight inline-flex items-center gap-2 group">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-2xl sm:text-3xl"
              >
                ⚡
              </motion.span>
              <span className="bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Limitly
              </span>
            </Link>
          </motion.div>
          
                      {/* Desktop Navigation */}
          {!hideLinks && (
          <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Link 
                href={item.href} 
                className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
          ))}
        </div>

          )}
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/docs" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium">
                Docs
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://www.npmjs.com/package/limitly-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label="View on npm"
              >
                <NpmIcon className="w-6 h-6" />
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                href="https://github.com/emmanueltaiwo/limitly"
                className="px-5 py-2.5 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20"
              >
                GitHub
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-4 space-y-3">
                {!hideLinks&&
                   navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )
                )}
               
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <Link
                    href="/docs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                  >
                    Docs
                  </Link>
                  <a
                    href="https://www.npmjs.com/package/limitly-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                  >
                    <NpmIcon className="w-5 h-5" />
                    <span>npm</span>
                  </a>
                  <Button
                    href="https://github.com/emmanueltaiwo/limitly"
                    className="w-full px-5 py-2.5 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-bold transition-all duration-200"
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
