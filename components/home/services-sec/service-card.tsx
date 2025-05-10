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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      className="relative z-0 hover:z-10"
    >
      <Card className="overflow-hidden h-full flex flex-col transition-shadow duration-200 hover:shadow-xl">
        <motion.div 
          className="relative h-48"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image 
            src={imageSrc || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-200" 
          />
        </motion.div>
        <CardHeader>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-primary">{icon}</div>
            <CardTitle>{title}</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button 
            asChild 
            variant="ghost" 
            className="w-full justify-between hover:bg-primary/5"
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
