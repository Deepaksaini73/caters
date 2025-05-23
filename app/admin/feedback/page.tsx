'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Trash2, CheckCircle2 } from 'lucide-react'

type Feedback = {
  id: number
  name: string
  role: string
  review: string
  rating: number
  approved: boolean
  image_url?: string
}

const FILTERS = ['all', 'approved', 'pending'] as const
type FilterType = (typeof FILTERS)[number]

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const fetchFeedback = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('feedback').select('*')
    if (data) setFeedbacks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  const approveFeedback = async (id: number) => {
    await supabase.from('feedback').update({ approved: true }).eq('id', id)
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, approved: true } : fb))
    )
  }

  const deleteFeedback = async (id: number) => {
    await supabase.from('feedback').delete().eq('id', id)
    setFeedbacks((prev) => prev.filter((fb) => fb.id !== id))
  }

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filter === 'all') return true
    if (filter === 'approved') return fb.approved
    if (filter === 'pending') return !fb.approved
    return true
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Feedback Submissions ({filteredFeedbacks.length})</h1>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'approved' ? 'Approved' : 'Pending'}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredFeedbacks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No feedbacks to show.</p>
        ) : (
          filteredFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold">{fb.name} ({fb.role})</p>
                <p className="text-sm italic">Rating: {fb.rating} ⭐</p>
                <p className="mt-1">{fb.review}</p>
                {fb.image_url && (
                  <img src={fb.image_url} alt="feedback" className="mt-2 h-20 rounded" />
                )}
              </div>

              <div className="flex gap-2 items-center">
                {!fb.approved ? (
                  <Button onClick={() => approveFeedback(fb.id)} size="sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                ) : (
                  <p className="text-green-600 font-medium text-sm">Approved</p>
                )}

                <Button
                  variant="destructive"
                  onClick={() => deleteFeedback(fb.id)}
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
