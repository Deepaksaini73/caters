import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Footer from "@/components/layout/Footer/footer"
import Navbar from "@/components/layout/Navbar/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://mahakal-events.vercel.app" // Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahakal Events - Premium Event Planning & Catering Services",
    template: "%s | Mahakal Events"
  },
  description: "Transform your events with Mahakal Events - Indore's premier event planning and catering service. Specializing in weddings, corporate events, birthday parties, and cultural celebrations. Professional decoration, catering, and event management services.",
  keywords: [
    "event planning",
    "catering services",
    "wedding planner",
    "event decoration",
    "Mahakal Events",
    "party planner Indore",
    "corporate events",
    "birthday party planning",
    "wedding catering",
    "event management"
  ],
  authors: [{ name: "Mahakal Events" }],
  creator: "Mahakal Events",
  publisher: "Mahakal Events",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mahakal Events - Premium Event Planning & Catering Services",
    description: "Transform your events with Mahakal Events - Professional event planning, catering, and decoration services in Indore.",
    siteName: "Mahakal Events",
    images: [{
      url: `${siteUrl}/images/og-image.jpg`, // Add your OG image
      width: 1200,
      height: 630,
      alt: "Mahakal Events Banner"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahakal Events - Premium Event Planning & Catering Services",
    description: "Transform your events with Mahakal Events - Professional event planning, catering, and decoration services in Indore.",
    images: [`${siteUrl}/images/twitter-image.jpg`], // Add your Twitter card image
    creator: "@mahakalevents", // Add your Twitter handle
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        sizes: "32x32",
        type: "image/ico",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Mahakal Events",
              "image": `${siteUrl}/images/logo.png`,
              "@id": siteUrl,
              "url": siteUrl,
              "telephone": "7878412963",
              "address": {
                "@type": "333001",
                "streetAddress": "Bagar Road",
                "addressLocality": "jhunjhunu",
                "postalCode": "333001",
                "addressCountry": "IN"
              },
              "priceRange": "₹₹₹",
              "description": "Premium event planning and catering services in Indore",
              "sameAs": [
                "your-facebook-url",
                "https://www.instagram.com/mahakal_decoration_and_events",
                "https://api.whatsapp.com/send?phone=%2B917878412963"
              ]
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
