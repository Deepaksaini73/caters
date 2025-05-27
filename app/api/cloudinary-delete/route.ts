import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryDeleteResponse {
  result: 'ok' | 'not found'
  error?: {
    message: string
  }
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json()
    
    if (!body.public_id) {
      return NextResponse.json(
        { error: 'public_id is required' },
        { status: 400 }
      )
    }

    const { public_id } = body

    // Call Cloudinary delete API
    const result = await cloudinary.uploader.destroy(public_id) as CloudinaryDeleteResponse

    if (result.result === 'ok') {
      return NextResponse.json({ 
        success: true,
        message: 'Image deleted successfully'
      })
    } 
    
    if (result.result === 'not found') {
      return NextResponse.json(
        { error: 'Image not found in Cloudinary' },
        { status: 404 }
      )
    }

    // Handle other error cases
    return NextResponse.json(
      { error: result.error?.message || 'Failed to delete image' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    
    // Check if error is from Cloudinary
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}