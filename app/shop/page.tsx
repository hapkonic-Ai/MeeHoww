'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Heart } from 'lucide-react'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Pet Shop</h1>
          <p className="text-xl text-amber-800/70">
            Quality products and supplies for all your pet needs
          </p>
        </section>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-amber-100">
          <h2 className="text-lg font-semibold mb-4 text-amber-950">Filter Products</h2>
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
              <option value="0-500">₹0 - ₹500</option>
              <option value="500-1000">₹500 - ₹1,000</option>
              <option value="1000-3000">₹1,000 - ₹3,000</option>
              <option value="3000+">₹3,000+</option>
            </select>
            <input
              type="text"
              placeholder="Search products"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <Button className="bg-amber-800 hover:bg-amber-700">Search</Button>
          </div>
        </div>

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Premium Dog Food', price: '₹2,499', category: 'Food', rating: 4.8 },
              { name: 'Cozy Pet Bed', price: '₹3,999', category: 'Bedding', rating: 4.7 },
              { name: 'Interactive Toy Set', price: '₹1,299', category: 'Toys', rating: 4.9 },
              { name: 'Pet Carrier', price: '₹4,999', category: 'Accessories', rating: 4.6 },
              { name: 'Grooming Kit', price: '₹1,999', category: 'Accessories', rating: 4.8 },
              { name: 'Cat Scratching Post', price: '₹2,999', category: 'Furniture', rating: 4.7 },
              { name: 'Treats & Chews', price: '₹599', category: 'Food', rating: 4.9 },
              { name: 'Leash & Collar', price: '₹899', category: 'Accessories', rating: 4.8 },
            ].map((product) => (
              <Card key={product.name} className="overflow-hidden border-amber-100 hover:shadow-lg transition">
                <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative">
                  <ShoppingCart className="w-10 h-10 text-amber-400/60" />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-amber-50">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-amber-950 mb-1">{product.name}</h3>
                  <p className="text-xs text-amber-600/50 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-amber-700">{product.price}</span>
                    <span className="text-sm text-amber-600">★ {product.rating}</span>
                  </div>
                  <Button size="sm" className="w-full bg-amber-800 hover:bg-amber-700 flex items-center justify-center gap-2">
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
