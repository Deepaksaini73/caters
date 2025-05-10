export interface NavLinkType {
  name: string
  href: string
}

export const navLinks: NavLinkType[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

// for footer 

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface SocialLinkType {
  icon: LucideIcon
  href: string
  label: string
}

export interface FooterLinkType {
  name: string
  href: string
}

export interface ContactInfoType {
  icon: LucideIcon
  text: string
  href?: string
}

export const socialLinks: SocialLinkType[] = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/mahakal_decoration_and_events/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export const quickLinks: FooterLinkType[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact" },
]

export const serviceLinks: FooterLinkType[] = [
  { name: "Wedding Decoration", href: "/services/wedding-decoration" },
  { name: "Birthday Party Decoration", href: "/services/birthday-party" },
  { name: "Photography & Videography", href: "/services/photography" },
  { name: "Drone Footage", href: "/services/drone" },
  { name: "Full Event Management", href: "/services/event-management" },
]

export const contactInfo: ContactInfoType[] = [
  {
    icon: MapPin,
    text: "nawalgram, jhunjhunu , rajshthan, India",
  },
  {
    icon: Phone,
    text: "+91 7374864316",
  },
  {
    icon: Mail,
    text: "info@mahakalcaters.com",
    href: "mailto:info@mahakalcaters.com"
  },
]