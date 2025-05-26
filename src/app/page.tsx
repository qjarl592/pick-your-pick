"use client";

import CTA from "@/components/landing/CTA";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
// import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
