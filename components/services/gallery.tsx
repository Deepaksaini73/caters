"use client"

import Image from "next/image"
import { motion } from "framer-motion"

// Define media item type
type MediaItem = {
  type: 'image' | 'video'
  url: string
  thumbnail?: string // Optional thumbnail for videos
}

interface GalleryProps {
  media: MediaItem[]
  title: string
}

const VideoPlayer = ({ url, thumbnail }: { url: string; thumbnail?: string }) => {
  return (
    <video
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      controls
      poster={thumbnail}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default function Gallery({ media, title }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {media.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative h-64 rounded-lg overflow-hidden"
        >
          {item.type === 'image' ? (
            <Image
              src={item.url}
              alt={`${title} gallery item ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <VideoPlayer url={item.url} thumbnail={item.thumbnail} />
          )}
        </motion.div>
      ))}
    </div>
  )
}