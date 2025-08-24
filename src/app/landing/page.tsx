"use client";

import CTA from "@/components/features/landing/CTA";
import FAQ from "@/components/features/landing/FAQ";
import Features from "@/components/features/landing/Features";
import Footer from "@/components/features/landing/Footer";
import Hero from "@/components/features/landing/Hero";
import HowItWorks from "@/components/features/landing/HowItWorks";
import Navbar from "@/components/features/landing/Navbar";
import Testimonials from "@/components/features/landing/Testimonials";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
