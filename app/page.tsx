"use client"
import HeroSection from "@/components/home/hero-sec/hero-section"
import AboutSection from "@/components/home/about-sec/about-section"
import ServicesSection from "@/components/home/services-sec/services-section"
import GallerySection from "@/components/home/gallery-sec/gallery-section"
import TestimonialsSection from "@/components/home/testinomial-sec/testimonials-section"
import CTASection from "@/components/home/cta-sec/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
