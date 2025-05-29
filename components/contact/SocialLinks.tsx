import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { motion } from "framer-motion"
import { contactConfig } from "@/config/contact"

const socialIcons = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  whatsapp: <FaWhatsapp className="h-5 w-5" />,
}

export default function SocialLinks() {
  const socialLinks = Object.entries(contactConfig.social).map(([name, href]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    icon: socialIcons[name as keyof typeof socialIcons],
    href,
  }))

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Follow Us On</h3>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  )
}