'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface EditorBlockProps {
  code: string;
  language?: 'typescript' | 'bash';
  currentLine?: number;
  title?: string;
  lineNumbers?: boolean;
  className?: string;
}

function highlightLine(
  line: string,
  language: 'typescript' | 'bash'
): ReactNode {
  if (!line) return ' ';

  // Simple bash highlighting
  if (language === 'bash') {
    const tokens = line.split(/(\s+)/);
    return tokens.map((token, i) => {
      if (/^\s+$/.test(token)) return token;
      if (/^#/.test(token)) {
        return (
          <span key={i} className='text-white/40'>
            {token}
          </span>
        );
      }
      if (['npm', 'pnpm', 'yarn', 'npx'].includes(token)) {
        return (
          <span key={i} className='text-emerald-400'>
            {token}
          </span>
        );
      }
      if (/^(-{1,2}[a-zA-Z-]+)/.test(token)) {
        return (
          <span key={i} className='text-sky-300'>
            {token}
          </span>
        );
      }
      return (
        <span key={i} className='text-emerald-200'>
          {token}
        </span>
      );
    });
  }

  // Very lightweight TypeScript highlighting
  const commentIndex = line.indexOf('//');
  let codePart = line;
  let commentPart: string | null = null;

  if (commentIndex !== -1) {
    codePart = line.slice(0, commentIndex);
    commentPart = line.slice(commentIndex);
  }

  const segments = codePart.split(/(\s+|"[^"]*"|'[^']*'|`[^`]*`)/);

  const keywordSet = new Set([
    'export',
    'async',
    'function',
    'return',
    'if',
    'else',
    'const',
    'let',
    'var',
    'import',
    'from',
    'await',
    'new',
  ]);

  const typeSet = new Set([
    'string',
    'number',
    'boolean',
    'Date',
    'Request',
    'Response',
  ]);

  const highlighted: ReactNode[] = segments.map((segment, i) => {
    if (!segment) return null;
    if (/^\s+$/.test(segment)) return segment;

    // Strings
    if (
      (segment.startsWith('"') && segment.endsWith('"')) ||
      (segment.startsWith("'") && segment.endsWith("'")) ||
      (segment.startsWith('`') && segment.endsWith('`'))
    ) {
      return (
        <span key={i} className='text-emerald-300'>
          {segment}
        </span>
      );
    }

    // Keywords
    if (keywordSet.has(segment)) {
      return (
        <span key={i} className='text-sky-400'>
          {segment}
        </span>
      );
    }

    // Booleans / null
    if (['true', 'false', 'null', 'undefined'].includes(segment)) {
      return (
        <span key={i} className='text-amber-200'>
          {segment}
        </span>
      );
    }

    // Numbers
    if (/^[0-9]+$/.test(segment)) {
      return (
        <span key={i} className='text-amber-300'>
          {segment}
        </span>
      );
    }

    // Types (very loose)
    if (typeSet.has(segment) || /^[A-Z][a-zA-Z0-9_]*$/.test(segment)) {
      return (
        <span key={i} className='text-purple-300'>
          {segment}
        </span>
      );
    }

    return (
      <span key={i} className='text-white/90'>
        {segment}
      </span>
    );
  });

  if (commentPart) {
    highlighted.push(
      <span key='comment' className='text-white/40'>
        {commentPart}
      </span>
    );
  }

  return highlighted;
}

export function EditorBlock({
  code,
  language = 'typescript',
  currentLine,
  title,
  lineNumbers = true,
  className = '',
}: EditorBlockProps) {
  const lines = code.split('\n');

  return (
    <div
      className={`rounded-lg border border-white/10 bg-[#111] overflow-hidden font-mono text-[11px] sm:text-xs md:text-sm ${className}`}
      data-language={language}
    >
      {title && (
        <div className='flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#0d0d0d]'>
          <span className='w-2.5 h-2.5 rounded-full bg-white/20' />
          <span className='text-xs text-white/50'>{title}</span>
        </div>
      )}
      <div className='max-h-[min(20rem,65vh)] overflow-y-auto overflow-x-hidden'>
        <div className='flex min-h-[120px]'>
          {lineNumbers && (
            <div className='select-none shrink-0 py-3 pr-3 pl-3 text-right text-white/25 bg-[#0d0d0d]/80 border-r border-white/5 font-mono text-[10px] leading-6'>
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <pre className='flex-1 overflow-x-auto py-3 pl-4 pr-4 text-white/90 leading-6 min-w-0'>
            {lines.map((line, i) => {
              const isCurrent =
                currentLine !== undefined && i + 1 === currentLine;
              return (
                <motion.div
                  key={i}
                  initial={
                    isCurrent
                      ? { backgroundColor: 'rgba(245,158,11,0.12)' }
                      : {}
                  }
                  animate={
                    isCurrent
                      ? { backgroundColor: 'rgba(245,158,11,0.06)' }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className={
                    isCurrent ? 'pl-3 -ml-3 border-l-2 border-amber-500' : ''
                  }
                >
                  <code>{highlightLine(line, language)}</code>
                </motion.div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
}
