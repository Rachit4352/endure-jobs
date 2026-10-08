import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'
import type { Candidate, CandidateInput } from '@/lib/candidate-types'
export type { Candidate, CandidateInput, CandidateStatus } from '@/lib/candidate-types'

const toCandidate = (row: any): Candidate => ({ candidateId: row.id, enrollmentId: row.enrollment_id, fullName: row.full_name, email: row.email, phone: row.phone, country: row.country, targetJob: row.target_job, targetRole: row.target_role, preferredLocation: row.preferred_location, workMode: row.work_mode, experience: row.experience, skills: row.skills ?? [], resume: row.resume, careerGoal: row.career_goal, enrollmentDate: new Date(row.enrollment_date).toISOString(), status: row.status, lastUpdated: new Date(row.last_updated).toISOString(), activities: [], notes: [] })
export const candidateStore = {
  async list() { const result = await db.execute(sql`SELECT id, enrollment_id, full_name, email, phone, country, target_job, target_role, preferred_location, work_mode, experience, skills, resume, career_goal, enrollment_date, status, last_updated FROM candidates WHERE deleted_at IS NULL ORDER BY enrollment_date DESC`); return result.rows.map(toCandidate) },
  async getById(id: string) { const result = await db.execute(sql`SELECT id, enrollment_id, full_name, email, phone, country, target_job, target_role, preferred_location, work_mode, experience, skills, resume, career_goal, enrollment_date, status, last_updated FROM candidates WHERE id = ${id} AND deleted_at IS NULL LIMIT 1`); return result.rows[0] ? toCandidate(result.rows[0]) : null },
  async add(input: CandidateInput) {
    const id = crypto.randomUUID()
    const enrollmentId = `EJ-${new Date().getFullYear()}-${id.slice(0, 8).toUpperCase()}`
    const skills = input.skills.length ? sql`ARRAY[${sql.join(input.skills.map((skill) => sql`${skill}`), sql`, `)}]::text[]` : sql`ARRAY[]::text[]`
    const result = await db.execute(sql`INSERT INTO candidates (id, enrollment_id, full_name, email, phone, country, target_job, target_role, preferred_location, work_mode, experience, skills, resume, career_goal) VALUES (${id}, ${enrollmentId}, ${input.fullName}, ${input.email}, ${input.phone}, ${input.country}, ${input.targetJob}, ${input.targetRole}, ${input.preferredLocation}, ${input.workMode}, ${input.experience}, ${skills}, ${input.resume ? JSON.stringify(input.resume) : null}::jsonb, ${input.careerGoal}) RETURNING id, enrollment_id, full_name, email, phone, country, target_job, target_role, preferred_location, work_mode, experience, skills, resume, career_goal, enrollment_date, status, last_updated`)
    return toCandidate(result.rows[0])
  }
}
export const isCandidateInput=(value:unknown):value is CandidateInput=>{if(!value||typeof value!=='object')return false;const v=value as Record<string,unknown>;return ['fullName','email','phone','country','targetJob','targetRole'].every(k=>typeof v[k]==='string'&&v[k])}
