"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { heroSlides } from "@/config/home/heropage"

const gradientOverlay =
  "bg-gradient-to-br from-primary/60 via-black/40 to-secondary/40"

const floatingShapes = [
  { top: "10%", left: "5%", size: 60, color: "bg-primary/30" },
  { top: "70%", left: "80%", size: 40, color: "bg-secondary/40" },
  { top: "50%", left: "60%", size: 32, color: "bg-accent/30" },
  { top: "20%", left: "75%", size: 48, color: "bg-primary/20" },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden flex items-center">
      {/* Animated Gradient Overlay */}
      <div className={`absolute inset-0 z-10 pointer-events-none ${gradientOverlay}`} />

      {/* Floating Shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute z-20 rounded-full blur-2xl ${shape.color}`}
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Slides with Parallax & Fade/Zoom Animation */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          {heroSlides.map((slide, index) =>
            index === currentSlide ? (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover object-center"
                  style={{ zIndex: 1 }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-30 w-full flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center text-white pt-16">
          {/* Headline Reveal Animation */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -40, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-xl"
          >
            {heroSlides[currentSlide].title}
          </motion.h1>

          {/* Subtitle Animation */}
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 drop-shadow-lg"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>

          {/* CTA Buttons Animation */}
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-colors duration-200"
            >
              <Link href={heroSlides[currentSlide].link}>
                {heroSlides[currentSlide].cta}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary bg-white/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-lg transition-all duration-200"
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators with Animation */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300
              ${index === currentSlide ? "bg-white shadow-xl scale-110" : "bg-white/40"}
            `}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}
