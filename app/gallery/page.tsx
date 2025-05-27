"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "@/components/home/gallery-sec/gallery/gallery-grid"
import { createClient } from "@/lib/supabaseClient"
import { Loader2 } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'wedding' | 'birthday' | 'cultural'
  type: 'image' | 'video'
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false })

        setImages(data || [])
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
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
            Explore our complete portfolio of events and celebrations
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="wedding">Weddings</TabsTrigger>
            <TabsTrigger value="birthday">Birthdays</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>

          {['all', 'wedding', 'birthday', 'cultural'].map((category) => (
            <TabsContent key={category} value={category}>
              <GalleryGrid 
                images={
                  category === 'all' 
                    ? images 
                    : images.filter(img => img.category === category)
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}