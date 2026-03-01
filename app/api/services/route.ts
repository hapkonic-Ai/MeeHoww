import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('type')

    let services
    if (serviceType) {
      services = await sql`
        SELECT id, name, description, category, price, duration_minutes, provider_id, rating, reviews_count
        FROM services
        WHERE category = ${serviceType}
        ORDER BY rating DESC
      `
    } else {
      services = await sql`
        SELECT id, name, description, category, price, duration_minutes, provider_id, rating, reviews_count
        FROM services
        ORDER BY rating DESC
      `
    }

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
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
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
