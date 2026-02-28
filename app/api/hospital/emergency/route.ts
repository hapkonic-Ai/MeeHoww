import { auth } from '@/auth'
import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const requests = await sql`
      SELECT id, pet_id, emergency_type, description, status, location, created_at
      FROM emergency_requests
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC LIMIT 50
    `

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('[v0] Error fetching emergency requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch emergency requests' },
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
    const {
      petId,
      emergencyType,
      description,
      currentLocation,
      petName,
      phoneNumber,
    } = await request.json()

    if (!petId || !emergencyType || !description || !currentLocation) {
      return NextResponse.json(
        { error: 'Pet ID, emergency type, description, and location are required' },
        { status: 400 }
      )
    }

    const emergencyRequest = await sql`
      INSERT INTO emergency_requests (user_id, pet_id, emergency_type, description, location, status, created_at)
      VALUES (${session.user.id}, ${petId}, ${emergencyType}, ${description}, ${currentLocation}, 'pending', NOW())
      RETURNING id, pet_id, emergency_type, status, created_at
    `

    return NextResponse.json(
      {
        emergencyRequest: emergencyRequest[0],
        message: 'Emergency request submitted. Help is on the way!',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error submitting emergency request:', error)
    return NextResponse.json(
      { error: 'Failed to submit emergency request' },
      { status: 500 }
    )
  }
}
