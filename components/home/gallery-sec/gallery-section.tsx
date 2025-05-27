"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "./gallery/gallery-grid"
import { createClient } from "@/lib/supabaseClient"
import { Loader2 } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'wedding' | 'birthday' | 'cultural'
  type: 'image' | 'video'
}

export default function GallerySection() {
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
          .limit(9) // Fetch only 9 latest images

        setImages(data || [])
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground">
            Browse through our recent events and get inspired for your own celebration.
          </p>
        </motion.div>

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
          <Tabs defaultValue="wedding" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="wedding">Weddings</TabsTrigger>
              <TabsTrigger value="birthday">Birthdays</TabsTrigger>
              <TabsTrigger value="cultural">Cultural Events</TabsTrigger>
            </TabsList>

            <TabsContent value="wedding" className="mt-0">
              <GalleryGrid 
                images={images
                  .filter(img => img.category === 'wedding')
                  .slice(0, 3)
                  .map(img => ({
                    src: img.src,
                    alt: img.alt,
                    type: img.type
                  }))}
              />
            </TabsContent>

            <TabsContent value="birthday" className="mt-0">
              <GalleryGrid 
                images={images
                  .filter(img => img.category === 'birthday')
                  .slice(0, 3)
                  .map(img => ({
                    src: img.src,
                    alt: img.alt,
                    type: img.type
                  }))}
              />
            </TabsContent>

            <TabsContent value="cultural" className="mt-0">
              <GalleryGrid 
                images={images
                  .filter(img => img.category === 'cultural')
                  .slice(0, 3)
                  .map(img => ({
                    src: img.src,
                    alt: img.alt,
                    type: img.type
                  }))}
              />
            </TabsContent>
          </Tabs>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}