"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabaseClient"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface TeamMember {
  id: string
  name: string
  role: string
  image_url: string
}

export default function OurTeam() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at')

        setMembers(data || [])
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Our talented team of professionals is dedicated to making your event perfect in every way.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.13 } },
            hidden: {},
          }}
        >
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full"
            >
              <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center p-6 h-full transition-all duration-200 hover:shadow-2xl hover:bg-primary/10">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    y: -6,
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                    transition: { duration: 0.3 }
                  }}
                  className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-primary/20 shadow"
                >
                  <Image
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}