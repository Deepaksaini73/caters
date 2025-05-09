export interface TestimonialType {
  id: number
  name: string
  role: string
  testimonial: string
  rating: number
  imageSrc: string
}

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    testimonial: "Mahakal Caters transformed our wedding venue into a magical paradise. The attention to detail was impeccable, and the photography captured every precious moment beautifully.",
    rating: 5,
    imageSrc: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Birthday Celebrant",
    testimonial: "My 30th birthday party was a hit thanks to Mahakal Caters. The themed decoration was exactly what I wanted, and the drone footage gave a unique perspective of the celebration.",
    rating: 5,
    imageSrc: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Ananya Gupta",
    role: "Corporate Event Manager",
    testimonial: "We've used Mahakal Caters for multiple corporate events, and they never disappoint. Professional, punctual, and creative - they're our go-to event planners.",
    rating: 4,
    imageSrc: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    name: "Amit Shah",
    role: "Anniversary Celebration",
    testimonial: "Our silver jubilee celebration was perfect. The team's creativity and execution made it a memorable evening for all our guests.",
    rating: 5,
    imageSrc: "/placeholder.svg?height=200&width=200"
  }
]