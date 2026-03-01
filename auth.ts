import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { getDb } from "@/lib/db"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export async function auth(): Promise<{ user: User } | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) return null

    const sessionData = JSON.parse(sessionCookie.value)
    if (!sessionData?.id) return null

    const sql = getDb()
    const result = await sql`
      SELECT id, email, name, role
      FROM users
      WHERE id = ${sessionData.id}
    `

    if (!result || result.length === 0) return null

    return {
      user: {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        role: result[0].role,
      },
    }
  } catch {
    return null
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const sql = getDb()
    const user = await sql`
      SELECT id, email, name, password_hash, role
      FROM users
      WHERE email = ${email}
    `

    if (!user || user.length === 0) return null

    const userData = user[0]
    const passwordMatch = await bcrypt.compare(password, userData.password_hash)

    if (!passwordMatch) return null

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: string = "customer"
): Promise<User | null> {
  try {
    const sql = getDb()
    const passwordHash = await bcrypt.hash(password, 10)

    const result = await sql`
      INSERT INTO users (email, password_hash, name, role, created_at)
      VALUES (${email}, ${passwordHash}, ${name}, ${role}, NOW())
      RETURNING id, email, name, role
    `

    if (result && result.length > 0) {
      return {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        role: result[0].role,
      }
    }

    return null
  } catch (error) {
    console.error("User creation error:", error)
    return null
  }
}
