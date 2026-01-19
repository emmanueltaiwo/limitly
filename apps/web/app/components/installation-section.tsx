"use client";

import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { CodeBlock } from "@repo/ui/code-block";
import { useState } from "react";

interface InstallationStep {
  step: number;
  title: string;
  description: string;
  code: string;
  language: "bash" | "typescript";
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
      title: "Install via npm",
      description: "Get the Limitly SDK for your project",
      code: "npm install limitly-sdk",
      language: "bash",
      id: "install",
    },
    {
      step: 2,
      title: "Create rate limiter",
      description: "Initialize the rate limiting client",
      code: `import { rateLimit } from 'limitly-sdk';

const checkLimit = rateLimit();`,
      language: "typescript",
      id: "init",
    },
    {
      step: 3,
      title: "Use in your API",
      description: "Protect your endpoints with rate limiting",
      code: `// Next.js App Router example
export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') || 'unknown';
  const result = await checkLimit(userId);
  
  if (!result.allowed) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // Process your request...
  return Response.json({ success: true });
}`,
      language: "typescript",
      id: "usage",
    },
  ];

  return (
    <section id="install" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 sm:mb-20 tracking-tighter text-center px-2"
        >
          Get started in <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">seconds</span>
        </motion.h2>

        <div className="space-y-12 sm:space-y-16 relative">
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-white/20 via-white/10 to-transparent" />
          
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative"
            >
              <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12">
                {/* Step number */}
                <div className="relative shrink-0">
                  <motion.div 
                    className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-linear-to-br from-white to-white/80 text-black font-black text-lg sm:text-xl lg:text-2xl shadow-lg shadow-white/20 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.step}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white blur-xl opacity-50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-white/60">{item.description}</p>
                  </div>
                  <div className="relative group/code">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl"
                    >
                      <CodeBlock language={item.language}>
                        {item.code}
                      </CodeBlock>
                      <motion.button
                        onClick={() => copyToClipboard(item.code, item.id)}
                        className="absolute top-5 right-5 p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/10 hover:border-white/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copied === item.id ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Check className="w-5 h-5 text-green-400" />
                          </motion.div>
                        ) : (
                          <Copy className="w-5 h-5 text-white/60" />
                        )}
                      </motion.button>
                    </motion.div>
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
