"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface DetailsProps {
  features: {
    title: string
    description: string
  }[]
}

export default function Details({ features }: DetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}