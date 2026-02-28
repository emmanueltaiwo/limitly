'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@repo/ui/button';
import { NpmIcon } from './npm-icon';
import {
  Menu,
  X,
  Github,
  Star,
  Bug,
  FileCode,
  Network,
  ListChecks,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  hideLinks?: boolean;
}

const debuggerTabs = [
  {
    id: 'sources',
    label: 'Sources',
    sublabel: 'Features',
    icon: FileCode,
    href: '#features',
  },
  {
    id: 'console',
    label: 'Console',
    sublabel: 'Install',
    icon: ListChecks,
    href: '#install',
  },
  {
    id: 'network',
    label: 'Network',
    sublabel: 'Compare',
    icon: Network,
    href: '#comparison',
  },
  { id: 'limitly', label: 'Limitly', icon: Bug, href: '/', active: true },
];

export function Navbar({ hideLinks = false }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/emmanueltaiwo/limitly', {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setGithubStars(data.stargazers_count ?? 0))
      .catch(() => setGithubStars(null));
  }, []);

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#install', label: 'Install' },
    { href: '#comparison', label: 'Compare' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-[#0a0a0a]/90 border-b border-white/6 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Tab bar: desktop only, hidden on docs (hideLinks) */}
        {!hideLinks && (
        <div className='hidden md:flex items-center justify-between h-12 border-b border-white/6'>
          <div className='flex items-center gap-0.5 min-w-0'>
            {debuggerTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.active;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-t border-b-2 transition-colors
                      min-w-0 shrink-0
                      ${
                        isActive
                          ? 'border-blue-500 text-white bg-[#111]'
                          : 'border-transparent text-white/45 hover:text-white/80 hover:bg-white/4'
                      }
                    `}
                  >
                    <Icon className='w-3.5 h-3.5 shrink-0' />
                    <span className='truncate'>{tab.label}</span>
                  </Link>
                );
              })}
          </div>
          <div className='flex items-center gap-2 shrink-0'>
            <Link
              href='/docs'
              className='text-[11px] font-mono text-white/45 hover:text-blue-400 transition-colors px-2 py-1 rounded'
            >
              docs
            </Link>
            <a
              href='https://www.npmjs.com/package/limitly-sdk'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/45 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5'
              aria-label='View on npm'
            >
              <NpmIcon className='w-5 h-5 [&_path:first-of-type]:fill-transparent [&_path:last-of-type]:fill-white/60' />
            </a>
            <Button
              href='https://github.com/emmanueltaiwo/limitly'
              className='h-7 px-3 rounded bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium border border-white/10 inline-flex items-center gap-1.5'
            >
              <Github className='w-3.5 h-3.5' />
              <span>GitHub</span>
              {githubStars !== null && (
                <span className='inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[10px] font-mono'>
                  <Star className='w-2.5 h-2.5 fill-current' />
                  {githubStars > 0 ? githubStars.toLocaleString() : '0'}
                </span>
              )}
            </Button>
          </div>
        </div>
        )}

        {/* Main row: logo + desktop nav (or docs links when hideLinks) + mobile menu */}
        <div className='flex items-center justify-between h-14 md:h-12'>
          <Link
            href='/'
            className='flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors'
          >
            <Image
              src='/limitly-logo.png'
              alt='Limitly'
              width={24}
              height={24}
              className='object-contain opacity-90'
            />
            <span className='font-mono text-white'>limitly</span>
          </Link>

          {!hideLinks ? (
            <div className='hidden md:flex items-center gap-0.5'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='px-3 py-2 text-[12px] text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors font-medium font-mono'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className='hidden md:flex items-center gap-2 ml-auto'>
              <Link
                href='/'
                className='text-[11px] font-mono text-white/45 hover:text-blue-400 transition-colors px-2 py-1 rounded'
              >
                Home
              </Link>
              <Link
                href='/docs'
                className='text-[11px] font-mono text-blue-400 px-2 py-1 rounded'
              >
                docs
              </Link>
              <a
                href='https://www.npmjs.com/package/limitly-sdk'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/45 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5'
                aria-label='View on npm'
              >
                <NpmIcon className='w-5 h-5 [&_path:first-of-type]:fill-transparent [&_path:last-of-type]:fill-white/60' />
              </a>
              <Button
                href='https://github.com/emmanueltaiwo/limitly'
                className='h-7 px-3 rounded bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium border border-white/10 inline-flex items-center gap-1.5'
              >
                <Github className='w-3.5 h-3.5' />
                <span>GitHub</span>
                {githubStars !== null && (
                  <span className='inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[10px] font-mono'>
                    <Star className='w-2.5 h-2.5 fill-current' />
                    {githubStars > 0 ? githubStars.toLocaleString() : '0'}
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Right: menu on mobile only */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='md:hidden p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10'
              aria-label='Toggle menu'
            >
              {mobileMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: full panel with big nav cards */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='md:hidden fixed inset-0 top-[calc(3.5rem+1px)] z-40 bg-black/60 backdrop-blur-sm'
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='md:hidden fixed left-0 right-0 top-[calc(3.5rem+1px)] z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0d0d0d] shadow-xl'
            >
              <div className='p-4 space-y-4'>
                {!hideLinks && (
                  <>
                    <p className='text-[10px] font-mono uppercase tracking-wider text-white/40 px-1'>
                      Navigate
                    </p>
                    <div className='grid grid-cols-2 gap-3'>
                      {debuggerTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <Link
                            key={tab.id}
                            href={tab.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className='flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-[#111] hover:border-blue-500/30 hover:bg-white/3 active:scale-[0.98] transition-all'
                          >
                            <div className='shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center'>
                              <Icon className='w-5 h-5 text-blue-400/90' />
                            </div>
                            <div className='min-w-0 flex-1'>
                              <span className='block font-mono text-sm font-medium text-white'>
                                {tab.label}
                              </span>
                              <span className='block font-mono text-xs text-white/50 mt-0.5'>
                                {tab.sublabel ?? 'Home'}
                              </span>
                            </div>
                            <ChevronRight className='w-4 h-4 text-white/30 shrink-0' />
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href='#faq'
                      onClick={() => setMobileMenuOpen(false)}
                      className='flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/10 bg-[#111] hover:border-blue-500/30 font-mono text-sm text-white/90'
                    >
                      FAQ
                      <ChevronRight className='w-4 h-4 text-white/30' />
                    </Link>
                  </>
                )}
                <div className='pt-2 border-t border-white/10'>
                  <p className='text-[10px] font-mono uppercase tracking-wider text-white/40 px-1 mb-3'>
                    Links
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <Link
                      href='/docs'
                      onClick={() => setMobileMenuOpen(false)}
                      className='inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm font-medium'
                    >
                      Docs
                    </Link>
                    <a
                      href='https://www.npmjs.com/package/limitly-sdk'
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={() => setMobileMenuOpen(false)}
                      className='inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 font-mono text-sm hover:bg-white/10'
                    >
                      <NpmIcon className='w-4 h-4 [&_path:first-of-type]:fill-transparent [&_path:last-of-type]:fill-current' />
                      npm
                    </a>
                    <Button
                      href='https://github.com/emmanueltaiwo/limitly'
                      className='inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-mono text-sm hover:bg-white/10'
                    >
                      <Github className='w-4 h-4' />
                      GitHub
                      {githubStars !== null && githubStars > 0 && (
                        <span className='inline-flex items-center gap-1 text-blue-400 text-xs font-mono'>
                          <Star className='w-3 h-3 fill-current' />
                          {githubStars.toLocaleString()}
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
