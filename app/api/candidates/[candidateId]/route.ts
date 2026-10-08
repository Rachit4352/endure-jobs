import { NextResponse } from 'next/server'
import { candidateStore } from '@/lib/candidates'

function hasAdminSession(request: Request) {
  return (request.headers.get('cookie') ?? '').split(';').some((part) => {
    const [name, ...valueParts] = part.trim().split('=')
    return name === 'endure_admin_session' && decodeURIComponent(valueParts.join('=')) === 'authenticated'
  })
}

export async function GET(request: Request, { params }: { params: Promise<{ candidateId: string }> }) {
  if (!hasAdminSession(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  const { candidateId } = await params
  const candidate = await candidateStore.getById(candidateId)
  if (!candidate) return NextResponse.json({ error: 'Candidate not found.' }, { status: 404 })
  return NextResponse.json(candidate, { headers: { 'Cache-Control': 'no-store' } })
}
