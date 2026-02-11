'use client';

export function DebuggerBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0a0a0a]"
      aria-hidden
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Vertical gutter line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.15), transparent)',
        }}
      />
      {/* Soft orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/3 rounded-full blur-[80px]" />
    </div>
  );
}
