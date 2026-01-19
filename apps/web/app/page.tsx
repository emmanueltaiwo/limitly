"use client";

import {motion, useScroll, useTransform} from "motion/react"
import { ChevronRight, Zap, Lock, Settings, Gauge, Shield, Copy, Check, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CodeBlock } from "@repo/ui/code-block";
import { Button } from "@repo/ui/button";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-linear-to-br from-white/10 via-white/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-linear-to-tl from-white/10 via-white/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-linear-to-l from-white/8 via-white/3 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Interactive cursor glow */}
        <motion.div
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
          }}
        />
      </div>

      {/* Enhanced grid pattern with parallax */}
      <motion.div 
        className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none"
        style={{ y }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none" />

      {/* Enhanced Navigation */}
      <Navbar />

      <main className="relative overflow-x-hidden">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center relative">
              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-linear-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl mb-10 relative overflow-hidden group"
              >
                <motion.span 
                  className="w-2.5 h-2.5 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-white/90 font-medium relative z-10">Free, fast, and feature-rich</span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {/* Main heading with enhanced typography */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tighter px-2"
              >
                <motion.span 
                  className="block bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Rate Limiting
                  <motion.span
                    className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 text-2xl sm:text-4xl opacity-20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡
                  </motion.span>
                </motion.span>
                <motion.span 
                  className="block bg-linear-to-b from-white/80 via-white/50 to-white/20 bg-clip-text text-transparent mt-1 sm:mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Made Simple
                </motion.span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-xl md:text-2xl text-white/60 mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed font-light px-2"
              >
                The best TypeScript-first rate limiting SDK for Node.js and browsers. Redis-backed distributed rate limiting with zero configuration needed.
              </motion.p>

              {/* Enhanced CTA buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 sm:mb-20 w-full px-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    href="/docs"
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-base sm:text-lg group inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/30 relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      className="relative z-10"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    href="#install"
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group"
                  >
                    <span className="relative z-10">View Installation</span>
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { label: "Open Source", value: "100%", icon: Sparkles },
                  { label: "Free Forever", value: "No Limits", icon: Lock },
                  { label: "Type Safe", value: "TypeScript", icon: Shield },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative"
                    >
                      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/30 hover:bg-linear-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 text-center relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <motion.div
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </motion.div>
                        <div className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3 relative z-10 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-white/60 font-medium relative z-10">{stat.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-8 tracking-tighter px-2">
                Built for <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">developers</span>
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light px-2">
                Everything you need to implement sophisticated rate limiting without the complexity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Zap,
                  title: "TypeScript-First",
                  description: "Fully typed with excellent IDE support. Catch errors at compile time, not runtime.",
                  gradient: "from-yellow-500/20 to-orange-500/10",
                },
                {
                  icon: Lock,
                  title: "Free Forever",
                  description: "No API keys, no payments, no limits on usage. Completely free for all projects.",
                  gradient: "from-green-500/20 to-emerald-500/10",
                },
                {
                  icon: Settings,
                  title: "Zero Config",
                  description: "Works out of the box. Install, import, and start rate limiting in seconds.",
                  gradient: "from-blue-500/20 to-cyan-500/10",
                },
                {
                  icon: Gauge,
                  title: "Token Bucket",
                  description: "Advanced token bucket algorithm for smooth, continuous rate limiting.",
                  gradient: "from-purple-500/20 to-pink-500/10",
                },
                {
                  icon: Shield,
                  title: "Service Isolation",
                  description: "Each service gets isolated rate limits. Same IP across sites? No problem.",
                  gradient: "from-indigo-500/20 to-blue-500/10",
                },
                {
                  icon: ChevronRight,
                  title: "Dynamic Config",
                  description: "Set limits per request without redeployment. Adjust on the fly.",
                  gradient: "from-rose-500/20 to-red-500/10",
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-3xl bg-gradlinearient-to-br ${feature.gradient}`} />
                    <div className="relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-white/30 transition-all duration-500 cursor-pointer h-full">
                      <motion.div 
                        className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500 relative overflow-hidden"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Installation Section */}
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
              {/* Connecting line */}
              <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-white/20 via-white/10 to-transparent" />
              
              {[
                {
                  step: 1,
                  title: "Install via npm",
                  description: "Get the Limitly SDK for your project",
                  code: "npm install limitly-sdk",
                  language: "bash" as const,
                  id: "install",
                },
                {
                  step: 2,
                  title: "Create rate limiter",
                  description: "Initialize the rate limiting client",
                  code: `import { rateLimit } from 'limitly-sdk';

const checkLimit = rateLimit();`,
                  language: "typescript" as const,
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
                  language: "typescript" as const,
                  id: "usage",
                },
              ].map((item, i) => (
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

        {/* Enhanced Comparison Section */}
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
                    {[
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
                    ].map((row, i) => (
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

        {/* Enhanced FAQ Section */}
        <section id="faq" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tighter">
                Frequently asked <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">questions</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Is Limitly really free?",
                  a: "Yes! Limitly is completely free. No API keys, no payments, no usage limits. We provide a free hosted service that you can use immediately.",
                },
                {
                  q: "Does it work with my framework?",
                  a: "Limitly works with any Node.js framework: Express, Next.js, Fastify, Hono, and more. It's framework agnostic and works in both Node.js and browser environments.",
                },
                {
                  q: "How does it work?",
                  a: "Limitly uses a centralized service architecture. Your application uses the SDK to make HTTP requests to our hosted rate limiting service, which uses Redis and the token bucket algorithm to track and enforce rate limits.",
                },
                {
                  q: "What is the token bucket algorithm?",
                  a: "Token bucket is a rate limiting algorithm that allows bursts of traffic while maintaining an average rate. It's more accurate than fixed window limits and provides smoother rate limiting behavior.",
                },
                {
                  q: "Can I use it with multiple services?",
                  a: "Yes! Each service can have isolated rate limits using service IDs. This prevents cross-site collisions - the same IP across multiple apps gets separate rate limits per service.",
                },
                {
                  q: "What happens if the service is down?",
                  a: "Limitly has graceful degradation built-in. If the service is unavailable, the SDK will allow requests to pass through, ensuring your application continues to work even if rate limiting is temporarily unavailable.",
                },
              ].map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative"
                  >
                    <div className={`p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border ${isOpen ? 'border-white/30 bg-linear-to-br from-white/10 to-white/5' : 'border-white/10 bg-linear-to-br from-white/5 to-white/2'} backdrop-blur-xl hover:border-white/30 hover:bg-linear-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 cursor-pointer relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent"
                        animate={{ opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="flex items-start justify-between gap-4 sm:gap-6 font-bold text-base sm:text-lg lg:text-xl w-full text-left relative z-10"
                      >
                        <span className={`flex-1 ${isOpen ? 'text-white' : 'text-white/90'}`}>{item.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="shrink-0"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? 16 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden relative z-10"
                      >
                        <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {item.a}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-10 tracking-tighter"
            >
              Ready to get <span className="bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">started?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/70 mb-14 max-w-3xl mx-auto font-light"
            >
              Join developers using Limitly for rate limiting. Free, fast, and fully type-safe.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  href="/docs"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 text-base sm:text-lg group inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/20 hover:shadow-white/30 relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  href="https://github.com/emmanueltaiwo/limitly"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">View on GitHub</span>
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
