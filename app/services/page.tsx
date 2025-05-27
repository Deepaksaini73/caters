"use client"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import ServiceCard from "@/components/home/services-sec/service-card"
import { createClient } from "@/lib/supabaseClient"
import type { LucideIcon } from "lucide-react";
import { JSX } from "react";

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
  const supabase = createClient()
  const DefaultIcon = () => <span className="text-gray-500">🔧</span>

  useEffect(() => {
    async function fetchServices() {
      // Fetch services with their features
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

      if (error) {
        console.error('Error fetching services:', error)
        return
      }

      setServices(servicesData)
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
      </div>
    </div>
  )
}