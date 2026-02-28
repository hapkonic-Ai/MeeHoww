import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('type')

    let query = `
      SELECT id, name, description, category, price, duration_minutes, provider_id, rating, reviews_count
      FROM services
    `

    if (serviceType) {
      query += ` WHERE category = '${serviceType}'`
    }

    query += ` ORDER BY rating DESC`

    const services = await sql(query)

    return NextResponse.json({ services })
  } catch (error) {
    console.error('[v0] Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, category, price, durationMinutes, providerId } =
      await request.json()

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: 'Name, category, and price are required' },
        { status: 400 }
      )
    }

    const service = await sql`
      INSERT INTO services (name, description, category, price, duration_minutes, provider_id, created_at)
      VALUES (${name}, ${description || null}, ${category}, ${price}, ${durationMinutes || null}, ${providerId || null}, NOW())
      RETURNING id, name, description, category, price, duration_minutes
    `

    return NextResponse.json(
      { service: service[0], message: 'Service created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
