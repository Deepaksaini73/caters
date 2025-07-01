"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AboutCard from "./about-card"
import { aboutCards } from "@/config/home/aboutsection-cards"

export default function AboutSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary drop-shadow-lg">
            Welcome to Mahakal Events
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            We transform ordinary spaces into extraordinary experiences. With our expert team of decorators,
            photographers, and event planners, we create magical moments that last a lifetime.
          </motion.p>
        </motion.div>

        {/* Cards Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <AboutCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={card.delay}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button Animation */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
          >
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}