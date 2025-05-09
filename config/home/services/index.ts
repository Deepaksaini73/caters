import { Palette, Camera, Calendar, Music, Utensils, Gift, PartyPopper, MapPin } from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface ServiceCardType {
  title: string
  description: string
  icon: LucideIcon
  href: string
  imageSrc: string
}

export const services: ServiceCardType[] = [
  {
    title: "Wedding Decoration",
    description: "Transform your wedding venue into a magical setting with our elegant and personalized decoration services.",
    icon: Palette,
    href: "/services/wedding-decoration",
    imageSrc: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Birthday Celebrations",
    description: "Create memorable birthday parties with our themed decorations, entertainment, and complete party planning.",
    icon: Calendar,
    href: "/services/birthday-party",
    imageSrc: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Photography & Videography",
    description: "Capture your special moments with our professional photography and videography services, including drone footage.",
    icon: Camera,
    href: "/services/photography",
    imageSrc: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Music & Entertainment",
    description: "Professional DJs and live music options for all types of events and celebrations.",
    icon: Music,
    href: "/services/entertainment",
    imageSrc: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Catering Services",
    description: "Delicious menu options with professional catering services for all your events.",
    icon: Utensils,
    href: "/services/catering",
    imageSrc: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Corporate Events",
    description: "Professional event management for corporate meetings, conferences and team building events.",
    icon: PartyPopper,
    href: "/services/corporate",
    imageSrc: "/placeholder.svg?height=400&width=600"
  }
]