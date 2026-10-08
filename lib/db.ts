import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const globalForDb = globalThis as typeof globalThis & { __endurePool?: Pool }
export const pool = globalForDb.__endurePool ?? new Pool({ connectionString: process.env.DATABASE_URL })
if (process.env.NODE_ENV !== 'production') globalForDb.__endurePool = pool
export const db = drizzle(pool)
