"use client"
import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryImage {
  id: string  // Ensure this matches Supabase structure
  src: string
  alt: string
  category?: string
  type?: 'image' | 'video'
}

const getMediaType = (src: string): 'image' | 'video' => {
  const videoPatterns = ['.mp4', '.mov', '.avi', '.webm']
  return videoPatterns.some(pattern => src.toLowerCase().includes(pattern)) ? 'video' : 'image'
}

interface GalleryGridProps {
  images: GalleryImage[]
}

const VideoPlayer = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <video
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      controls
    >
      <source src={src} type="video/mp4" />
      {alt}
    </video>
  )
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((item, index) => (
        <motion.div
          key={item.id || `gallery-item-${index}`} // Fallback to index if id is missing
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          {getMediaType(item.src) === 'video' ? (
            <VideoPlayer src={item.src} alt={item.alt} />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}