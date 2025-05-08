"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Create Unforgettable Events",
      subtitle: "Professional Event Planning & Decoration Services",
      image: "/placeholder.svg?height=1080&width=1920&text=Wedding+Decoration",
      cta: "Get Started",
      link: "/contact",
    },
    {
      title: "Capture Every Moment",
      subtitle: "Professional Photography & Videography",
      image: "/placeholder.svg?height=1080&width=1920&text=Event+Photography",
      cta: "View Gallery",
      link: "/gallery",
    },
    {
      title: "Celebrate in Style",
      subtitle: "Customized Decoration for Every Occasion",
      image: "/placeholder.svg?height=1080&width=1920&text=Birthday+Decoration",
      cta: "Our Services",
      link: "/services",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center text-white pt-16">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="mr-4">
              <Link href={slides[currentSlide].link}>{slides[currentSlide].cta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
