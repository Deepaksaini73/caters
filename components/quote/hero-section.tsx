"use client"
import { motion } from "framer-motion"

export default function QuoteHeroSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-primary drop-shadow-lg"
        >
          Request a Personalized Quote
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-2 max-w-2xl mx-auto"
        >
          Share your event details and our team will craft a tailored proposal just for you.
        </motion.p>
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto"
        >
          Whether it’s a wedding, corporate gathering, or special celebration, Mahakal Events is committed to making your occasion seamless and memorable. Let’s start planning your perfect event together.
        </motion.p> */}
      </div>
    </section>
  )
}