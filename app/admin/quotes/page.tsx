// app/admin/page.tsx
"use client"

import { useEffect, useState } from "react"
import { createClient } from '../../../lib/supabaseClient'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Quote {
  id: string
  name: string
  email: string
  phone: string
  location: string
  event_type: string
  date: string
  guests: number
  budget: string
  services: string[]
  additional_info: string
  referral_source: string
  created_at: string
  status: "pending" | "reviewed"
}

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [search, setSearch] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching quotes:", error)
        return
      }

      if (!data) {
        setQuotes([])
        return
      }

      const parsedQuotes = data.map((q: any) => ({
        ...q,
        services: typeof q.services === "string" ? JSON.parse(q.services) : q.services || [],
        status: q.status || "pending"
      }))

      setQuotes(parsedQuotes as Quote[])
    }

    fetchQuotes()
  }, [])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("quotes").delete().eq("id", id)
    if (error) {
      console.error("Error deleting quote:", error)
      return
    }
    setQuotes((prev) => prev.filter((q) => q.id !== id))
  }

  const handleToggleStatus = async (id: string, currentStatus: "pending" | "reviewed") => {
    const newStatus = currentStatus === "pending" ? "reviewed" : "pending"
    const { error } = await supabase.from("quotes").update({ status: newStatus }).eq("id", id)
    if (error) {
      console.error("Failed to update status:", error)
      return
    }
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    )
  }

  const filteredQuotes = quotes.filter((q) =>
    (q.name?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    (q.email?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    (q.event_type?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    (q.location?.toLowerCase() ?? "").includes(search.toLowerCase())
  )

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard: Quotes</h1>

        <Input
          placeholder="Search by name, email, location or event type..."
          className="mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-6">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((q) => (
              <Card key={q.id} className="transition-all hover:shadow-xl hover:scale-[1.01]">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle>{q.name} - {q.event_type}</CardTitle>
                    <p className="text-sm text-muted-foreground">{q.email} · {q.phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(q.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Location:</strong> {q.location}</p>
                  <p><strong>Date:</strong> {q.date}</p>
                  <p><strong>Guests:</strong> {q.guests}</p>
                  <p><strong>Budget:</strong> {q.budget}</p>

                  {q.services && q.services.length > 0 && (
                    <div>
                      <strong>Services:</strong>{" "}
                      {q.services.map((s, i) => (
                        <Badge key={i} className="mr-1 mb-1">{s}</Badge>
                      ))}
                    </div>
                  )}

                  {q.additional_info && <p><strong>Note:</strong> {q.additional_info}</p>}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(q.created_at).toLocaleString()}
                    </p>
                    <div className="text-sm">
                      <strong>Status:</strong>{" "}
                      <Badge className={q.status === "reviewed" ? "bg-green-500" : "bg-yellow-500"}>{q.status}</Badge>
                      <button
                        onClick={() => handleToggleStatus(q.id, q.status)}
                        className="ml-2 text-xs underline hover:text-blue-600 transition-colors"
                      >
                        Mark as {q.status === "pending" ? "Reviewed" : "Pending"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No quotes found.</p>
          )}
        </div>
      </div>
    </section>
  )
}
