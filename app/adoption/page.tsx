'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, MapPin, PawPrint } from 'lucide-react'

export default function AdoptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Find Your Perfect Pet</h1>
          <p className="text-xl text-amber-800/70 mb-8">
            Give a loving pet a forever home. Browse available pets and apply for adoption.
          </p>
        </section>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-amber-100">
          <h2 className="text-xl font-semibold mb-4 text-amber-950">Find Your Match</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Pet name or type"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Pet Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="rabbit">Rabbits</option>
              <option value="other">Other</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Ages</option>
              <option value="young">Young (0-2 years)</option>
              <option value="adult">Adult (2-7 years)</option>
              <option value="senior">Senior (7+ years)</option>
            </select>
            <Button className="bg-amber-800 hover:bg-amber-700">Search</Button>
          </div>
        </div>

        {/* Available Pets Grid */}
        <section>
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Available Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: 'Max',
                type: 'Golden Retriever',
                age: '2 years',
                fee: 'Free',
                location: 'Mumbai, Maharashtra',
              },
              {
                id: 2,
                name: 'Luna',
                type: 'Siamese Cat',
                age: '1 year',
                fee: '₹500',
                location: 'Delhi, NCR',
              },
              {
                id: 3,
                name: 'Buddy',
                type: 'Labrador Mix',
                age: '3 years',
                fee: 'Free',
                location: 'Bangalore, Karnataka',
              },
            ].map((pet) => (
              <Card key={pet.id} className="overflow-hidden border-amber-100 hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <PawPrint className="w-12 h-12 text-amber-400/60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-950 mb-2">{pet.name}</h3>
                  <p className="text-amber-700/60 mb-2">{pet.type}</p>
                  <p className="text-sm text-amber-600/50 mb-4">Age: {pet.age}</p>
                  <div className="flex items-center gap-2 text-sm text-amber-700/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    {pet.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-amber-700">{pet.fee}</span>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Apply
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-16 bg-white rounded-lg p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-950 mb-4">Adoption Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Browse Pets', desc: 'Find your perfect match' },
              { step: '2', title: 'Apply', desc: 'Submit your application' },
              { step: '3', title: 'Review', desc: 'We review your profile' },
              { step: '4', title: 'Meet & Adopt', desc: 'Meet and bring home' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-amber-700">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-amber-700/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
