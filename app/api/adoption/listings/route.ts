import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const minAge = searchParams.get('minAge')
    const maxAge = searchParams.get('maxAge')

    let query = `
      SELECT id, name, type, breed, age, gender, description, adoption_fee, image_url, created_at
      FROM adoption_listings
      WHERE available = true
    `

    if (type) {
      query += ` AND type = '${type}'`
    }

    query += ` ORDER BY created_at DESC LIMIT 100`

    const pets = await sql(query)

    return NextResponse.json({ pets })
  } catch (error) {
    console.error('[v0] Error fetching adoption listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch adoption listings' },
      { status: 500 }
    )
  }
}
