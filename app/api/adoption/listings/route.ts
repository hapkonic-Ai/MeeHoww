import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    let pets
    if (type) {
      pets = await sql`
        SELECT id, name, type, breed, age, gender, description, adoption_fee, image_url, created_at
        FROM adoption_listings
        WHERE available = true AND type = ${type}
        ORDER BY created_at DESC LIMIT 100
      `
    } else {
      pets = await sql`
        SELECT id, name, type, breed, age, gender, description, adoption_fee, image_url, created_at
        FROM adoption_listings
        WHERE available = true
        ORDER BY created_at DESC LIMIT 100
      `
    }

    return NextResponse.json({ pets })
  } catch (error) {
    console.error('Error fetching adoption listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch adoption listings' },
      { status: 500 }
    )
  }
}
