import Link from "next/link"
import { Button } from "@/components/ui/button"
import { socialLinks, quickLinks, serviceLinks, contactInfo } from "@/config/layout"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react" // Added

const developerInfo = {
  name: "Deepak saini", // Change this to your actual name
  github: "https://github.com/Deepaksaini73", // Change to your actual GitHub URL
  image: "https://res.cloudinary.com/dhi5df340/image/upload/v1748003089/deepak_image_w4yyxx.jpg" // Put your image in public folder
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
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mahakal Events</h3>
            <p className="text-muted-foreground mb-4">
              Creating unforgettable events with exquisite decorations, professional photography, and comprehensive
              event management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
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
              ))}
            </div>
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>
        </div>

        {/* Developer Attribution Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={developerInfo.image}
                alt={developerInfo.name}
                className="w-20 h-20 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all duration-300"
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
                <a href="tel:7374864316" className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1">
                  +91-7374864316
                </a>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <hr />

        {/* Copyright */}
        <div className="text-center text-muted-foreground mt-4">
          <p>&copy; {new Date().getFullYear()} Mahakal Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
