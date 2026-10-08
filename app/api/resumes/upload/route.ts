import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Resume file is required.' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Resume must be 10MB or smaller.' }, { status: 400 })
    const blob = await put(`resumes/${crypto.randomUUID()}-${file.name}`, file, { access: 'private', addRandomSuffix: false })
    return NextResponse.json({ pathname: blob.pathname, name: file.name, size: file.size, type: file.type })
  } catch (error) {
    console.error('[v0] Resume upload failed:', error)
    return NextResponse.json({ error: 'Unable to upload resume.' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
