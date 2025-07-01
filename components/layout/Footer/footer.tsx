"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { socialLinks, quickLinks, serviceLinks, contactInfo } from "@/config/layout"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import { motion } from "framer-motion"

const developerInfo = {
  name: "Deepak saini",
  github: "https://github.com/Deepaksaini73",
  image: "https://res.cloudinary.com/dhi5df340/image/upload/v1748003089/deepak_image_w4yyxx.jpg"
}

const getSocialClass = (label: string) => {
  switch (label.toLowerCase()) {
    case 'instagram':
      return 'hover:text-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent'
    case 'facebook':
      return 'hover:text-[#4267B2]'
    case 'twitter':
      return 'hover:text-[#1DA1F2]'
    default:
      return ''
  }
}

export default function Footer() {
  return (
    <footer className="relative bg-muted py-12 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.13 } },
            hidden: {},
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold mb-4">Mahakal Events</h3>
            <p className="text-muted-foreground mb-4">
              Creating unforgettable events with exquisite decorations, professional photography, and comprehensive
              event management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="transition-all duration-300 transform hover:-translate-y-1 hover:bg-muted/50"
                  >
                    <Link href={social.href} aria-label={social.label}>
                      <social.icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          getSocialClass(social.label)
                        )}
                      />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start">
                  <contact.icon className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  {contact.href ? (
                    <Link href={contact.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {contact.text}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{contact.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Developer Attribution Section */}
        <motion.div
          className="border-t border-border mt-8 pt-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              className="flex items-center space-x-3 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={developerInfo.image}
                alt={developerInfo.name}
                className="w-20 h-20 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all duration-300"
                whileHover={{ scale: 1.08, boxShadow: "0 0 0 6px #a855f7" }}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Developed with ❤️ by
                </p>
                <Link
                  href={developerInfo.github}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-semibold">{developerInfo.name}</span>
                  <Github className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.hr
          className="my-8 border-border"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center text-muted-foreground mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
        >
          <p>&copy; {new Date().getFullYear()} Mahakal Events. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
