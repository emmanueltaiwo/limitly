"use client";

import { useEffect, useState } from "react";
import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode | string;
  language?: string;
}

// Fallback component if shiki fails to load
function FallbackCodeBlock({ children, language }: CodeBlockProps) {
  const codeContent = typeof children === 'string' ? children : String(children);
  
  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] backdrop-blur-sm">
      {language && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400 font-mono">
          {language}
        </div>
      )}
      <pre className="px-4 py-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre">
          {codeContent}
        </code>
      </pre>
    </div>
  );
}

export function CodeBlock({ children, language = "typescript" }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const codeContent = typeof children === 'string' ? children : String(children).trim();

  useEffect(() => {
    let mounted = true;

    async function highlightCode() {
      try {
        // Dynamic import of shiki
        const { codeToHtml } = await import('shiki');
        
        if (!mounted) return;

        const html = await codeToHtml(codeContent, {
          lang: language,
          theme: 'github-dark',
        });

        if (mounted) {
          setHighlightedCode(html);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load shiki:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [codeContent, language]);

  if (isLoading) {
    return <FallbackCodeBlock language={language}>{codeContent}</FallbackCodeBlock>;
  }

  if (!highlightedCode) {
    return <FallbackCodeBlock language={language}>{codeContent}</FallbackCodeBlock>;
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] backdrop-blur-sm">
      {language && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400 font-mono flex items-center justify-between">
          <span className="uppercase">{language}</span>
        </div>
      )}
      <div 
        className="overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-4 [&_pre]:!m-0 [&_pre]:!overflow-x-auto [&_code]:!font-mono [&_code]:!text-sm [&_code]:!leading-relaxed [&_code]:!block [&_code]:!w-full"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
