'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Network, ShieldCheck, Sparkles } from 'lucide-react'

const previewStats = [
  { label: 'CANDIDATES', value: '1,248' },
  { label: 'APPLICATIONS', value: '3,842' },
  { label: 'INTERVIEWS', value: '426' },
  { label: 'PLACED', value: '184' },
]

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSigningIn(true)
    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: form.get('adminId'),
          password: form.get('password'),
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        setError(result?.error ?? 'Invalid admin ID or password.')
        return
      }

      window.location.href = '/admin/dashboard'
    } catch {
      setError('Unable to sign in right now. Please try again.')
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050d1a] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.12fr_.88fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[#071525] px-10 py-10 lg:flex lg:flex-col xl:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.16),transparent_28%),radial-gradient(circle_at_78%_78%,rgba(37,99,235,.16),transparent_32%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(103,232,249,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.08)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="Endure Jobs home">
              <img src="/endure-jobs-logo.png" alt="Endure Jobs" className="h-10 w-10 object-contain" />
              <span className="text-sm font-bold tracking-[.18em]">ENDURE <b className="text-cyan-300">JOBS</b></span>
            </Link>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-[9px] font-bold tracking-[.2em] text-cyan-200">ADMIN CONTROL CENTER</span>
          </div>

          <div className="relative z-10 mt-auto max-w-2xl pb-8 pt-20">
            <p className="eyebrow">THE OPERATING SYSTEM FOR MOMENTUM</p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] xl:text-6xl">Manage every <span className="text-cyan-300">opportunity.</span><br />Track every candidate.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">Your central workspace for candidate enrollments, job applications, interviews and career activity.</p>
          </div>

          <div className="relative z-10 mt-4 rounded-2xl border border-white/15 bg-[#091b2d]/75 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-300"><Network className="h-4 w-4" /></span><div><p className="text-[10px] font-bold tracking-[.18em] text-white">PLATFORM PULSE</p><p className="mt-1 text-[10px] text-slate-500">Live workspace preview</p></div></div>
              <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-[.16em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> ACTIVE</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {previewStats.map((stat) => <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[.035] p-3"><p className="text-[8px] font-bold tracking-[.16em] text-slate-500">{stat.label}</p><p className="mt-2 text-xl font-semibold tracking-tight text-white">{stat.value}</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-cyan-300/70" /></div></div>)}
            </div>
            <p className="mt-4 text-[9px] text-slate-600">Illustrative dashboard preview · Replace with live platform data</p>
          </div>
        </section>

        <section className="relative flex min-h-screen flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
            <Link href="/" className="back-link mb-14"><ArrowLeft className="h-4 w-4" /> Back to Endure Jobs</Link>
            <div className="mb-10 flex items-center gap-3 lg:hidden"><img src="/endure-jobs-logo.png" alt="Endure Jobs" className="h-10 w-10 object-contain" /><span className="text-sm font-bold tracking-[.18em]">ENDURE <b className="text-cyan-300">JOBS</b></span></div>
            <div className="mb-9"><div className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-[.2em] text-cyan-300"><LockKeyhole className="h-3.5 w-3.5" /> SECURE ADMIN ACCESS</div><h2 className="text-4xl font-semibold tracking-[-.04em]">Welcome back, Admin.</h2><p className="mt-3 text-sm leading-6 text-slate-400">Sign in to manage the Endure Jobs platform.</p></div>
            <form onSubmit={submit} className="space-y-6">
              <label className="block text-[10px] font-bold tracking-[.18em] text-slate-400">
                <span className="block">ADMIN ID</span>
                <input name="adminId" required className="input-dark mt-3 block h-14 w-full" placeholder="Enter your admin ID" autoComplete="username" />
              </label>
              <label className="block text-[10px] font-bold tracking-[.18em] text-slate-400">
                <span className="block">PASSWORD</span>
                <div className="relative mt-3">
                  <input name="password" required type={showPassword ? 'text' : 'password'} className="input-dark block h-14 w-full pr-12" placeholder="Enter your password" autoComplete="current-password" />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-cyan-300">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
              </label>
              {error && <p role="alert" className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}
              <div className="flex items-center justify-between pt-1 text-xs"><label className="flex cursor-pointer items-center gap-2 text-slate-400"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-3.5 w-3.5 accent-cyan-300" /> Remember me</label><button type="button" onClick={() => setError('Password recovery is available through your platform administrator.')} className="text-cyan-300 transition hover:text-cyan-200">Forgot password?</button></div>
              <button disabled={isSigningIn} className="button-primary mt-3 w-full justify-center py-4 disabled:cursor-wait disabled:opacity-70">{isSigningIn ? 'Signing in...' : 'Sign in'} {!isSigningIn && <ArrowRight className="h-4 w-4" />}</button>
            </form>
            <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6 text-[11px] leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-cyan-300" /><span>Protected workspace. Authorized Endure Jobs team members only.</span></div>
          </div>
          <div className="relative z-10 mt-10 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.16em] text-slate-600 lg:justify-start"><Sparkles className="h-3 w-3 text-cyan-400/60" /> BUILT FOR BETTER CAREERS</div>
        </section>
      </div>
    </main>
  )
}
