"use client"
import HeroSection from "@/components/home/hero-sec/hero-section"
import AboutSection from "@/components/home/about-sec/about-section"
import ServicesSection from "@/components/home/services-sec/services-section"
import GallerySection from "@/components/home/gallery-sec/gallery-section"
import TestimonialsSection from "@/components/home/testinomial-sec/testimonials-section"
import CTASection from "@/components/home/cta-sec/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="hero-gradient">
        <HeroSection />
      </div>
      <div className="gradient-secondary section-spacing">
        <AboutSection />
      </div>
      <div className="gradient-overlay section-spacing">
        <ServicesSection />
      </div>
      <div className="bg-accent/5 section-spacing">
        <GallerySection />
      </div>
      <div className="gradient-secondary section-spacing">
        <TestimonialsSection />
      </div>
      <div className="gradient-secondary section-spacing">
        <CTASection />
      </div>
    </div>
  )
}
