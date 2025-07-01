"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "./gallery/gallery-grid"
import { createClient } from "@/lib/supabaseClient"
import { Loader2, Image as ImageIcon, Video as VideoIcon } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  media_type: 'image' | 'video'
}

export default function GallerySection() {
  const [media, setMedia] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchMedia() {
      try {
        const { data } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(9)

        setMedia(data || [])
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-2 sm:px-4">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground">
            Explore our collection of images and videos
          </p>
        </motion.div>

        {/* Tabs Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex justify-center gap-2 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  All Media
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <VideoIcon className="h-4 w-4" />
                  Videos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <GalleryGrid images={media.slice(0, 6)} />
              </TabsContent>
              
              <TabsContent value="image">
                <GalleryGrid 
                  images={media
                    .filter(item => item.media_type === 'image')
                    .slice(0, 6)} 
              />
              </TabsContent>
              
              <TabsContent value="video">
                <GalleryGrid 
                  images={media
                    .filter(item => item.media_type === 'video')
                    .slice(0, 6)} 
              />
              </TabsContent>
            </Tabs>
          )}
        </motion.div>

        {/* CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_var(--primary)]"
          >
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}