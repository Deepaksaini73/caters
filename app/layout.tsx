import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar/navbar"
import Footer from "@/components/layout/Footer/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/providers/loading-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahakal Caters - Event Planning & Decoration",
  description:
    "Professional event planning, decoration, photography and videography services for weddings, birthdays, and cultural festivals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
