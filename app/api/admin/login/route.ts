// filepath: d:\projects\MERN project\caters\caters\app\api\admin\login\route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  const body = await request.json()
  
  if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
    const token = sign({ username: body.username }, JWT_SECRET, { expiresIn: '1h' })
    
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}