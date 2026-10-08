import { NextResponse } from 'next/server'
import { candidateStore, isCandidateInput } from '@/lib/candidates'

function hasAdminSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  return cookieHeader.split(';').some((part) => {
    const [name, ...valueParts] = part.trim().split('=')
    return name === 'endure_admin_session' && decodeURIComponent(valueParts.join('=')) === 'authenticated'
  })
}

export async function GET(request: Request) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  }

  try {
    return NextResponse.json(await candidateStore.list())
  } catch (error) {
    console.error('[v0] Candidate list failed:', error)
    return NextResponse.json({ error: 'Unable to load candidates.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const input = await request.json()
    if (!isCandidateInput(input)) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    return NextResponse.json(await candidateStore.add(input), { status: 201 })
  } catch (error) {
    console.error('[v0] Candidate enrollment failed:', error)
    return NextResponse.json({ error: 'Unable to save enrollment.' }, { status: 500 })
  }
}
