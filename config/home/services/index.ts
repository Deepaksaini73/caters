import {
  Palette,
  Camera,
  Calendar,
  Music,
  Utensils,
  Gift,
  PartyPopper,
  MapPin,
  Lightbulb,
  TentTree,
  Home,
  Users,
  Baby,
  Landmark,
  Hotel,
  Sparkles
} from "lucide-react"

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
  },
  {
    title: "Event Planning & Coordination",
    description: "Complete planning and coordination services to bring your vision to life, stress-free.",
    icon: Gift,
    href: "/services/event-planning",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Traditional Wedding (Eru Iyawo)",
    description: "Specialized gift packaging and cultural setups for traditional weddings.",
    icon: Landmark,
    href: "/services/traditional-wedding",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Balloon Decoration",
    description: "Creative and vibrant balloon decor for all events, from kids parties to weddings.",
    icon: Landmark,
    href: "/services/balloon-decoration",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Tent & Entry Setup",
    description: "Elegant tenting and grand entry decor that sets the tone for your celebration.",
    icon: TentTree,
    href: "/services/tent-entry",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Haldi & Mehendi Function",
    description: "Complete decor and management for vibrant Haldi and Mehendi ceremonies.",
    icon: Palette,
    href: "/services/haldi-mehendi",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Vendor & Souvenir Sourcing",
    description: "We help you find the best vendors and curate unique souvenirs for your guests.",
    icon: Users,
    href: "/services/vendor-sourcing",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Bridal Shower",
    description: "Celebrate the bride-to-be with a beautiful, customized bridal shower event.",
    icon: Gift,
    href: "/services/bridal-shower",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Baby Shower",
    description: "Adorable themes and complete decor for welcoming your little one in style.",
    icon: Baby,
    href: "/services/baby-shower",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Kiddies Party",
    description: "Fun-filled party planning for children with themes, games, and decor.",
    icon: Calendar,
    href: "/services/kiddies-party",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Anniversary Celebration",
    description: "Elegant and heartfelt anniversary parties planned with love and attention to detail.",
    icon: Sparkles,
    href: "/services/anniversary",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "VIP Accommodation & Welcome",
    description: "Special guest management, stay arrangements, and welcome services for VIPs.",
    icon: Hotel,
    href: "/services/vip-services",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  },
  {
    title: "Christmas & Festive Decorations",
    description: "Stylish festive decor for Christmas and holiday-themed celebrations.",
    icon: Lightbulb,
    href: "/services/festive-decor",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
  }
]
