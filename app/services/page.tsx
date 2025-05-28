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
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground">
            Discover our comprehensive range of event services designed to make your special occasions truly memorable.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card shadow-sm overflow-hidden"
              >
                <div className="relative h-48 bg-muted animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.long_description}
                  icon={IconComponent ? <IconComponent className="w-6 h-6 text-primary" /> : <DefaultIcon />}
                  href={`/services/${service.slug}`}
                  imageSrc={service.image_src}
                  features={service.features}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}