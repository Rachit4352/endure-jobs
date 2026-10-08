import { NextResponse } from 'next/server'

const ADMIN_ID = 'Rachit4352'
const ADMIN_PASSWORD = 'Endure@001'
const ADMIN_COOKIE = 'endure_admin_session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (body?.adminId !== ADMIN_ID || body?.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid admin ID or password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store, private' } })
  const isSecureRequest = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_URL) || Boolean(process.env.V0_RUNTIME_URL)
  response.cookies.set(ADMIN_COOKIE, 'authenticated', {
    httpOnly: true,
    sameSite: isSecureRequest ? 'none' : 'lax',
    secure: isSecureRequest,
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}

function hasAdminSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  return cookieHeader.split(';').some((part) => {
    const [name, ...valueParts] = part.trim().split('=')
    return name === ADMIN_COOKIE && decodeURIComponent(valueParts.join('=')) === 'authenticated'
  })
}

export async function GET(request: Request) {
  return NextResponse.json(
    { authenticated: hasAdminSession(request) },
    { headers: { 'Cache-Control': 'no-store, private' } },
  )
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, expires: new Date(0), path: '/' })
  return response
}
