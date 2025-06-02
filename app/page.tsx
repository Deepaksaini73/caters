"use client"
import HeroSection from "@/components/home/hero-sec/hero-section"
import AboutSection from "@/components/home/about-sec/about-section"
import ServicesSection from "@/components/home/services-sec/services-section"
import GallerySection from "@/components/home/gallery-sec/gallery-section"
import TestimonialsSection from "@/components/home/testinomial-sec/testimonials-section"
import CTASection from "@/components/home/cta-sec/cta-section"
import WhatWeOffer from "@/components/home/whatWeOffer-sec/whatWeoffer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="hero-gradient">
        <HeroSection />
      </div>
      
      <div className="gradient-secondary">
        <AboutSection />
      </div>

      <div className="gradient-secondary">
        <WhatWeOffer />
      </div>

      <div className="gradient-overlay">
        <ServicesSection />
      </div>
      
      <div className="bg-accent/5">
        <GallerySection />
      </div>
      
      <div className="gradient-secondary">
        <TestimonialsSection />
      </div>
      
      <div className="gradient-secondary">
        <CTASection />
      </div>
    </div>
  )
}