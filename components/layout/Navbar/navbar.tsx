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
import { motion, AnimatePresence } from "framer-motion"

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
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
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
            </motion.div>
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
              <motion.div
                key={link.name}
                whileHover={{ y: -3, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className="text-foreground hover:text-primary relative font-['Montserrat'] font-medium tracking-wide transition-colors duration-300 
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 
                  after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Button 
              asChild 
              className="font-['Montserrat'] font-semibold tracking-wide px-6 py-2 bg-gradient-to-r from-primary/90 to-primary 
              hover:from-primary hover:to-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
            <motion.div
              whileTap={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden gap-3">
            <motion.div
              whileTap={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>
            <motion.div whileTap={{ scale: 1.2 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="hover:bg-primary/10"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex flex-col bg-background/80 backdrop-blur-xl"
            >
              {/* Animated Gradient or Floating Shape */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-2xl pointer-events-none"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex-1 flex flex-col justify-center items-center px-6">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-primary-foreground bg-primary/80 rounded-full p-2 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close menu"
                >
                  <X className="h-7 w-7" />
                </motion.button>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                    hidden: {},
                  }}
                  className="flex flex-col gap-6 w-full max-w-xs mx-auto"
                >
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        className="block text-2xl font-bold font-['Montserrat'] text-center py-3 rounded-lg bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md hover:bg-primary/10 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, delay: navLinks.length * 0.08 }}
                  >
                    <Button 
                      asChild 
                      className="w-full font-['Montserrat'] font-semibold tracking-wide bg-gradient-to-r from-primary/90 to-primary 
                      hover:from-primary hover:to-primary/90 transition-all duration-300 shadow-md py-3 text-lg"
                    >
                      <Link href="/quote" onClick={() => setIsOpen(false)}>
                        Get a Quote
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}