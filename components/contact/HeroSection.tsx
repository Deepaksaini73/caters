"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Sparkles Icon */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        animate={{ y: [0, 16, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-10 h-10 text-primary/60 drop-shadow-lg" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-primary drop-shadow-lg"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto"
        >
          Have questions or ready to start planning your event? Get in touch with our expert team and let us help you create an unforgettable experience.
        </motion.p>
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto"
        >
          Whether you’re looking for a quote, want to discuss your ideas, or need guidance on event planning, we’re here to assist you every step of the way. Reach out today and let’s make your vision a reality.
        </motion.p> */}
      </div>
    </section>
  )
}