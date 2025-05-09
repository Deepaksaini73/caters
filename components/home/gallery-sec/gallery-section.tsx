"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "./gallery/gallery-grid"
import { weddingGallery, birthdayGallery, culturalGallery } from "@/config/home/gallery"

export default function GallerySection() {
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

        <Tabs defaultValue="wedding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="wedding">Weddings</TabsTrigger>
            <TabsTrigger value="birthday">Birthdays</TabsTrigger>
            <TabsTrigger value="cultural">Cultural Events</TabsTrigger>
          </TabsList>

          <TabsContent value="wedding" className="mt-0">
            <GalleryGrid images={weddingGallery.slice(0, 3)} />
          </TabsContent>

          <TabsContent value="birthday" className="mt-0">
            <GalleryGrid images={birthdayGallery.slice(0, 3)} />
          </TabsContent>

          <TabsContent value="cultural" className="mt-0">
            <GalleryGrid images={culturalGallery.slice(0, 3)} />
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}