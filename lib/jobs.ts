export type Job = { id:string; title:string; company:string; logo:string; location:string; country:string; remoteType:string; salary:string; experience:string; skills:string[]; description:string; responsibilities:string[]; requirements:string[]; postedDate:string; matchScore:number; industry:string; jobType:string }
const seeds = [
 ['Senior Software Engineer','TechNova','Austin, TX','Hybrid','$125K – $155K','Senior',['Java','Spring Boot','AWS','React'],'Software Engineering'],
 ['Frontend Developer','Microsoft','Redmond, WA','Hybrid','$105K – $135K','Mid Level',['React','TypeScript','Next.js','Azure'],'Frontend Development'],
 ['Full Stack Developer','Stripe','Remote — US','Remote','$115K – $145K','Mid Level',['JavaScript','React','Node.js','PostgreSQL'],'Full Stack'],
 ['Software Engineer II','Amazon','Seattle, WA','On-site','$125K – $160K','Senior',['Java','AWS','Microservices','Docker'],'Cloud'],
 ['Machine Learning Engineer','Lumina AI','San Francisco, CA','Hybrid','$145K – $180K','Senior',['Python','PyTorch','MLOps','SQL'],'AI/ML'],
 ['Product Designer','Northstar','New York, NY','Remote','$95K – $125K','Mid Level',['Figma','Research','Prototyping','Systems'],'UI/UX'],
 ['DevOps Engineer','Orbit Cloud','Denver, CO','Remote','$120K – $150K','Senior',['Kubernetes','Terraform','AWS','CI/CD'],'DevOps'],
 ['Data Scientist','Signal Works','Chicago, IL','Hybrid','$110K – $140K','Mid Level',['Python','SQL','Statistics','Tableau'],'Data Science'],
 ['Backend Engineer','Vertex Labs','Boston, MA','Hybrid','$118K – $148K','Mid Level',['Go','PostgreSQL','Docker','REST'],'Backend Development'],
 ['Cybersecurity Analyst','Sentinel Group','Washington, DC','On-site','$90K – $120K','Entry Level',['SIEM','Incident Response','Linux','Python'],'Cybersecurity'],
 ['Business Analyst','Brightline','Atlanta, GA','Hybrid','$78K – $105K','Mid Level',['SQL','Analytics','Agile','Excel'],'Business Analyst'],
 ['Cloud Architect','Aether Systems','Remote — US','Remote','$150K – $190K','Lead',['AWS','Azure','Architecture','Security'],'Cloud'],
 ['React Engineer','Pixel Forge','Los Angeles, CA','Remote','$110K – $140K','Mid Level',['React','TypeScript','GraphQL','Jest'],'Frontend Development'],
 ['AI Product Manager','Cortex Labs','Palo Alto, CA','Hybrid','$135K – $175K','Lead',['AI','Roadmaps','Strategy','Agile'],'Product Management'],
 ['QA Automation Engineer','QualityWorks','Raleigh, NC','Hybrid','$95K – $125K','Mid Level',['Playwright','Cypress','TypeScript','CI/CD'],'Software Engineering'],
 ['Platform Engineer','Cloudline','Portland, OR','Remote','$125K – $165K','Senior',['Kubernetes','Go','Linux','GCP'],'DevOps'],
 ['iOS Engineer','Mosaic Mobile','New York, NY','Hybrid','$115K – $150K','Mid Level',['Swift','SwiftUI','iOS','REST'],'Software Engineering'],
 ['UX Researcher','Human First','Remote — US','Remote','$90K – $120K','Mid Level',['Research','Interviews','Figma','Synthesis'],'UI/UX'],
 ['Engineering Manager','Atlas Labs','San Diego, CA','Hybrid','$165K – $205K','Lead',['Leadership','Java','Distributed Systems','Hiring'],'Software Engineering'],
 ['Data Engineer','Lakehouse Co','Dallas, TX','On-site','$115K – $150K','Senior',['Python','Spark','SQL','Airflow'],'Data Science'],
 ['Product Manager','Launchpad','Miami, FL','Remote','$120K – $160K','Senior',['Discovery','Roadmaps','Analytics','Agile'],'Product Management'],
 ['Security Engineer','Fortify','Remote — US','Remote','$130K – $170K','Senior',['Cloud Security','IAM','Python','SIEM'],'Cybersecurity'],
 ['Java Developer','Blue Oak','New York, NY','Remote','$100K – $135K','Mid Level',['Java','Spring Boot','SQL','AWS'],'Backend Development'],
 ['Junior Web Developer','Civic Digital','Philadelphia, PA','Hybrid','$65K – $85K','Entry Level',['HTML','CSS','JavaScript','React'],'Frontend Development'],
 ['Technical Program Manager','Summit','Seattle, WA','Hybrid','$135K – $175K','Lead',['Program Management','APIs','Agile','Risk'],'Product Management'],
 ['NLP Scientist','Verity AI','Remote — US','Remote','$140K – $185K','Senior',['Python','NLP','Transformers','PyTorch'],'AI/ML'],
 ['Solutions Architect','Harbor Tech','Houston, TX','Hybrid','$125K – $165K','Senior',['AWS','Architecture','APIs','Consulting'],'Cloud'],
 ['Site Reliability Engineer','Relay','Chicago, IL','Remote','$125K – $160K','Senior',['SRE','Kubernetes','Prometheus','Go'],'DevOps'],
 ['Mobile Product Designer','Canvas','Boston, MA','Hybrid','$100K – $135K','Mid Level',['Figma','Mobile','UX','Prototyping'],'UI/UX'],
 ['Operations Analyst','Clearpath','Austin, TX','On-site','$70K – $95K','Entry Level',['SQL','Excel','Reporting','Process'],'Business Analyst'],
]
export const jobs: Job[] = seeds.map((s, i) => { const [title,company,location,remoteType,salary,experience,skills,industry] = s as unknown as [string,string,string,string,string,string,string[],string]; return { id: String(12000+i), title, company, logo: company.slice(0,2).toUpperCase(), location, country:'United States', remoteType, salary, experience, skills, industry, jobType:'Full Time', matchScore: 89 + (i*7)%9, postedDate: `${(i%6)+1} days ago`, description:`Join ${company} and help build products that make a measurable difference. You will work with a thoughtful team on meaningful problems with room to grow.`, responsibilities:['Partner with cross-functional teams to ship high-quality work.','Own projects from discovery through delivery.','Improve systems, processes and the experience for customers.'], requirements:[`${experience} experience in a related role.`, `Strong communication and collaboration skills.`, `Hands-on experience with ${skills[0]} and ${skills[1]}.`] } })
export function getJobById(id:string){ return jobs.find(j=>j.id===id) }
export function searchJobs(query:string, location:string){ const q=query.toLowerCase(); const l=location.toLowerCase(); return jobs.filter(j => (!q || [j.title,j.company,j.industry,...j.skills].join(' ').toLowerCase().includes(q)) && (!l || j.location.toLowerCase().includes(l))) }
export function filterJobs(query:string, location:string, remote:string, experience:string){ return searchJobs(query,location).filter(j => (!remote || j.remoteType===remote) && (!experience || j.experience===experience)) }
export const matchJobs = jobs.slice(0,5)
export function getJobUrl(id:string){ return `/jobs/${id}` }
export function saveJob(jobId:string){ return jobId }
export function applyToJob(jobId:string){ return jobId }
export const demoResumes = ['Master Resume','Software Engineer Resume','Frontend Resume','Full Stack Resume','Data Science Resume']
export const demoApplications = jobs.slice(0,4)
export const demoSavedJobs = jobs.slice(4,7)

export default jobs
