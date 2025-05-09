"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryGrid from "@/components/home/gallery-sec/gallery/gallery-grid"
import { weddingGallery, birthdayGallery, culturalGallery } from "@/config/home/gallery"

export default function GalleryPage() {
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

          <TabsContent value="all" className="mt-0">
            <GalleryGrid 
              images={[
                ...weddingGallery,
                ...birthdayGallery,
                ...culturalGallery
              ]}
            />
          </TabsContent>

          <TabsContent value="wedding" className="mt-0">
            <GalleryGrid images={weddingGallery} />
          </TabsContent>

          <TabsContent value="birthday" className="mt-0">
            <GalleryGrid images={birthdayGallery} />
          </TabsContent>

          <TabsContent value="cultural" className="mt-0">
            <GalleryGrid images={culturalGallery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}