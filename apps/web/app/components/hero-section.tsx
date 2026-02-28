'use client';

import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { EditorBlock } from './editor-block';

const heroCode = `// app/api/route.ts
export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') ?? 'anonymous';
  const result = await client.checkRateLimit(userId);

  if (!result.allowed) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  return Response.json({ success: true });
}`;

const variables = [
  { name: 'result.allowed', value: 'true', type: 'boolean' },
  { name: 'result.remaining', value: '99', type: 'number' },
  { name: 'result.limit', value: '100', type: 'number' },
  { name: 'result.resetAt', value: 'Date', type: 'Date' },
];

export function HeroSection() {
  return (
    <section className='pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 relative min-h-[85vh] flex items-center'>
      <div className='max-w-7xl mx-auto w-full relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mb-8'
        >
          <span className='inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400/90 text-xs font-mono'>
            <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
            Paused on breakpoint
          </span>
        </motion.div>

        <div className='grid lg:grid-cols-[1fr,320px] gap-6 lg:gap-8 items-start'>
          {/* Left: "Editor" with code */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='min-w-0'
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 font-mono'>
              Rate limiting,
              <br />
              <span className='text-blue-400/90'>inspected.</span>
            </h1>
            <p className='text-white/55 text-sm sm:text-base font-mono mb-6 max-w-xl'>
              TypeScript-first SDK. Redis-backed. Zero config. Free forever.
            </p>
            <EditorBlock
              code={heroCode}
              language='typescript'
              currentLine={5}
              title='api/route.ts'
              lineNumbers={true}
            />
            <div className='flex flex-wrap gap-3 mt-6'>
              <Button
                href='/docs'
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-500 text-black hover:bg-blue-400 font-semibold text-sm font-mono transition-colors'
              >
                Get Started
                <ChevronRight className='w-4 h-4' />
              </Button>
              <Button
                href='#install'
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-white/80 hover:bg-white/5 font-mono text-sm transition-colors'
              >
                Install
              </Button>
            </div>
          </motion.div>

          {/* Right: "Variables" panel */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='rounded-lg border border-white/10 bg-[#111] overflow-hidden shrink-0'
          >
            <div className='px-3 py-2 border-b border-white/10 bg-[#0d0d0d] flex items-center gap-2'>
              <span className='text-xs text-white/40 font-mono'>VARIABLES</span>
            </div>
            <div className='p-3 font-mono text-xs'>
              {variables.map((v, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-3 py-1.5 border-b border-white/5 last:border-0'
                >
                  <span className='text-cyan-400/90 shrink-0'>{v.name}</span>
                  <span className='text-white/70 truncate'>{v.value}</span>
                  <span className='text-white/35 shrink-0'>{v.type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
