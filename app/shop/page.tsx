'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Heart } from 'lucide-react'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Pet Shop</h1>
          <p className="text-xl text-gray-700">
            Quality products and supplies for all your pet needs
          </p>
        </section>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-orange-100">
          <h2 className="text-lg font-semibold mb-4 text-amber-900">Filter Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Categories</option>
              <option value="food">Food</option>
              <option value="toys">Toys</option>
              <option value="clothing">Clothing</option>
              <option value="bedding">Bedding</option>
              <option value="accessories">Accessories</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Pet Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="rabbit">Rabbits</option>
              <option value="bird">Birds</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Price Range</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100+">$100+</option>
            </select>
            <input
              type="text"
              placeholder="Search products"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <Button className="bg-orange-500 hover:bg-orange-600">Search</Button>
          </div>
        </div>

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Premium Dog Food', price: '$45.99', category: 'Food', rating: 4.8 },
              { name: 'Cozy Pet Bed', price: '$89.99', category: 'Bedding', rating: 4.7 },
              { name: 'Interactive Toy Set', price: '$34.99', category: 'Toys', rating: 4.9 },
              { name: 'Pet Carrier', price: '$129.99', category: 'Accessories', rating: 4.6 },
              { name: 'Grooming Kit', price: '$54.99', category: 'Accessories', rating: 4.8 },
              { name: 'Cat Scratching Post', price: '$99.99', category: 'Furniture', rating: 4.7 },
              { name: 'Treats & Chews', price: '$24.99', category: 'Food', rating: 4.9 },
              { name: 'Leash & Collar', price: '$39.99', category: 'Accessories', rating: 4.8 },
            ].map((product) => (
              <Card key={product.name} className="overflow-hidden border-orange-100 hover:shadow-lg transition">
                <div className="h-40 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center relative">
                  <span className="text-4xl">📦</span>
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-orange-50">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-orange-600">{product.price}</span>
                    <span className="text-sm text-yellow-600">★ {product.rating}</span>
                  </div>
                  <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
