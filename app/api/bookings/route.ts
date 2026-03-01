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
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let bookings
    if (status) {
      bookings = await sql`
        SELECT
          b.id, b.service_id, b.pet_id, b.booking_date, b.status, b.notes, b.created_at,
          s.name as service_name, s.price, s.category,
          p.name as pet_name
        FROM service_bookings b
        JOIN services s ON b.service_id = s.id
        LEFT JOIN pets p ON b.pet_id = p.id
        WHERE b.user_id = ${session.user.id} AND b.status = ${status}
        ORDER BY b.booking_date DESC
      `
    } else {
      bookings = await sql`
        SELECT
          b.id, b.service_id, b.pet_id, b.booking_date, b.status, b.notes, b.created_at,
          s.name as service_name, s.price, s.category,
          p.name as pet_name
        FROM service_bookings b
        JOIN services s ON b.service_id = s.id
        LEFT JOIN pets p ON b.pet_id = p.id
        WHERE b.user_id = ${session.user.id}
        ORDER BY b.booking_date DESC
      `
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
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
    const { serviceId, petId, bookingDate, notes } = await request.json()

    if (!serviceId || !bookingDate) {
      return NextResponse.json(
        { error: 'Service ID and booking date are required' },
        { status: 400 }
      )
    }

    const booking = await sql`
      INSERT INTO service_bookings (user_id, service_id, pet_id, booking_date, status, notes, created_at)
      VALUES (${session.user.id}, ${serviceId}, ${petId || null}, ${bookingDate}, 'pending', ${notes || null}, NOW())
      RETURNING id, service_id, pet_id, booking_date, status, notes, created_at
    `

    return NextResponse.json(
      { booking: booking[0], message: 'Booking created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
