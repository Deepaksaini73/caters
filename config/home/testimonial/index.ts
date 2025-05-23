export interface TestimonialType {
  id: number
  name: string
  role: string
  review: string
  rating: number
  image_url?: string
}

export const Dummytestimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    review: "Mahakal Events transformed our wedding venue into a magical paradise. The attention to detail was impeccable, and the photography captured every precious moment beautifully.",
    rating: 5,
    image_url: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746870039/OIP_inoia1.jpg"
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Birthday Celebrant",
    review: "My 30th birthday party was a hit thanks to Mahakal Events. The themed decoration was exactly what I wanted, and the drone footage gave a unique perspective of the celebration.",
    rating: 5,
    image_url: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746870039/OIP_inoia1.jpg"
  },
  {
    id: 3,
    name: "Ananya Gupta",
    role: "Corporate Event Manager",
    review: "We've used Mahakal Events for multiple corporate events, and they never disappoint. Professional, punctual, and creative - they're our go-to event planners.",
    rating: 4,
    image_url: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746870039/OIP_inoia1.jpg"
  },
  {
    id: 4,
    name: "Amit Shah",
    role: "Anniversary Celebration",
    review: "Our silver jubilee celebration was perfect. The team's creativity and execution made it a memorable evening for all our guests.",
    rating: 5,
    image_url: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746870039/OIP_inoia1.jpg"
  }
]