"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { GalleryImage } from "@/config/home/gallery"

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <motion.div
          key={`${image.category}-${image.id}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  )
}