// app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    // Extract form data
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const review = formData.get('review') as string
    const rating = Number(formData.get('rating'))

    // Validate required fields
    if (!name || !role || !review || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating is a number between 1-5
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Store feedback in database
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          name,
          role,  
          review,
          rating,
          approved: false, // Added default approval status
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
