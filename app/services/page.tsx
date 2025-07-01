"use client"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import ServiceCard from "@/components/home/services-sec/service-card"
import { createClient } from "@/lib/supabaseClient"
import type { LucideIcon } from "lucide-react"
import { Loader2 } from "lucide-react"

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
} from "lucide-react";

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
};

interface Service {
  id: string
  slug: string
  title: string
  description: string
  long_description: string
  icon: string
  image_src: string
  features: {
    id: string
    title: string
    description: string
  }[]
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const DefaultIcon = () => <span className="text-gray-500">🔧</span>

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data: servicesData, error } = await supabase
          .from('services')
          .select(`
            *,
            features:service_features(
              id,
              title,
              description
            )
          `)
          .order('title')

        if (error) throw error
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-3 text-primary/90">
            Elevate your celebrations with Mahakal Events
          </p>
          <p className="text-lg text-muted-foreground">
            Discover our comprehensive range of <span className="text-primary font-semibold">event services</span> designed to make your special occasions <span className="text-primary font-semibold">truly memorable</span>. From creative decor to seamless management, we bring your vision to life with passion and professionalism.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-2xl border bg-card shadow-lg overflow-hidden min-h-[380px] flex flex-col"
              >
                <div className="relative h-48 bg-muted animate-pulse" />
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted animate-pulse rounded" />
                    <div className="h-3 w-5/6 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-4/6 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.13 } },
              hidden: {},
            }}
          >
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon];
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
                    icon={IconComponent ? <IconComponent className="w-8 h-8 text-primary" /> : <DefaultIcon />}
                    href={`/services/${service.slug}`}
                    imageSrc={service.image_src}
                    features={service.features}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}