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
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868099/photo-1689699790566-34411f85dd72_ih4wyn.jpg"
  },
  {
    title: "Birthday Celebrations",
    description: "Create memorable birthday parties with our themed decorations, entertainment, and complete party planning.",
    icon: Calendar,
    href: "/services/birthday-party",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Photography & Videography",
    description: "Capture your special moments with our professional photography and videography services, including drone footage.",
    icon: Camera,
    href: "/services/photography",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869621/OIP_hwsei2.jpg"
  },
  {
    title: "Music & Entertainment",
    description: "Professional DJs and live music options for all types of events and celebrations.",
    icon: Music,
    href: "/services/entertainment",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869703/OIP_yqds6e.jpg"
  },
  {
    title: "Catering Services",
    description: "Delicious menu options with professional catering services for all your events.",
    icon: Utensils,
    href: "/services/catering",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869751/catering-food-wedding-event-table-84491977_e78fxg.jpg"
  },
  {
    title: "Corporate Events",
    description: "Professional event management for corporate meetings, conferences and team building events.",
    icon: PartyPopper,
    href: "/services/corporate",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869829/OIP_kkqudp.jpg"
  }
]