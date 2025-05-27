"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabaseClient"
import { Loader2 } from "lucide-react"

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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Our talented team of professionals is dedicated to making your event perfect in every way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src={member.image_url || "/placeholder.svg"} 
                  alt={member.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}