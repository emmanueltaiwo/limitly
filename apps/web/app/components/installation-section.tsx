'use client';

import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { CodeBlock } from '@repo/ui/code-block';
import { useState } from 'react';

interface InstallationStep {
  step: number;
  title: string;
  description: string;
  code: string;
  language: 'bash' | 'typescript';
  id: string;
}

export function InstallationSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps: InstallationStep[] = [
    {
      step: 1,
      title: 'Install via npm',
      description: 'Get the Limitly SDK for your project',
      code: 'npm install limitly-sdk',
      language: 'bash',
      id: 'install',
    },
    {
      step: 2,
      title: 'Create rate limiter',
      description:
        'Initialize the rate limiting client (recommended: use your own Redis)',
      code: `import { createClient } from 'limitly-sdk';

// Recommended: Use your own Redis + PostHog for analytics
const client = createClient({
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  serviceId: 'my-app',
  posthog: {
    apiKey: process.env.POSTHOG_API_KEY!,
  }
});

// Without redisUrl (shares hosted Redis - may collide with other users)
// const client = createClient({ serviceId: 'my-app' });`,
      language: 'typescript',
      id: 'init',
    },
    {
      step: 3,
      title: 'Use in your API',
      description: 'Protect your endpoints with rate limiting',
      code: `// Next.js App Router example
export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') || 'unknown';
  const result = await client.checkRateLimit(userId);
  
  if (!result.allowed) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // Process your request...
  return Response.json({ success: true });
}`,
      language: 'typescript',
      id: 'usage',
    },
  ];

  return (
    <section id='install' className='py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 sm:mb-20 tracking-tighter text-center px-2'
        >
          Get started in{' '}
          <span className='bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent'>
            seconds
          </span>
        </motion.h2>

        <div className='space-y-12 sm:space-y-16'>
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className='flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-12'
            >
              {/* Step number */}
              <div className='relative shrink-0'>
                <div className='flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white to-white/90 text-black font-black text-xl sm:text-2xl lg:text-3xl shadow-lg shadow-white/20'>
                  {item.step}
                </div>
              </div>

              {/* Content */}
              <div className='flex-1 w-full'>
                <div className='mb-6 sm:mb-8'>
                  <h3 className='text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 text-white'>
                    {item.title}
                  </h3>
                  <p className='text-base sm:text-lg text-white/60'>
                    {item.description}
                  </p>
                </div>
                <div className='relative'>
                  <div className='relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl'>
                    <CodeBlock language={item.language}>
                      {item.code}
                    </CodeBlock>
                    <button
                      onClick={() => copyToClipboard(item.code, item.id)}
                      className='absolute top-5 right-5 p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/10 hover:border-white/30'
                    >
                      {copied === item.id ? (
                        <Check className='w-5 h-5 text-green-400' />
                      ) : (
                        <Copy className='w-5 h-5 text-white/60' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
