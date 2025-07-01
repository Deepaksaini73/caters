"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { navLinks } from "@/config/layout"

// Add this to your global CSS or tailwind config
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
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
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 group"
          >
            <div
              className={cn(
                "relative w-14 h-14 rounded-full overflow-hidden",
                "transition-all duration-300 ease-out",
                "group-hover:scale-110",
                isScrolled ? "shadow-lg" : ""
              )}
            >
              <Image
                src="/logo.png"
                alt="Mahakal Events Logo"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 40px, 56px"
                priority
                quality={100}
              />
            </div>
            <span
              className={cn(
                "text-2xl font-bold font-['Playfair_Display']",
                "transition-all duration-300",
                isScrolled ? "text-primary" : "text-primary",
                "group-hover:text-primary/90",
                "tracking-wide"
              )}
            >
              Mahakal Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary relative font-['Montserrat'] font-medium tracking-wide transition-colors duration-300 
                after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 
                after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="font-['Montserrat'] font-semibold tracking-wide px-6 py-2 bg-gradient-to-r from-primary/90 to-primary 
              hover:from-primary hover:to-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hover:bg-primary/10 transition-colors duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hover:bg-primary/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="hover:bg-primary/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 py-4 px-2 bg-background/95 backdrop-blur-md rounded-xl shadow-lg border border-primary/10">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 
                  font-['Montserrat'] font-medium tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button 
                  asChild 
                  className="w-full font-['Montserrat'] font-semibold tracking-wide bg-gradient-to-r from-primary/90 to-primary 
                  hover:from-primary hover:to-primary/90 transition-all duration-300 shadow-md"
                >
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