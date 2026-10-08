export type CandidateStatus = 'NEW' | 'PROFILE REVIEW' | 'ACTIVE' | 'JOB SEARCH' | 'APPLICATIONS' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'ON HOLD' | 'CLOSED'
export type Candidate = { candidateId:string; enrollmentId:string; fullName:string; email:string; phone:string; country:string; targetJob:string; targetRole:string; preferredLocation:string; workMode:string; experience:string; skills:string[]; resume:{name:string;size:number;type:string}|null; careerGoal:string; enrollmentDate:string; status:CandidateStatus; lastUpdated:string; activities:{date:string;activity:string;actor:string}[]; notes:{date:string;note:string;actor:string}[] }
export type CandidateInput = Omit<Candidate,'candidateId'|'enrollmentId'|'enrollmentDate'|'lastUpdated'|'status'|'activities'|'notes'>
export const candidateStatuses:CandidateStatus[]=['NEW','PROFILE REVIEW','ACTIVE','JOB SEARCH','APPLICATIONS','INTERVIEW','OFFER','HIRED','ON HOLD','CLOSED']
export const countries=['India','United States','United Kingdom','Canada','Australia','Germany','Other']
export const roles=['Internship','Entry Level','Junior','Mid Level','Senior','Lead','Manager']
export const workModes=['Remote','Hybrid','On-site','Open to all']
export const experiences=['Fresher','0–1 years','1–3 years','3–5 years','5–8 years','8+ years']
