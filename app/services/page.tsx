"use client"
import { motion } from "framer-motion"
import ServiceCard from "@/components/home/services-sec/service-card"
import { services } from "@/config/home/services/index"

export default function ServicesPage() {
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
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={<service.icon className="h-10 w-10" />}
              href={service.href}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  )
}