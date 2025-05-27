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
  HelpCircle, // Added for DefaultIcon
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
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            From elegant weddings to vibrant birthday celebrations, we offer comprehensive services to make your event
            unforgettable.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-8 animate-pulse"
              >
                <div className="h-10 w-10 rounded-full bg-muted mb-4" />
                <div className="h-6 w-2/3 bg-muted mb-2 rounded" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap]
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.long_description}
                  icon={
                    IconComponent ? (
                      <IconComponent className="w-6 h-6 text-primary" />
                    ) : (
                      <DefaultIcon />
                    )
                  }
                  href={`/services/${service.slug}`}
                  imageSrc={service.image_src}
                />
              )
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}