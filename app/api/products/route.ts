import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const petType = searchParams.get('petType')

    let products
    if (category && petType) {
      products = await sql`
        SELECT id, name, description, category, pet_type, price, stock, rating, reviews_count, image_url
        FROM products
        WHERE stock > 0 AND category = ${category} AND pet_type = ${petType}
        ORDER BY rating DESC LIMIT 50
      `
    } else if (category) {
      products = await sql`
        SELECT id, name, description, category, pet_type, price, stock, rating, reviews_count, image_url
        FROM products
        WHERE stock > 0 AND category = ${category}
        ORDER BY rating DESC LIMIT 50
      `
    } else if (petType) {
      products = await sql`
        SELECT id, name, description, category, pet_type, price, stock, rating, reviews_count, image_url
        FROM products
        WHERE stock > 0 AND pet_type = ${petType}
        ORDER BY rating DESC LIMIT 50
      `
    } else {
      products = await sql`
        SELECT id, name, description, category, pet_type, price, stock, rating, reviews_count, image_url
        FROM products
        WHERE stock > 0
        ORDER BY rating DESC LIMIT 50
      `
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
