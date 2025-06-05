import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Footer from "@/components/layout/Footer/footer"
import Navbar from "@/components/layout/Navbar/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://mahakal-events.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahakal Events - Premier Event Planning & Decoration Services in Jhunjhunu",
    template: "%s | Mahakal Events"
  },
  description: "Transform your celebrations with Mahakal Events - Jhunjhunu's leading event planning service. Specialized in weddings, corporate events, birthday parties with professional decoration and catering services.",
  keywords: [
    "event planning Jhunjhunu",
    "wedding decoration",
    "catering services Rajasthan",
    "wedding planner Jhunjhunu",
    "Mahakal Events",
    "event decoration Jhunjhunu",
    "corporate event management",
    "birthday party decoration",
    "wedding venues Rajasthan",
    "traditional wedding planning"
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
    locale: "en_IN",
    url: siteUrl,
    title: "Mahakal Events - Premier Event Planning & Decoration Services",
    description: "Transform your celebrations with Mahakal Events - Professional event planning, decoration, and catering services in Jhunjhunu, Rajasthan.",
    siteName: "Mahakal Events",
    images: [{
      url: `${siteUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "Mahakal Events - Event Planning & Decoration Services"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahakal Events - Premier Event Planning Services",
    description: "Professional event planning, decoration, and catering services in Jhunjhunu, Rajasthan.",
    images: [`${siteUrl}/images/twitter-image.jpg`],
    creator: "@mahakalevents",
  },
  verification: {
    google: "A7uZs2EqhOvldix-UoDrHl55sL5sLRAHyVlEdhPP-BU",
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
        <meta name="google-site-verification" content="A7uZs2EqhOvldix-UoDrHl55sL5sLRAHyVlEdhPP-BU" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="description" content="Mahakal Events - Professional event planning and decoration services in Jhunjhunu" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mahakal-events.vercel.app/" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventPlanning",
              "name": "Mahakal Events",
              "image": `${siteUrl}/images/logo.png`,
              "@id": siteUrl,
              "url": siteUrl,
              "telephone": "7878412963",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bagar Road",
                "addressLocality": "Jhunjhunu",
                "addressRegion": "Rajasthan",
                "postalCode": "333001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.1289",
                "longitude": "75.4022"
              },
              "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 09:00-21:00",
              "priceRange": "₹₹₹",
              "description": "Premier event planning and decoration services in Jhunjhunu, specializing in weddings, corporate events, and celebrations",
              "sameAs": [
                "https://www.instagram.com/mahakal_decoration_and_events",
                "https://api.whatsapp.com/send?phone=%2B917878412963"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "28.1289",
                  "longitude": "75.4022"
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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