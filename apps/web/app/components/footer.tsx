'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NpmIcon } from './npm-icon';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className='border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Image
            src='/limitly-logo.png'
            alt='Limitly'
            width={20}
            height={20}
            className='object-contain opacity-80'
          />
          <span className='font-mono text-sm text-white/70'>limitly</span>
        </div>
        <div className='flex items-center gap-6 font-mono text-xs text-white/50'>
          <Link
            href='/docs'
            className='hover:text-amber-400/80 transition-colors'
          >
            Docs
          </Link>
          <a
            href='https://www.npmjs.com/package/limitly-sdk'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 hover:text-amber-400/80 transition-colors'
          >
            <NpmIcon className='w-4 h-4 [&_path:first-of-type]:fill-transparent [&_path:last-of-type]:fill-current' />
            npm
          </a>
          <a
            href='https://github.com/emmanueltaiwo/limitly'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 hover:text-amber-400/80 transition-colors'
          >
            <Github className='w-4 h-4' />
            GitHub
          </a>
        </div>
      </div>
      <p className='max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 text-center text-[11px] text-white/40 font-mono'>
        © {new Date().getFullYear()} Limitly. Free rate limiting for everyone.
      </p>
    </footer>
  );
}
