import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const petType = searchParams.get('petType')

    let query = `
      SELECT id, name, description, category, pet_type, price, stock, rating, reviews_count, image_url
      FROM products
      WHERE stock > 0
    `

    if (category) {
      query += ` AND category = '${category}'`
    }

    if (petType) {
      query += ` AND pet_type = '${petType}'`
    }

    query += ` ORDER BY rating DESC LIMIT 50`

    const products = await sql(query)

    return NextResponse.json({ products })
  } catch (error) {
    console.error('[v0] Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
