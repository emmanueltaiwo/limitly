'use client';

import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode | string;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const codeContent =
    typeof children === 'string' ? children : String(children);

  return (
    <div className='relative my-6 rounded-lg overflow-hidden border border-green-500/30 bg-black/90 backdrop-blur-sm shadow-2xl shadow-green-500/10'>
      {/* Terminal window header */}
      <div className='flex items-center justify-between px-4 py-2.5 bg-linear-to-r from-green-950/50 via-black to-green-950/50 border-b border-green-500/20'>
        <div className='flex items-center gap-2'>
          {/* Terminal window controls */}
          <div className='flex gap-2 items-center'>
            <div
              className='w-3 h-3 rounded-full shadow-sm'
              style={{
                backgroundColor: '#ef4444',
                border: '1px solid rgba(248, 113, 113, 0.3)',
              }}
            />
            <div
              className='w-3 h-3 rounded-full shadow-sm'
              style={{
                backgroundColor: '#eab308',
                border: '1px solid rgba(250, 204, 21, 0.3)',
              }}
            />
            <div
              className='w-3 h-3 rounded-full shadow-sm'
              style={{
                backgroundColor: '#22c55e',
                border: '1px solid rgba(74, 222, 128, 0.3)',
              }}
            />
          </div>
          {language && (
            <span className='ml-3 text-xs font-mono text-green-400/80 font-semibold tracking-wider uppercase'>
              {language}
            </span>
          )}
        </div>
        <div className='text-xs font-mono text-green-500/60'>terminal</div>
      </div>

      {/* Scanline effect overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-size-[100%_4px]' />

      {/* Code content */}
      <div className='relative py-5'>
        <pre className='px-5 py-4 overflow-x-auto bg-black/40'>
          <code className='text-sm text-green-400 font-mono leading-relaxed whitespace-pre block'>
            {/* Terminal prompt */}
            <span className='text-green-500/70 select-none'>$ </span>
            <span className='text-green-300/90'>{codeContent}</span>
            {/* Blinking cursor */}
            <span className='inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse' />
          </code>
        </pre>

        {/* Glitch effect overlay (subtle) */}
        <div className='absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300'>
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-green-500/5 to-transparent animate-pulse' />
        </div>
      </div>

      {/* Bottom border glow */}
      <div className='h-px bg-linear-to-r from-transparent via-green-500/50 to-transparent' />
    </div>
  );
}
