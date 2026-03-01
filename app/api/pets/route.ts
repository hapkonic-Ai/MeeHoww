import { auth } from '@/auth'
import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sql = getDb()
    const pets = await sql`
      SELECT id, name, type, breed, age, gender, image_url, created_at
      FROM pets
      WHERE owner_id = ${session.user.id}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ pets })
  } catch (error) {
    console.error('Error fetching pets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sql = getDb()
    const { name, type, breed, age, gender } = await request.json()

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      )
    }

    const pet = await sql`
      INSERT INTO pets (owner_id, name, type, breed, age, gender, created_at)
      VALUES (${session.user.id}, ${name}, ${type}, ${breed || null}, ${age || null}, ${gender || null}, NOW())
      RETURNING id, name, type, breed, age, gender, created_at
    `

    return NextResponse.json(
      { pet: pet[0], message: 'Pet created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating pet:', error)
    return NextResponse.json(
      { error: 'Failed to create pet' },
      { status: 500 }
    )
  }
}
