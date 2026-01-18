import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode | string;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const codeContent = typeof children === 'string' ? children : String(children);
  
  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
      {language && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400 font-mono">
          {language}
        </div>
      )}
      <pre className="px-4 py-2 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre">
          {codeContent}
        </code>
      </pre>
    </div>
  );
}
