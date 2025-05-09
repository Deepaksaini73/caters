"use client"
import { motion } from "framer-motion"
import TestimonialCard from "@/components/home/testinomial-sec/testimonial-card"
import { testimonials } from "@/config/home/testimonial"

export default function TestimonialsSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}