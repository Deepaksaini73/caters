"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  imageSrc: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  imageSrc,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
