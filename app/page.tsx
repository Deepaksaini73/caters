"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Palette, Users, Calendar } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import ServiceCard from "@/components/service-card"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Mahakal Caters</h2>
            <p className="text-lg text-muted-foreground">
              We transform ordinary spaces into extraordinary experiences. With our expert team of decorators,
              photographers, and event planners, we create magical moments that last a lifetime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Palette className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Creative Designs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Unique and personalized decoration themes for every occasion.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Camera className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Professional Photography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Capturing your special moments with artistic excellence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Dedicated professionals committed to making your event perfect.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Full Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Comprehensive planning and execution for stress-free celebrations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              From elegant weddings to vibrant birthday celebrations, we offer comprehensive services to make your event
              unforgettable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Wedding Decoration"
              description="Transform your wedding venue into a magical setting with our elegant and personalized decoration services."
              icon={<Palette className="h-10 w-10" />}
              href="/services/wedding-decoration"
              imageSrc="/placeholder.svg?height=400&width=600"
            />

            <ServiceCard
              title="Birthday Celebrations"
              description="Create memorable birthday parties with our themed decorations, entertainment, and complete party planning."
              icon={<Calendar className="h-10 w-10" />}
              href="/services/birthday-party"
              imageSrc="/placeholder.svg?height=400&width=600"
            />

            <ServiceCard
              title="Photography & Videography"
              description="Capture your special moments with our professional photography and videography services, including drone footage."
              icon={<Camera className="h-10 w-10" />}
              href="/services/photography"
              imageSrc="/placeholder.svg?height=400&width=600"
            />
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={`wedding-${item}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={`/placeholder.svg?height=600&width=600&text=Wedding+${item}`}
                      alt={`Wedding decoration ${item}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="birthday" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={`birthday-${item}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={`/placeholder.svg?height=600&width=600&text=Birthday+${item}`}
                      alt={`Birthday decoration ${item}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cultural" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={`cultural-${item}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={`/placeholder.svg?height=600&width=600&text=Cultural+${item}`}
                      alt={`Cultural event decoration ${item}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our happy clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Priya Sharma"
              role="Bride"
              testimonial="Mahakal Caters transformed our wedding venue into a magical paradise. The attention to detail was impeccable, and the photography captured every precious moment beautifully."
              rating={5}
              imageSrc="/placeholder.svg?height=200&width=200"
            />

            <TestimonialCard
              name="Rahul Patel"
              role="Birthday Celebrant"
              testimonial="My 30th birthday party was a hit thanks to Mahakal Caters. The themed decoration was exactly what I wanted, and the drone footage gave a unique perspective of the celebration."
              rating={5}
              imageSrc="/placeholder.svg?height=200&width=200"
            />

            <TestimonialCard
              name="Ananya Gupta"
              role="Corporate Event Manager"
              testimonial="We've used Mahakal Caters for multiple corporate events, and they never disappoint. Professional, punctual, and creative - they're our go-to event planners."
              rating={4}
              imageSrc="/placeholder.svg?height=200&width=200"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Next Event?</h2>
            <p className="text-xl mb-8">
              Let us help you create an unforgettable experience. Get in touch today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
