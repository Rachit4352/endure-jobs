'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import type { Candidate } from '@/lib/candidates'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Candidates', href: '/admin/candidates', icon: Users },
  { label: 'Applications / Services', href: '/admin/applications', icon: BriefcaseBusiness },
  { label: 'Documents', href: '/admin/candidates', icon: FileText },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

function startOfDay(value: string) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

function statusTone(status: string) {
  if (status === 'HIRED' || status === 'OFFER') return 'status-positive'
  if (status === 'ACTIVE' || status === 'INTERVIEW') return 'status-active'
  if (status === 'CLOSED' || status === 'ON HOLD') return 'status-muted'
  return 'status-new'
}

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      try {
        const candidatesResponse = await fetch('/api/candidates', {
          cache: 'no-store',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        })

        if (candidatesResponse.status === 401) {
          if (active) setError('Your admin session has expired. Please sign in again.')
          window.setTimeout(() => {
            if (active) window.location.replace('/admin/login')
          }, 1200)
          return
        }
        if (!candidatesResponse.ok) throw new Error('Unable to load candidate data.')

        const data = await candidatesResponse.json()
        if (active) setCandidates(Array.isArray(data) ? data : [])
      } catch {
        if (active) setError('Candidate data could not be loaded. Please refresh and try again.')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadDashboard()
    return () => { active = false }
  }, [])

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = startOfDay(now.toISOString())
  const stats = useMemo(() => [
    { label: 'Total candidates', value: candidates.length, detail: 'All enrolled profiles', icon: Users, accent: 'cyan' },
    { label: 'This year', value: candidates.filter((candidate) => { const date = new Date(candidate.enrollmentDate); return date.getFullYear() === year }).length, detail: `${year} enrollments`, icon: BarChart3, accent: 'blue' },
    { label: 'This month', value: candidates.filter((candidate) => { const date = new Date(candidate.enrollmentDate); return date.getFullYear() === year && date.getMonth() === month }).length, detail: 'Current month', icon: Activity, accent: 'violet' },
    { label: 'Today', value: candidates.filter((candidate) => startOfDay(candidate.enrollmentDate) === today).length, detail: 'New today', icon: Clock3, accent: 'amber' },
    { label: 'Active', value: candidates.filter((candidate) => ['ACTIVE', 'JOB SEARCH', 'APPLICATIONS', 'INTERVIEW', 'OFFER'].includes(candidate.status)).length, detail: 'In progress', icon: BriefcaseBusiness, accent: 'green' },
    { label: 'Completed', value: candidates.filter((candidate) => ['HIRED', 'CLOSED'].includes(candidate.status)).length, detail: 'Closed or hired', icon: CheckCircle2, accent: 'slate' },
  ], [candidates, year, month, today])

  const yearly = useMemo(() => Array.from({ length: 5 }, (_, index) => {
    const targetYear = year - 4 + index
    return { year: targetYear, count: candidates.filter((candidate) => new Date(candidate.enrollmentDate).getFullYear() === targetYear).length }
  }), [candidates, year])
  const maxYearly = Math.max(...yearly.map((item) => item.count), 1)
  const filtered = candidates.filter((candidate) => [candidate.fullName, candidate.email, candidate.targetJob, candidate.status, candidate.country].join(' ').toLowerCase().includes(query.toLowerCase())).slice(0, 7)

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    window.location.href = '/admin/login'
  }

  return (
    <main className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-brand"><img src="/endure-jobs-logo.png" alt="Endure Jobs" /><span>ENDURE <b>JOBS</b></span><button className="admin-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X /></button></div>
        <p className="admin-kicker">WORKSPACE</p>
        <nav className="admin-menu">{navItems.map(({ label, href, icon: Icon }) => <Link className={label === 'Dashboard' ? 'is-active' : ''} href={href} key={label} onClick={() => setSidebarOpen(false)}><Icon />{label}{label === 'Candidates' && <span className="nav-count">{candidates.length}</span>}</Link>)}</nav>
        <p className="admin-kicker admin-kicker-spaced">SYSTEM</p>
        <nav className="admin-menu"><Link href="/admin/candidates"><ShieldCheck />Staff / Admins</Link><Link href="/admin/candidates"><Activity />Audit Logs</Link><Link href="/admin/dashboard"><Settings />Settings</Link></nav>
        <button className="admin-logout" onClick={logout}><LogOut />Log out</button>
      </aside>
      {sidebarOpen && <button className="admin-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

      <section className="admin-content">
        <header className="admin-topbar"><button className="admin-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu /></button><div className="admin-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidates, roles, or status..." aria-label="Search candidates" /></div><div className="admin-top-actions"><button className="admin-icon-button" aria-label="Notifications"><Bell /><span /></button><div className="admin-profile"><span className="admin-avatar">RA</span><span><b>Rachit Admin</b><small>Administrator</small></span><ChevronRight /></div></div></header>
        <div className="admin-main">
          <div className="admin-heading-row"><div><p className="admin-kicker">OVERVIEW</p><h1>Good morning, Rachit.</h1><p className="admin-subtitle">Here&apos;s what&apos;s happening with your candidate pipeline.</p></div><Link href="/admin/candidates" className="admin-primary-action"><Users />View all candidates<ArrowUpRight /></Link></div>
          {error ? <div className="admin-state admin-error"><X />{error}</div> : loading ? <div className="admin-state"><Activity className="animate-pulse" />Loading live candidate data...</div> : <>
            <div className="admin-stat-grid">{stats.map(({ label, value, detail, icon: Icon, accent }) => <article className={`admin-stat admin-stat-${accent}`} key={label}><div className="admin-stat-top"><span>{label}</span><Icon /></div><strong>{value.toLocaleString()}</strong><small>{detail}</small></article>)}</div>
            <div className="admin-dashboard-grid"><section className="admin-panel enrollment-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">ENROLLMENT TRENDS</p><h2>Candidate growth</h2></div><span className="admin-live"><i /> Live data</span></div><div className="bar-chart" aria-label="Candidate enrollments by year">{yearly.map((item) => <div className="bar-column" key={item.year}><span>{item.count}</span><div className="bar-track"><div className="bar-fill" style={{ height: `${Math.max((item.count / maxYearly) * 100, item.count ? 8 : 2)}%` }} /></div><small>{item.year}</small></div>)}</div></section><section className="admin-panel pipeline-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">PIPELINE</p><h2>Candidate status</h2></div><Link href="/admin/candidates">Details <ArrowUpRight /></Link></div><div className="pipeline-list">{['NEW', 'ACTIVE', 'INTERVIEW', 'OFFER', 'HIRED'].map((status) => { const count = candidates.filter((candidate) => candidate.status === status).length; return <div key={status}><span><i className={`pipeline-dot ${statusTone(status)}`} />{status.replace('INTERVIEW', 'Interview')}</span><b>{count}</b><div className="pipeline-track"><i style={{ width: `${candidates.length ? Math.max((count / candidates.length) * 100, count ? 5 : 0) : 0}%` }} /></div></div> })}</div></section></div>
            <section className="admin-panel recent-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">CANDIDATE DIRECTORY</p><h2>Recent candidates</h2></div><Link href="/admin/candidates">View all <ArrowUpRight /></Link></div>{filtered.length === 0 ? <div className="admin-empty"><Users />{query ? 'No candidates match your search.' : 'No candidates have enrolled yet.'}</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Candidate</th><th>Target role</th><th>Location</th><th>Enrolled</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((candidate) => <tr key={candidate.candidateId}><td><Link href={`/admin/candidates/${candidate.candidateId}`} className="candidate-cell"><span className="candidate-avatar">{candidate.fullName.slice(0, 2).toUpperCase()}</span><span><b>{candidate.fullName}</b><small>{candidate.email}</small></span></Link></td><td>{candidate.targetJob}</td><td>{candidate.preferredLocation || candidate.country}</td><td>{new Date(candidate.enrollmentDate).toLocaleDateString()}</td><td><span className={`status-badge ${statusTone(candidate.status)}`}>{candidate.status}</span></td><td><ChevronRight className="table-arrow" /></td></tr>)}</tbody></table></div>}</section>
          </>}
          <footer className="admin-footer"><span>Endure Jobs Admin Console</span><span>Data synced from Neon</span></footer>
        </div>
      </section>
    </main>
  )
}
