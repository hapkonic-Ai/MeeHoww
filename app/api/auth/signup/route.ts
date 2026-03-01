import { NextRequest, NextResponse } from "next/server"
import { getDb } from '@/lib/db'
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await sql`
      INSERT INTO users (email, password_hash, name, role, created_at)
      VALUES (${email}, ${hashedPassword}, ${name}, 'customer', NOW())
      RETURNING id, email, name, role
    `

    return NextResponse.json(
      { user: user[0], message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
