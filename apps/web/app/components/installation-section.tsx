'use client';

import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { EditorBlock } from './editor-block';

const steps = [
  {
    title: 'Install',
    desc: 'Get the Limitly SDK',
    code: 'npm install limitly-sdk',
    language: 'bash' as const,
    currentLine: 1,
  },
  {
    title: 'Create client',
    desc: 'Initialize with your Redis (optional)',
    code: `import { createClient } from 'limitly-sdk';

const client = createClient({
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  serviceId: 'my-app',
});`,
    language: 'typescript' as const,
    currentLine: 4,
  },
  {
    title: 'Use in your API',
    desc: 'Protect endpoints with one call',
    code: `export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') ?? 'anonymous';
  const result = await client.checkRateLimit(userId);

  if (!result.allowed) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  return Response.json({ success: true });
}`,
    language: 'typescript' as const,
    currentLine: 4,
  },
];

export function InstallationSection() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id='install'
      className='py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative'
    >
      <div className='max-w-6xl mx-auto'>
        <header className='mb-10 sm:mb-14'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold text-white/95 font-mono tracking-tight'>
            Console
          </h2>
          <p className='mt-2 text-xs sm:text-sm text-white/50 font-mono max-w-2xl'>
            Get started in seconds. Copy the snippets below.
          </p>
        </header>

        <div className='space-y-6 sm:space-y-8'>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className='rounded-lg border border-white/10 bg-[#111] overflow-hidden'
            >
              <div className='flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10 bg-[#0d0d0d]'>
                <div className='flex items-center gap-3 min-w-0'>
                  <span className='flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-500/15 text-amber-400 text-xs sm:text-sm font-mono font-semibold'>
                    {i + 1}
                  </span>
                  <div className='min-w-0'>
                    <h3 className='font-mono text-xs sm:text-sm font-medium text-white/90'>
                      {step.title}
                    </h3>
                    <p className='text-[11px] sm:text-xs text-white/50 font-mono truncate'>
                      {step.desc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copy(step.code, i)}
                  className='shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors text-[11px] text-white/70 font-mono'
                  aria-label='Copy snippet'
                >
                  {copied === i ? (
                    <>
                      <Check className='w-3.5 h-3.5 text-emerald-400' />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className='w-3.5 h-3.5' />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className='p-3 sm:p-4'>
                <EditorBlock
                  code={step.code}
                  language={step.language}
                  currentLine={step.currentLine}
                  lineNumbers={true}
                  className='w-full'
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
