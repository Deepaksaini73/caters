"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PartyPopper } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-primary text-primary-foreground">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/30 to-accent/20 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating PartyPopper Icon */}
      <motion.div
        className="absolute top-8 right-8 z-10"
        animate={{ y: [0, 16, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <PartyPopper className="w-12 h-12 text-primary-foreground/60 drop-shadow-lg" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ scale: 0.9, y: 20 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Plan Your Next Event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Let us help you create an unforgettable experience. Get in touch today for a free consultation.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-primary-foreground hover:text-primary border-primary-foreground text-primary-foreground transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
              >
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}