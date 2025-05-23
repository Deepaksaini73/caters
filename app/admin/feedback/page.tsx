// app/admin/feedback/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabaseClient'
import { Button } from '@/components/ui/button'

type Feedback = {
  id: number
  name: string
  role: string
  review: string
  rating: number
  approved: boolean
  image_url?: string
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase.from('feedback').select('*')
      if (data) setFeedbacks(data)
    }

    fetchFeedback()
  }, [])

  const approveFeedback = async (id: number) => {
    await supabase.from('feedback').update({ approved: true }).eq('id', id)
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, approved: true } : fb))
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Feedback Submissions</h1>
      <div className="space-y-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p className="font-semibold">{fb.name} ({fb.role})</p>
              <p className="text-sm italic">Rating: {fb.rating} ⭐</p>
              <p className="mt-1">{fb.review}</p>
              {fb.image_url && (
                <img src={fb.image_url} alt="feedback" className="mt-2 h-20 rounded" />
              )}
            </div>
            {!fb.approved && (
              <Button onClick={() => approveFeedback(fb.id)} className="mt-4 md:mt-0">
                Approve
              </Button>
            )}
            {fb.approved && (
              <p className="text-green-600 font-medium mt-4 md:mt-0">Approved</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
