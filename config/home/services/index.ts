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
    title: "Home Decoration",
    description: "Transform your wedding venue into a magical setting with our elegant and personalized decoration services.",
    icon: Palette,
    href: "/services/home-decoration",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748161338/WhatsApp_Image_2025-05-25_at_13.46.28_30b95184_tniajj.jpg"
  },
  {
    title: "Birthday Celebrations",
    description: "Create memorable birthday parties with our themed decorations, entertainment, and complete party planning.",
    icon: Calendar,
    href: "/services/birthday-party",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748161911/WhatsApp_Image_2025-05-25_at_13.31.21_76abf78c_lbdapw.jpg"
  },
  {
    title: "Photography & Videography",
    description: "Capture your special moments with our professional photography and videography services, including drone footage.",
    icon: Camera,
    href: "/services/photography",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869621/OIP_hwsei2.jpg"
  },
  {
    title: "Dj & Floor",
    description: "Professional DJs and live music options for all types of events and celebrations.",
    icon: Music,
    href: "/services/dj",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162076/maxresdefault_bwgjki.jpg"
  },
  {
    title: "Catering Services",
    description: "Delicious menu options with professional catering services for all your events.",
    icon: Utensils,
    href: "/services/catering",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869751/catering-food-wedding-event-table-84491977_e78fxg.jpg"
  },
  {
    title: "Stage",
    description: "Specialized gift packaging and cultural setups for traditional weddings.",
    icon: Landmark,
    href: "/services/stage",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162466/WhatsApp_Image_2025-05-25_at_14.10.03_e1117e86_ikvbog.jpg"
  },
  {
    title: "Balloon Decoration",
    description: "Creative and vibrant balloon decor for all events, from kids parties to weddings.",
    icon: Landmark,
    href: "/services/balloon-decoration",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748160800/WhatsApp_Image_2025-05-25_at_13.31.23_ad8922fb_a3vgpf.jpg"
  },
  {
    title: "Tent",
    description: "Elegant tenting and grand entry decor that sets the tone for your celebration.",
    icon: TentTree,
    href: "/services/tent",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162806/WhatsApp_Image_2025-05-25_at_14.17.04_67490ec3_gqyxue.jpg"
  },
  {
    title: "Haldi & Mehendi Function",
    description: "Complete decor and management for vibrant Haldi and Mehendi ceremonies.",
    icon: Palette,
    href: "/services/haldi-mehendi",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162623/WhatsApp_Image_2025-05-25_at_14.13.41_836154a3_qw5qix.jpg"
  },
  {
    title: "Entry",
    description: "We help you find the best vendors and curate unique souvenirs for your guests.",
    icon: Users,
    href: "/services/entry",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162998/WhatsApp_Image_2025-05-25_at_14.20.27_71d618cd_xx45oj.jpg"
  },
  {
    title: "Anniversary Celebration",
    description: "Elegant and heartfelt anniversary parties planned with love and attention to detail.",
    icon: Sparkles,
    href: "/services/anniversary",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162948/WhatsApp_Image_2025-05-25_at_14.19.37_5e6cedc4_kwazdr.jpg"
  },
  {
    title: "VIP Accommodation & Welcome",
    description: "Special guest management, stay arrangements, and welcome services for VIPs.",
    icon: Hotel,
    href: "/services/vip-services",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748163085/WhatsApp_Image_2025-05-25_at_14.21.47_1953eebb_y17vby.jpg"
  },
  {
    title: "Room decor",
    description: "Special guest management, stay arrangements, and welcome services for VIPs.",
    icon: Hotel,
    href: "/services/room-decor",
    imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748163347/WhatsApp_Image_2025-05-25_at_14.26.15_4647b769_j2lbqd.jpg"
  },
]
