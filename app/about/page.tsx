import CTASection from "@/components/home/cta-sec/cta-section"
import HeroSection from "@/components/about/hero-section"
import OurStory from "@/components/about/our-story"
import OurValues from "@/components/about/our-values"
import OurTeam from "@/components/about/our-team"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <OurStory />
      <OurValues />
      <OurTeam />
      <CTASection />
    </div>
  )
}
