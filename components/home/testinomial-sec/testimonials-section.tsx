'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TestimonialCard from '@/components/home/testinomial-sec/testimonial-card'
import {supabase} from '@/lib/supabaseClient'
import { Dummytestimonials } from "@/config/home/testimonial"

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

        {loading ? (
          <p className="text-center">Loading testimonials...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.name}
                role={t.role}
                testimonial={t.review}
                rating={t.rating}
                imageSrc={t.image_url || 'https://th.bing.com/th/id/OIP.9vm7eDbnZS6Yy4ETUfEBAgHaGw?rs=1&pid=ImgDetMain'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
