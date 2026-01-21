'use client';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { BackgroundEffects } from './components/background-effects';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { InstallationSection } from './components/installation-section';
import { ComparisonSection } from './components/comparison-section';
import { FAQSection } from './components/faq-section';
import { CTASection } from './components/cta-section';

export default function Home() {
  return (
    <div className='min-h-screen bg-black text-white relative'>
      <BackgroundEffects />
      <Navbar />

      <main className='relative overflow-x-hidden'>
        <HeroSection />
        <FeaturesSection />
        <InstallationSection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
