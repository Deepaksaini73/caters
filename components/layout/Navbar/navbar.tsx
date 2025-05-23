"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { navLinks } from "@/config/layout"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className={cn(
              "relative w-12 h-12 rounded-full overflow-hidden",
              "transition-transform duration-300 ease-in-out",
              "group-hover:scale-110",
              isScrolled ? "shadow-md" : ""
            )}>
              <Image
                src="/logo.png"
                alt="Mahakal Events Logo"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 40px, 48px"
                priority
                quality={100}
              />
            </div>
            <span className={cn(
              "text-2xl md:text-3xl font-bold font-serif",
              "transition-colors duration-300",
              isScrolled ? "text-primary" : "text-primary",
              "group-hover:text-primary/90",
              "tracking-tight"
            )}>
              Mahakal Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-base font-medium font-sans text-foreground hover:text-primary transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="text-base font-semibold tracking-wide">
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-lg font-medium text-foreground hover:text-primary hover:bg-muted transition-colors tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full text-base font-semibold tracking-wide">
                  <Link href="/quote" onClick={() => setIsOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}