'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, BriefcaseBusiness, CalendarDays, CheckCircle2, Download, ExternalLink, FileText, Mail, MapPin, Phone, ShieldCheck, UserRound } from 'lucide-react'
import type { Candidate } from '@/lib/candidate-types'

export default function CandidateDetails({ params }: { params: Promise<{ candidateId: string }> }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      const { candidateId } = await params
      try {
        const response = await fetch(`/api/candidates/${candidateId}`, { cache: 'no-store', credentials: 'include', headers: { Accept: 'application/json' } })
        if (response.status === 401) { window.location.replace('/admin/login'); return }
        if (!response.ok) throw new Error()
        const data = await response.json()
        if (active) setCandidate(data)
      } catch { if (active) setError('Unable to load this candidate.') } finally { if (active) setLoading(false) }
    }
    void load()
    return () => { active = false }
  }, [params])

  const resumeUrl = useMemo(() => {
    const resume = candidate?.resume as (Candidate['resume'] & { url?: string }) | null
    return resume?.url || ''
  }, [candidate])

  if (loading) return <main className="admin-shell"><section className="admin-content"><div className="admin-main"><div className="candidate-skeleton"><div /><div /><div /></div></div></section></main>
  if (error || !candidate) return <main className="admin-shell"><section className="admin-content"><div className="admin-main"><div className="admin-state admin-error">{error || 'Candidate not found.'}</div><Link href="/admin/dashboard" className="admin-primary-action">Back to dashboard</Link></div></section></main>

  const initials = candidate.fullName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const profileFields = [
    ['Email', candidate.email, Mail], ['Phone', candidate.phone, Phone], ['Country', candidate.country, MapPin],
    ['Preferred location', candidate.preferredLocation, MapPin], ['Work mode', candidate.workMode, BriefcaseBusiness], ['Experience', candidate.experience, UserRound],
  ] as const
  const statusClass = candidate.status === 'HIRED' ? 'status-positive' : candidate.status === 'NEW' ? 'status-new' : 'status-blue'

  return <main className="admin-shell"><section className="admin-content"><div className="admin-main candidate-detail-page">
    <div className="detail-breadcrumb"><Link href="/admin/dashboard"><ArrowLeft /> Admin Dashboard</Link><span>/</span><Link href="/admin/candidates">Candidates</Link><span>/</span><b>Candidate Details</b></div>
    <div className="detail-heading-row"><div><p className="admin-kicker">CANDIDATE DETAILS</p><h1>{candidate.fullName}</h1><p className="admin-subtitle">Review profile, preferences, and recruitment readiness in one place.</p></div><Link href="/admin/dashboard" className="detail-back"><ArrowLeft /> Back to candidates</Link></div>

    <section className="candidate-hero-card"><div className="candidate-hero-identity"><div className="candidate-avatar detail-avatar">{initials}</div><div><span className={`status-badge ${statusClass}`}>{candidate.status}</span><h2>{candidate.targetJob}</h2><p>{candidate.targetRole} · {candidate.country}</p></div></div><div className="candidate-hero-meta"><span><small>Enrollment ID</small><b>{candidate.enrollmentId}</b></span><span><small>Registered</small><b>{new Date(candidate.enrollmentDate).toLocaleDateString()}</b></span></div></section>

    <div className="detail-grid"><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">PROFILE OVERVIEW</p><h2>Candidate information</h2></div><ShieldCheck /></div><div className="detail-fields">{profileFields.map(([label, value, Icon]) => <div className="detail-field" key={label}><Icon /><span><small>{label}</small><b>{value || 'Not provided'}</b></span></div>)}</div></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">CAREER PROFILE</p><h2>Goals and skills</h2></div><BriefcaseBusiness /></div><div className="detail-copy"><small>Career goal</small><p>{candidate.careerGoal || 'Not provided'}</p><small>Skills</small><div className="skill-list">{candidate.skills.length ? candidate.skills.map((skill) => <span key={skill}>{skill}</span>) : <em>No skills listed</em>}</div></div></section></div>

    <section className="admin-panel resume-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">DOCUMENT CENTER</p><h2>Candidate Resume</h2><p className="panel-helper">View and download the latest resume attached to this profile.</p></div><FileText /></div>{candidate.resume && resumeUrl ? <><div className="resume-viewer"><iframe src={resumeUrl} title={`${candidate.fullName} resume`} /></div><div className="resume-actions"><a className="admin-primary-action" href={resumeUrl} download={candidate.resume.name}><Download /> Download resume</a><a className="admin-secondary-action" href={resumeUrl} target="_blank" rel="noreferrer"><ExternalLink /> Open resume</a></div></> : <div className="resume-empty"><FileText /><div><h3>Resume not available</h3><p>This candidate has not uploaded a resume file yet.</p></div></div>}</section>

    <div className="detail-lower-grid"><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">RECRUITMENT RECORD</p><h2>Profile metadata</h2></div><CalendarDays /></div><div className="metadata-list"><div><small>Last updated</small><b>{new Date(candidate.lastUpdated).toLocaleString()}</b></div><div><small>Application status</small><b>{candidate.status}</b></div><div><small>Target role</small><b>{candidate.targetRole}</b></div></div></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">ACTIVITY</p><h2>Candidate timeline</h2></div><CheckCircle2 /></div>{candidate.activities.length ? <div className="timeline">{candidate.activities.map((activity) => <div key={`${activity.date}-${activity.activity}`}><i /><span><b>{activity.activity}</b><small>{activity.actor} · {new Date(activity.date).toLocaleDateString()}</small></span></div>)}</div> : <div className="timeline-empty">No activity recorded yet.</div>}</section></div>
  </div></section></main>
}
