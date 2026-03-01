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
    const applications = await sql`
      SELECT
        id, pet_id, status, created_at, updated_at,
        (SELECT name FROM adoption_listings WHERE id = pet_id) as pet_name
      FROM adoption_applications
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
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
    const {
      petId,
      homeType,
      homeOwnership,
      hasYard,
      numberOfPets,
      numberOfChildren,
      adoptionReason,
      experience,
      veterinarian,
      references,
    } = await request.json()

    if (!petId) {
      return NextResponse.json(
        { error: 'Pet ID is required' },
        { status: 400 }
      )
    }

    const application = await sql`
      INSERT INTO adoption_applications (
        user_id, pet_id, home_type, home_ownership, has_yard,
        number_of_pets, number_of_children, adoption_reason,
        experience, veterinarian, references, status, created_at
      )
      VALUES (
        ${session.user.id}, ${petId}, ${homeType || null}, ${homeOwnership || null},
        ${hasYard || false}, ${numberOfPets || 0}, ${numberOfChildren || 0},
        ${adoptionReason || null}, ${experience || null}, ${veterinarian || null},
        ${references || null}, 'pending', NOW()
      )
      RETURNING id, pet_id, status, created_at
    `

    return NextResponse.json(
      { application: application[0], message: 'Application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
