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
    const appointments = await sql`
      SELECT id, pet_id, appointment_date, service_type, notes, status, created_at
      FROM hospital_appointments
      WHERE user_id = ${session.user.id}
      ORDER BY appointment_date DESC
    `

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
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
    const { petId, appointmentDate, serviceType, notes } = await request.json()

    if (!petId || !appointmentDate || !serviceType) {
      return NextResponse.json(
        { error: 'Pet ID, appointment date, and service type are required' },
        { status: 400 }
      )
    }

    const appointment = await sql`
      INSERT INTO hospital_appointments (user_id, pet_id, appointment_date, service_type, notes, status, created_at)
      VALUES (${session.user.id}, ${petId}, ${appointmentDate}, ${serviceType}, ${notes || null}, 'pending', NOW())
      RETURNING id, pet_id, appointment_date, service_type, status, created_at
    `

    return NextResponse.json(
      { appointment: appointment[0], message: 'Appointment booked successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error booking appointment:', error)
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    )
  }
}
