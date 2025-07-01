'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TestimonialCard from '@/components/home/testinomial-sec/testimonial-card'
import { supabase } from '@/lib/supabaseClient'
import { Dummytestimonials } from "@/config/home/testimonial"
import { Sparkles } from "lucide-react"

type Feedback = {
  id: number
  name: string
  role: string
  review: string
  rating: number
  image_url?: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('approved', true)
        .order('id', { ascending: false })

      if (error) {
        console.error('Failed to fetch testimonials:', error)
        setTestimonials(Dummytestimonials)
      } else {
        setTestimonials(data || [])
      }

      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Sparkles Icon */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        animate={{ y: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-10 h-10 text-primary/60" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-2 sm:px-4">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our happy clients have to say about our services.
          </p>
        </motion.div>

        {/* Testimonials Grid Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.13 } },
            hidden: {},
          }}
        >
          {loading
            ? [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="rounded-2xl border bg-card p-8 min-h-[220px] h-full animate-pulse"
                >
                  <div className="h-10 w-10 rounded-full bg-muted mb-4 mx-auto" />
                  <div className="h-6 w-2/3 bg-muted mb-2 rounded mx-auto" />
                  <div className="h-4 w-full bg-muted rounded mx-auto" />
                </motion.div>
              ))
            : testimonials.slice(0, 6).map((t) => (
                <motion.div
                  key={t.id}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full"
                >
                  <TestimonialCard
                    name={t.name}
                    role={t.role}
                    testimonial={t.review}
                    rating={t.rating}
                    imageSrc={t.image_url || 'https://th.bing.com/th/id/OIP.9vm7eDbnZS6Yy4ETUfEBAgHaGw?rs=1&pid=ImgDetMain'}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  )
}
