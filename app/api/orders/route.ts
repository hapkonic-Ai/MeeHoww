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
    const orders = await sql`
      SELECT id, total_amount, status, created_at, updated_at
      FROM product_orders
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('[v0] Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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
    const { items, totalAmount, deliveryAddress, notes } = await request.json()

    if (!items || !totalAmount) {
      return NextResponse.json(
        { error: 'Items and total amount are required' },
        { status: 400 }
      )
    }

    const order = await sql`
      INSERT INTO product_orders (user_id, total_amount, status, delivery_address, notes, created_at)
      VALUES (${session.user.id}, ${totalAmount}, 'pending', ${deliveryAddress || null}, ${notes || null}, NOW())
      RETURNING id, total_amount, status, created_at
    `

    return NextResponse.json(
      { order: order[0], message: 'Order created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
