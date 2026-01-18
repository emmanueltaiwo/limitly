"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { CodeBlock } from "@repo/ui/code-block";
import { ChevronRight, ChevronDown, Search, Copy, Check, ExternalLink, BookOpen, Zap, Lock, Code2, FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const sections = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    subsections: ["introduction", "installation", "quick-start"],
  },
  {
    id: "guides",
    label: "Guides",
    icon: BookOpen,
    subsections: ["typescript", "express", "nextjs", "error-handling"],
  },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Code2,
    subsections: ["ratelimit", "createclient", "checkratelimit", "types"],
  },
  {
    id: "examples",
    label: "Examples",
    icon: FileText,
    subsections: ["basic", "advanced", "custom-strategies"],
  },
];

const Loading = () => null;

export default function DocsPage() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
  const [activeSection, setActiveSection] = useState("getting-started");
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const scrollTop = mainContentRef.current.scrollTop;
        const scrollHeight = mainContentRef.current.scrollHeight - mainContentRef.current.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const element = mainContentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredSections = sections.filter(
    (section) =>
      section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.subsections.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-black text-white overflow-hidden dark">
        {/* Scroll progress bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-white via-white to-white/50 z-50 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 border-b border-white/10 backdrop-blur-xl bg-black/50 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                ⚡ Limitly
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/docs" className="text-sm text-white font-medium">
                  Documentation
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex mt-16">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 border-r border-white/10 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 bg-black/30 backdrop-blur-sm">
            <div className="p-6">
              {/* Search */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedSections.includes(section.id);
                  const isActive = activeSection === section.id;

                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          toggleSection(section.id);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 text-left text-sm">{section.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="ml-2 mt-2 pl-2 border-l border-white/10 space-y-1">
                          {section.subsections.map((subsection) => (
                            <Link
                              key={subsection}
                              href={`#${subsection}`}
                              className="block px-3 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-all duration-200"
                              onClick={() => setActiveSection(subsection)}
                            >
                              {subsection.charAt(0).toUpperCase() + subsection.slice(1).replace("-", " ")}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Resources */}
              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="text-xs font-semibold text-white/50 uppercase mb-4">Resources</p>
                <ul className="space-y-3">
                  {[
                    { label: "API Reference", href: "#api-reference" },
                    { label: "Examples", href: "#examples" },
                    { label: "Support", href: "https://github.com/issues" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        {item.label}
                        {item.href.startsWith("http") && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div ref={mainContentRef} className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="space-y-24">
                {/* Getting Started */}
                <section>
                  <div className="space-y-16">
                    <div id="introduction">
                      <h1 className="text-6xl font-black mb-4 tracking-tight animate-fade-in-up">
                        Documentation
                      </h1>
                      <p className="text-xl text-white/70 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Everything you need to know about Limitly. From getting started to advanced configurations.
                      </p>
                    </div>

                    <div id="installation" className="pt-8 border-t border-white/10">
                      <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Installation</h2>
                      <p className="text-white/70 mb-8 leading-relaxed">
                        Get started with Limitly in seconds. Install via npm and you're ready to protect your APIs.
                      </p>
                      <div className="relative">
                        <CodeBlock language="bash">{`npm install @limitly/sdk`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard("npm install @limitly/sdk", "install")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "install" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                      <p className="text-white/60 mt-4 text-sm">
                        Works with Node.js 14+ and all modern package managers.
                      </p>
                    </div>

                    <div id="quick-start" className="pt-8 border-t border-white/10">
                      <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Quick Start</h2>
                      <p className="text-white/70 mb-8 leading-relaxed">
                        Get your first rate limiter up and running in just a few lines of code.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { rateLimit } from '@limitly/sdk';

// Create a rate limiter function
const checkLimit = rateLimit();

// Use in your API handler
export default async function handler(req, res) {
  const result = await checkLimit(req.user?.id || req.ip);

  if (!result.allowed) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // Your route logic here
  res.status(200).json({ success: true });
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import { rateLimit } from '@limitly/sdk';

const checkLimit = rateLimit();

export default async function handler(req, res) {
  const result = await checkLimit(req.user?.id || req.ip);
  if (!result.allowed) return res.status(429).json({ error: 'Too many requests' });
  res.status(200).json({ success: true });
}`, "quickstart")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "quickstart" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Guides */}
                <section className="pt-8 border-t border-white/10">
                  <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Guides</h2>
                  <div className="space-y-16">
                    <div id="typescript">
                      <h3 className="text-2xl font-bold mb-4">TypeScript Support</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Limitly is fully typed with TypeScript. Get complete type safety and IDE autocomplete.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import type { 
  LimitlyConfig, 
  LimitlyResponse, 
  RateLimitOptions 
} from '@limitly/sdk';
import { createClient } from '@limitly/sdk';

// Fully typed configuration
const config: LimitlyConfig = {
  serviceId: 'my-app',
  timeout: 5000
};

const client = createClient(config);

// Type-safe responses
const result: LimitlyResponse = await client.checkRateLimit({
  identifier: 'user-123',
  capacity: 100,
  refillRate: 10
});

if (result.allowed) {
  console.log(\`Remaining: \${result.remaining}\`);
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import type { LimitlyConfig, LimitlyResponse } from '@limitly/sdk';
import { createClient } from '@limitly/sdk';

const config: LimitlyConfig = { serviceId: 'my-app', timeout: 5000 };
const client = createClient(config);
const result: LimitlyResponse = await client.checkRateLimit({
  identifier: 'user-123', capacity: 100, refillRate: 10
});`, "typescript")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "typescript" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="express">
                      <h3 className="text-2xl font-bold mb-4">Express.js Middleware</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Protect your Express routes with a simple middleware.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import express from 'express';
import { rateLimit } from '@limitly/sdk';

const app = express();
const checkLimit = rateLimit({ serviceId: 'my-api' });

// Middleware approach
app.use(async (req, res, next) => {
  const result = await checkLimit({
    identifier: req.user?.id || req.ip,
    capacity: 100,
    refillRate: 10
  });

  if (!result.allowed) {
    const retryAfter = result.reset 
      ? Math.ceil((result.reset - Date.now()) / 1000) 
      : 60;
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter
    });
  }

  next();
});

app.get('/api/data', (req, res) => {
  res.json({ data: 'Your API response' });
});`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import express from 'express';
import { rateLimit } from '@limitly/sdk';

const app = express();
const checkLimit = rateLimit({ serviceId: 'my-api' });

app.use(async (req, res, next) => {
  const result = await checkLimit({ 
    identifier: req.user?.id || req.ip,
    capacity: 100,
    refillRate: 10
  });
  if (!result.allowed) return res.status(429).json({ error: 'Rate limit exceeded' });
  next();
});`, "express")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "express" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="nextjs">
                      <h3 className="text-2xl font-bold mb-4">Next.js API Routes</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Integrate rate limiting into your Next.js API routes.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { rateLimit } from '@limitly/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkLimit = rateLimit();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user identifier
  const userId = (req.headers['x-user-id'] || req.socket.remoteAddress) as string;

  // Check rate limit
  const result = await checkLimit(userId);

  if (!result.allowed) {
    const retryAfter = result.reset 
      ? Math.ceil((result.reset - Date.now()) / 1000) 
      : 60;
    res.setHeader('Retry-After', retryAfter.toString());
    return res.status(429).json({
      error: 'Too many requests'
    });
  }

  // Set rate limit headers (optional - SDK handles this)
  if (result.limit) res.setHeader('X-RateLimit-Limit', result.limit.toString());
  if (result.remaining !== undefined) res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
  if (result.reset) res.setHeader('X-RateLimit-Reset', Math.ceil(result.reset / 1000).toString());

  // Your API logic
  res.status(200).json({ success: true });
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import { rateLimit } from '@limitly/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkLimit = rateLimit();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['x-user-id'] as string;
  const result = await checkLimit(userId);
  if (!result.allowed) return res.status(429).json({ error: 'Too many requests' });
  res.status(200).json({ success: true });
}`, "nextjs")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "nextjs" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="error-handling">
                      <h3 className="text-2xl font-bold mb-4">Error Handling</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Gracefully handle rate limit errors in your application.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { rateLimit } from '@limitly/sdk';

const checkLimit = rateLimit();

async function apiCall(req, res) {
  try {
    const result = await checkLimit(req.user?.id || req.ip);

    if (!result.allowed) {
      const retryAfter = result.reset 
        ? Math.ceil((result.reset - Date.now()) / 1000) 
        : 60;
      
      res.setHeader('Retry-After', retryAfter.toString());
      return res.status(429).json({
        message: result.message || 'Rate limit exceeded',
        retryAfter,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset
      });
    }

    // Process request
    return res.json({ success: true });
  } catch (error) {
    // Handle network errors
    if (error instanceof Error) {
      console.error('Rate limit check failed:', error.message);
    }
    // On error, allow request (graceful degradation)
    return res.json({ success: true });
  }
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import { rateLimit } from '@limitly/sdk';

const checkLimit = rateLimit();

async function apiCall(req, res) {
  try {
    const result = await checkLimit(req.user?.id || req.ip);
    if (!result.allowed) {
      const retryAfter = result.reset ? Math.ceil((result.reset - Date.now()) / 1000) : 60;
      res.setHeader('Retry-After', retryAfter.toString());
      return res.status(429).json({ message: 'Rate limit exceeded', retryAfter });
    }
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: true });
  }
}`, "errorhandling")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "errorhandling" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* API Reference */}
                <section className="pt-8 border-t border-white/10">
                  <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">API Reference</h2>
                  <div className="space-y-16">
                    <div id="ratelimit">
                      <h3 className="text-2xl font-bold mb-4">rateLimit(config?)</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Quick helper function that returns a configured rate limiter. Perfect for simple use cases.
                      </p>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                        <h4 className="text-sm font-mono text-white/80 mb-4">Function Signature</h4>
                        <CodeBlock language="typescript">{`function rateLimit(config?: LimitlyConfig | string): (options?: RateLimitOptions | string) => Promise<LimitlyResponse>`}</CodeBlock>
                      </div>
                    </div>

                    <div id="createclient">
                      <h3 className="text-2xl font-bold mb-4">createClient(config?)</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Creates a new Limitly client instance for more advanced configurations.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`interface LimitlyConfig {
  serviceId?: string;      // Service identifier for isolation
  timeout?: number;        // Request timeout in milliseconds (default: 5000)
}

const client = createClient({
  serviceId: 'my-app',
  timeout: 5000
});`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`interface LimitlyConfig {
  serviceId?: string;
  timeout?: number;
}

const client = createClient({
  serviceId: 'my-app',
  timeout: 5000
});`, "createclient")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "createclient" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="checkratelimit">
                      <h3 className="text-2xl font-bold mb-4">client.checkRateLimit(options?)</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        Checks if a request is allowed based on configured rate limits.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`interface RateLimitOptions {
  identifier?: string;     // User ID, IP, or other identifier
  capacity?: number;       // Override default capacity
  refillRate?: number;     // Tokens per second
  skip?: boolean;          // Skip rate limiting
}

interface LimitlyResponse {
  allowed: boolean;        // Is request allowed?
  limit?: number;          // Total request limit
  remaining?: number;      // Requests remaining
  reset?: number;          // Unix timestamp (ms) when limit resets
  message?: string;        // Error message if not allowed
}

const result = await client.checkRateLimit({
  identifier: 'user-123',
  capacity: 100,
  refillRate: 10
});

console.log(result.allowed);    // true or false
console.log(result.remaining);  // e.g., 95
console.log(result.reset);      // e.g., 1705000000000`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`interface RateLimitOptions {
  identifier?: string;
  serviceId?: string;
  capacity?: number;
  refillRate?: number;
  skip?: boolean;
}

interface LimitlyResponse {
  allowed: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
  message?: string;
}`, "checkratelimit")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "checkratelimit" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="types">
                      <h3 className="text-2xl font-bold mb-4">Type Exports</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        All types are exported for use in your own code.
                      </p>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import type {
  LimitlyConfig,
  LimitlyResponse,
  RateLimitOptions,
  RateLimitInfo,
  HealthResponse
} from '@limitly/sdk';

// Use in your function signatures
function handleRateLimit(result: LimitlyResponse): void {
  if (!result.allowed) {
    const retryAfter = result.reset 
      ? Math.ceil((result.reset - Date.now()) / 1000) 
      : 60;
    console.log(\`Rate limited. Retry after \${retryAfter}s\`);
  }
}

// Create typed wrappers
async function protectedRoute(
  userId: string,
  options?: RateLimitOptions
): Promise<LimitlyResponse> {
  return client.checkRateLimit({
    identifier: userId,
    ...options
  });
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import type {
  LimitlyConfig,
  LimitlyResponse,
  RateLimitOptions,
  RateLimitInfo,
  HealthResponse
} from '@limitly/sdk';`, "types")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "types" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Examples */}
                <section className="pt-8 border-t border-white/10">
                  <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Examples</h2>
                  <div className="space-y-16">
                    <div id="basic">
                      <h3 className="text-2xl font-bold mb-4">Basic Usage</h3>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { rateLimit } from '@limitly/sdk';

const checkLimit = rateLimit();

// In your handler
const result = await checkLimit('user-123');

if (result.allowed) {
  // Process request
  console.log(\`Remaining: \${result.remaining}\`);
} else {
  // Handle rate limit
  console.log('Rate limited!');
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`import { rateLimit } from '@limitly/sdk';

const checkLimit = rateLimit();
const result = await checkLimit('user-123');

if (result.allowed) {
  console.log(\`Remaining: \${result.remaining}\`);
} else {
  console.log('Rate limited!');
}`, "basic")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "basic" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="advanced">
                      <h3 className="text-2xl font-bold mb-4">Advanced Configuration</h3>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { createClient } from '@limitly/sdk';

const client = createClient({
  serviceId: 'api-v2',
  timeout: 3000
});

// Tiered rate limiting
async function checkTieredLimit(req) {
  const isPremium = req.user?.plan === 'premium';
  
  const result = await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    capacity: isPremium ? 1000 : 100,      // Premium has higher limit
    refillRate: isPremium ? 100 : 10,      // Premium refills faster
    skip: req.user?.isAdmin                // Admins bypass limits
  });

  return result;
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`const client = createClient({ serviceId: 'api-v2' });

async function checkTieredLimit(req) {
  const isPremium = req.user?.plan === 'premium';
  return await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    capacity: isPremium ? 1000 : 100,
    refillRate: isPremium ? 5 : 10
  });
}`, "advanced")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "advanced" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div id="custom-strategies">
                      <h3 className="text-2xl font-bold mb-4">Custom Rate Limit Strategies</h3>
                      <div className="relative">
                        <CodeBlock language="typescript">{`import { createClient } from '@limitly/sdk';

const client = createClient();

// Strategy 1: Per-endpoint limits
async function protectEndpoint(endpoint, req) {
  const limits: Record<string, { capacity: number; refillRate: number }> = {
    '/api/login': { capacity: 5, refillRate: 0.1 },      // 5 attempts, refill 1 per 10 seconds
    '/api/data': { capacity: 100, refillRate: 10 },      // 100 requests, refill 10 per second
    '/api/export': { capacity: 10, refillRate: 0.5 }     // 10 requests, refill 0.5 per second
  };

  const limit = limits[endpoint] || { capacity: 100, refillRate: 10 };
  
  return await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    ...limit
  });
}

// Strategy 2: Adaptive limits based on load
async function adaptiveLimit(req) {
  const systemLoad = await getSystemLoad();  // Your monitoring
  
  return await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    capacity: systemLoad > 80 ? 50 : 100,
    refillRate: systemLoad > 80 ? 5 : 10
  });
}

// Strategy 3: User tier-based limits
async function tierBasedLimit(req) {
  const isPremium = req.user?.plan === 'premium';
  
  return await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    capacity: isPremium ? 1000 : 100,
    refillRate: isPremium ? 100 : 10,
    skip: req.user?.isAdmin || false
  });
}`}</CodeBlock>
                        <button
                          onClick={() => copyToClipboard(`const limits = {
  '/api/login': { capacity: 5, refillRate: 0.1 },
  '/api/data': { capacity: 100, refillRate: 10 },
  '/api/export': { capacity: 10, refillRate: 0.5 }
};

async function protectEndpoint(endpoint, req) {
  const limit = limits[endpoint] || { capacity: 100, refillRate: 10 };
  return await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    ...limit
  });
}`, "custom")}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {copied === "custom" ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer CTA */}
                <section className="pt-12 border-t border-white/10 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                  <p className="text-white/70 mb-8">
                    Start protecting your APIs today with Limitly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/docs#quick-start"
                      className="px-6 py-3 bg-white text-black hover:bg-gray-100 font-bold rounded-lg transition-all duration-200"
                    >
                      View Quick Start
                    </Link>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-white/30 text-white hover:border-white/60 hover:bg-white/5 font-semibold rounded-lg transition-all duration-200"
                    >
                      View on GitHub
                    </a>
                  </div>
                </section>
              </div>

              {/* Bottom spacing */}
              <div className="h-12" />
            </div>
          </div>

          {/* Right Sidebar - Table of Contents */}
          <aside className="hidden xl:block w-64 border-l border-white/10 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 bg-black/30 backdrop-blur-sm p-6">
            <p className="text-xs font-semibold text-white/50 uppercase mb-6">On this page</p>
            <nav className="space-y-3 text-sm">
              {[
                { label: "Introduction", id: "introduction" },
                { label: "Installation", id: "installation" },
                { label: "Quick Start", id: "quick-start" },
                { label: "TypeScript", id: "typescript" },
                { label: "Express.js", id: "express" },
                { label: "Next.js", id: "nextjs" },
                { label: "Error Handling", id: "error-handling" },
                { label: "rateLimit()", id: "ratelimit" },
                { label: "createClient()", id: "createclient" },
                { label: "checkRateLimit()", id: "checkratelimit" },
                { label: "Types", id: "types" },
                { label: "Basic Usage", id: "basic" },
                { label: "Advanced", id: "advanced" },
                { label: "Custom Strategies", id: "custom-strategies" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-3 py-1.5 text-white/60 hover:text-white transition-colors rounded hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </main>
      </div>
    </Suspense>
  );
}
