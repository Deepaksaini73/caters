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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -10,
        scale: 1.04,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative z-0 hover:z-10 h-full min-h-[120px] flex"
    >
      <Card className="h-full w-full flex flex-col justify-between bg-white/60 dark:bg-black/40 backdrop-blur-md border border-primary/10 shadow-lg transition-all duration-200 hover:shadow-2xl hover:bg-primary/10">
        <CardHeader className="text-center">
          <motion.div
            whileHover={{
              y: [-2, 6, -2],
              scale: 1.15,
              transition: { duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            }}
            className="inline-block"
          >
            <Icon className="w-12 h-12 mx-auto text-primary mb-4 drop-shadow-lg" />
          </motion.div>
          <CardTitle className="transition-colors duration-200 text-lg font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground text-base">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}