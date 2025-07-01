"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function OurStory() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl font-bold mb-6 text-primary"
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-6"
            >
              Mahakal Events was founded in 2020 with a simple mission: to transform ordinary events into
              extraordinary experiences. What started as a small family business specializing in wedding decorations
              has grown into a full-service event planning and decoration company.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-6"
            >
              Over the years, we've expanded our services to include professional photography, videography, and
              comprehensive event management. Our team has grown from just 3 dedicated individuals to over 25 creative
              professionals who are passionate about bringing your vision to life.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-muted-foreground"
            >
              Today, we're proud to be one of the leading event planning companies in the region, known for our
              innovative designs, attention to detail, and exceptional customer service.
            </motion.p>
          </motion.div>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative h-[320px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src="https://res.cloudinary.com/dhi5df340/image/upload/v1748163163/WhatsApp_Image_2025-05-25_at_13.44.03_2791ce40_v2wmgs.jpg"
                alt="Mahakal Events Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}