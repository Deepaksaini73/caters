"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "@/components/home/gallery-sec/gallery/gallery-grid"
import { createClient } from "@/lib/supabaseClient"
import { Loader2, Image, Video } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  media_type: 'image' | 'video'
}

export default function GalleryPage() {
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

        setMedia(data || [])
      } catch (error) {
        console.error('Error fetching media:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of images and videos
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Media
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>

        <TabsContent value="all">
          <GalleryGrid images={media} mode="all" />
        </TabsContent>

        <TabsContent value="image">
          <GalleryGrid images={media.filter(item => item.media_type === 'image')} mode="image" />
        </TabsContent>

        <TabsContent value="video">
          <GalleryGrid images={media.filter(item => item.media_type === 'video')} mode="video" />
        </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}