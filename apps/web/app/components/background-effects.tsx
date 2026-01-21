'use client';

export function BackgroundEffects() {
  return (
    <>
      {/* Simple static background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none -z-10'>
        {/* Static gradient orbs */}
        <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-linear-to-br from-white/10 via-white/3 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-linear-to-tl from-white/8 via-white/3 to-transparent rounded-full blur-3xl' />
      </div>

      {/* Simple grid pattern */}
      <div className='fixed inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none -z-10' />

      {/* Radial gradient overlay */}
      <div className='fixed inset-0 bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none -z-10' />
    </>
  );
}
