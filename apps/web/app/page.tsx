"use client";

import Link from "next/link";
import { CodeBlock } from "@repo/ui/code-block";
import { Button } from "@repo/ui/button";
import { ChevronRight, Zap, Lock, Settings, Gauge, Shield, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative border-b border-white/10 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              ⚡ Limitly
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                Features
              </Link>
              <Link href="#install" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                Installation
              </Link>
              <Link href="#comparison" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                Comparison
              </Link>
              <Link href="#faq" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                FAQ
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/docs" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                Docs
              </Link>
              <Button
                href="https://github.com/emmanueltaiwo/limitly"
                className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-semibold transition-all duration-200"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-sm text-white/80">Free, fast, and feature-rich</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                  Rate Limiting
                </span>
                <br />
                <span className="bg-gradient-to-b from-white/70 to-white/30 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                The best TypeScript-first rate limiting SDK for Node.js and browsers. Redis-backed distributed rate limiting with zero configuration needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button
                  href="/docs"
                  className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-lg group inline-flex items-center gap-2"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  href="#install"
                  className="px-8 py-4 border border-white/30 text-white hover:border-white/60 hover:bg-white/5 font-semibold rounded-full transition-all duration-200 text-lg"
                >
                  View Installation
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { label: "Open Source", value: "100%" },
                  { label: "Free Forever", value: "No Limits" },
                  { label: "Type Safe", value: "TypeScript" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
                Built for <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">developers</span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Everything you need to implement sophisticated rate limiting without the complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "TypeScript-First",
                  description: "Fully typed with excellent IDE support. Catch errors at compile time, not runtime.",
                },
                {
                  icon: Lock,
                  title: "Free Forever",
                  description: "No API keys, no payments, no limits on usage. Completely free for all projects.",
                },
                {
                  icon: Settings,
                  title: "Zero Config",
                  description: "Works out of the box. Install, import, and start rate limiting in seconds.",
                },
                {
                  icon: Gauge,
                  title: "Token Bucket",
                  description: "Advanced token bucket algorithm for smooth, continuous rate limiting.",
                },
                {
                  icon: Shield,
                  title: "Service Isolation",
                  description: "Each service gets isolated rate limits. Same IP across sites? No problem.",
                },
                {
                  icon: ChevronRight,
                  title: "Dynamic Config",
                  description: "Set limits per request without redeployment. Adjust on the fly.",
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
                  >
                    <div className="mb-6 inline-flex p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section id="install" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black mb-16 tracking-tight text-center">
              Get started in <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">seconds</span>
            </h2>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="group">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black font-bold flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Install via npm</h3>
                    <p className="text-white/60">Get the Limitly SDK for your project</p>
                  </div>
                </div>
                <div className="relative">
                  <CodeBlock language="bash">
{`npm install limitly-sdk`}
                  </CodeBlock>
                  <button
                    onClick={() => copyToClipboard("npm install limitly-sdk", "install")}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied === "install" ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/60" />}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Create rate limiter</h3>
                    <p className="text-white/60">Initialize the rate limiting client</p>
                  </div>
                </div>
                <div className="relative">
                  <CodeBlock language="typescript">
{`import { rateLimit } from 'limitly-sdk';

const checkLimit = rateLimit();`}
                  </CodeBlock>
                  <button
                    onClick={() => copyToClipboard(`import { rateLimit } from 'limitly-sdk';

const checkLimit = rateLimit();`, "init")}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied === "init" ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/60" />}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black font-bold flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Use in your API</h3>
                    <p className="text-white/60">Protect your endpoints with rate limiting</p>
                  </div>
                </div>
                <div className="relative">
                  <CodeBlock language="typescript">
{`// Next.js App Router example
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
}`}
                  </CodeBlock>
                  <button
                    onClick={() => copyToClipboard(`export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') || 'unknown';
  const result = await checkLimit(userId);
  
  if (!result.allowed) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  return Response.json({ success: true });
}`, "usage")}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied === "usage" ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/60" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
                Why choose <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Limitly?</span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                See how Limitly compares to other rate limiting solutions
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Feature</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">express-rate-limit</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">Upstash</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">Arcjet</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">Unkey</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-white bg-white/10 rounded-t-lg">Limitly</th>
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
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-sm text-white/90 font-medium">{row.feature}</td>
                        <td className="py-4 px-6 text-sm text-center text-white/60">{row.express}</td>
                        <td className="py-4 px-6 text-sm text-center text-white/60">{row.upstash}</td>
                        <td className="py-4 px-6 text-sm text-center text-white/60">{row.arcjet}</td>
                        <td className="py-4 px-6 text-sm text-center text-white/60">{row.unkey}</td>
                        <td className="py-4 px-6 text-sm text-center text-white font-medium bg-white/5">{row.limitly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 text-sm mb-6">
                ⚠️ Limited free tiers may have usage restrictions or require credit cards
              </p>
              <Button
                href="/docs"
                className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-lg group inline-flex items-center gap-2"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
                Frequently asked <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">questions</span>
              </h2>
            </div>

            <div className="space-y-6">
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
              ].map((item, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
                >
                  <summary className="flex items-start justify-between gap-4 font-semibold text-lg">
                    <span>{item.q}</span>
                    <ChevronRight className="w-6 h-6 flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-white/70 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-black mb-8 tracking-tight">
              Ready to get <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">started?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join developers using Limitly for rate limiting. Free, fast, and fully type-safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/docs"
                className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-200 text-lg group inline-flex items-center gap-2 justify-center"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="https://github.com/emmanueltaiwo/limitly"
                className="px-8 py-4 border border-white/30 text-white hover:border-white/60 hover:bg-white/5 font-bold rounded-full transition-all duration-200 text-lg"
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">⚡ Limitly</h3>
              <p className="text-white/60 text-sm">Free rate limiting for everyone.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-white/60 hover:text-white transition-colors text-sm">
                Docs
              </Link>
              <a
                href="https://github.com/emmanueltaiwo/limitly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 mt-8 text-center">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} Limitly. Free rate limiting for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
