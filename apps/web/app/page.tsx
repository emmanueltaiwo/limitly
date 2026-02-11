'use client';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { DebuggerBackground } from './components/debugger-background';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { InstallationSection } from './components/installation-section';
import { ComparisonSection } from './components/comparison-section';
import { FAQSection } from './components/faq-section';
import { CTASection } from './components/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
      <DebuggerBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="relative overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <InstallationSection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
