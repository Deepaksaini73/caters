"use client"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AboutCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay: number
}

export default function AboutCard({ icon: Icon, title, description, delay }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative z-0 hover:z-10"
    >
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:bg-accent/5">
        <CardHeader className="text-center">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-12 h-12 mx-auto text-primary mb-4" />
          </motion.div>
          <CardTitle className="transition-colors duration-200">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}