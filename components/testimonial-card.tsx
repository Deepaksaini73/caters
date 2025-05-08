"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
  rating: number
  imageSrc: string
}

export default function TestimonialCard({ name, role, testimonial, rating, imageSrc }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="italic">"{testimonial}"</p>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
