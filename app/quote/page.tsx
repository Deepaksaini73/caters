"use client"
import QuoteHeroSection from "@/components/quote/hero-section"
import QuoteForm from "@/components/quote/quote-form"

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <QuoteHeroSection />
      <QuoteForm />
    </div>
  )
}
