"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/home/services-sec/service-card"
import type { LucideIcon } from "lucide-react"
import { createClient } from "@/lib/supabaseClient"
import {
  Palette,
  Camera,
  Calendar,
  Music,
  Utensils,
  Gift,
  PartyPopper,
  MapPin,
  Lightbulb,
  TentTree,
  Home,
  Users,
  Baby,
  Landmark,
  Hotel,
  Sparkles,
  HelpCircle,
} from "lucide-react"

export const iconMap: Record<string, LucideIcon> = {
  Palette,
  Camera,
  Calendar,
  Music,
  Utensils,
  Gift,
  PartyPopper,
  MapPin,
  Lightbulb,
  TentTree,
  Home,
  Users,
  Baby,
  Landmark,
  Hotel,
  Sparkles,
}

const DefaultIcon = () => <HelpCircle className="w-6 h-6 text-muted-foreground" />

interface Service {
  id: string
  slug: string
  title: string
  long_description: string
  icon: string
  image_src: string
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data } = await supabase
          .from('services')
          .select('*')
          .order('created_at')
          .limit(3)

        setServices(data || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

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
          <motion.h2
            initial={{ scale: 0.8, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="text-3xl md:text-4xl font-bold mb-3 inline-block"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            From elegant weddings to vibrant birthday celebrations, we offer comprehensive services to make your event unforgettable.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
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
          {loading
            ? [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="rounded-2xl border bg-card p-8 min-h-[260px] h-full animate-pulse"
                >
                  <div className="h-10 w-10 rounded-full bg-muted mb-4" />
                  <div className="h-6 w-2/3 bg-muted mb-2 rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </motion.div>
              ))
            : services.map((service) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap]
                return (
                  <motion.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.96 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full"
                  >
                    <ServiceCard
                      title={service.title}
                      description={service.long_description}
                      icon={
                        IconComponent ? (
                          <IconComponent className="w-8 h-8 text-primary" />
                        ) : (
                          <DefaultIcon />
                        )
                      }
                      href={`/services/${service.slug}`}
                      imageSrc={service.image_src}
                    />
                  </motion.div>
                )
              })}
        </motion.div>

        {/* CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}