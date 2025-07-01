"use client"
import FeedbackForm from '@/components/feedback/FeedbackForm'
import { motion } from "framer-motion"

export default function FeedbackPage() {
  return (
    <div className="relative min-h-screen py-12 md:py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
            Got a Minute?
          </h1>
          <p className="text-lg text-muted-foreground">
            We’d love to hear from you! Tell us what you like or what could be better.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeedbackForm />
        </motion.div>
      </div>
    </div>
  )
}