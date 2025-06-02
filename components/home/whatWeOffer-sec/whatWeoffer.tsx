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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">What We Offer</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Transform your venue with our exquisite decoration services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transform transition-transform">
                {offering.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
              <p className="text-muted-foreground">{offering.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-6">
            ✨ Let us turn your special moments into unforgettable memories with our stunning welcome decorations!
          </p>
          <Button asChild size="lg">
            <Link href="/quote">
              📞 Book Now and make your entry truly GRAND!
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}