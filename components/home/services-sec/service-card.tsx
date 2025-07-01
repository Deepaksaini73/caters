"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  imageSrc: string
}

export default function ServiceCard({ title, description, icon, href, imageSrc }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      className="relative z-0 hover:z-10 h-full min-h-[340px] flex"
    >
      <Card className="overflow-hidden h-full w-full flex flex-col bg-white/70 dark:bg-black/40 backdrop-blur-md border border-primary/10 shadow-lg transition-all duration-200 hover:shadow-2xl hover:bg-primary/10">
        <motion.div
          className="relative h-44 sm:h-48"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 33vw"
            priority={false}
          />
        </motion.div>
        <CardHeader className="flex flex-col items-center mt-2">
          <motion.div
            whileHover={{
              y: [-2, 6, -2],
              scale: 1.15,
              transition: { duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            }}
            className="mb-2 text-primary"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-lg font-bold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center">
          <CardDescription className="text-base text-center">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-between hover:bg-primary/10 transition-transform duration-200 hover:scale-105"
          >
            <Link href={href}>
              Learn More <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
