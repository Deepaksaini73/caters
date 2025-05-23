"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AboutCard from "./about-card"
import { aboutCards } from "@/config/home/aboutsection-cards"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Mahakal Events</h2>
          <p className="text-lg text-muted-foreground">
            We transform ordinary spaces into extraordinary experiences. With our expert team of decorators,
            photographers, and event planners, we create magical moments that last a lifetime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutCards.map((card, index) => (
            <AboutCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={card.delay}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}