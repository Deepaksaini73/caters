"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface GalleryProps {
  images: string[]
  title: string
}

export default function Gallery({ images, title }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative h-64 rounded-lg overflow-hidden"
        >
          <Image
            src={image}
            alt={`${title} gallery image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      ))}
    </div>
  )
}