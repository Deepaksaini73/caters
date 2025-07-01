"use client"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Flower2, 
  CircuitBoard, 
  Waves, 
  Palette, 
  Lightbulb,
  PartyPopper
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const offerings = [
  {
    icon: <Flower2 className="w-8 h-8" />,
    title: "Customized Balloon & Flower Arches",
    description: "Beautiful archways designed with fresh flowers and balloons to create a stunning entrance"
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    title: "Name Boards & Neon Signs",
    description: "Personalized LED name boards and trendy neon signs to add a modern touch"
  },
  {
    icon: <Waves className="w-8 h-8" />,
    title: "Floral Carpet & Entry Pathways",
    description: "Elegant floral carpets and decorated pathways for a royal welcome"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Traditional Aarti & Cultural Elements",
    description: "Traditional decorative elements to maintain cultural authenticity"
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: "Themed Gate Designs",
    description: "Custom-designed entrance gates matching your event theme"
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "LED & Fairy Light Effects",
    description: "Magical lighting effects to enhance the ambiance"
  }
]

export default function WhatWeOffer() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-2 sm:px-4">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-7 h-7 text-primary animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold">What We Offer</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Transform your venue with our exquisite decoration services
          </motion.p>
        </motion.div>

        {/* Offerings Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
        >
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group flex flex-col items-center justify-between min-h-[240px] h-full p-6 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-primary/10 shadow-lg hover:shadow-2xl hover:bg-primary/10 transition-all duration-200"
            >
              <motion.div
                whileHover={{
                  y: [-2, 6, -2],
                  scale: 1.15,
                  transition: { duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
                }}
                className="mb-4 text-primary group-hover:scale-110 transform transition-transform"
              >
                {offering.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-center">{offering.title}</h3>
              <p className="text-muted-foreground text-center">{offering.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-6">
            ✨ Let us turn your special moments into unforgettable memories with our stunning welcome decorations!
          </p>
          <Button
            asChild
            size="lg"
            className="transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
          >
            <Link href="/quote">
              📞 Book Now and make your entry truly GRAND!
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}