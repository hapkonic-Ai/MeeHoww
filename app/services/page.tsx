'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Star, MapPin, Scissors } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Pet Services</h1>
          <p className="text-xl text-amber-800/70">
            Professional grooming, training, and pet care services for your furry friends
          </p>
        </section>

        {/* Services Grid */}
        <section>
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Browse Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Grooming', price: '₹500-2,000', rating: 4.8, reviews: 245 },
              { name: 'Training', price: '₹1,000-3,000', rating: 4.9, reviews: 189 },
              { name: 'Pet Sitting', price: '₹500-1,000/day', rating: 4.7, reviews: 312 },
              { name: 'Dog Walking', price: '₹300-500/walk', rating: 4.8, reviews: 428 },
              { name: 'Boarding', price: '₹800-1,500/night', rating: 4.6, reviews: 156 },
              { name: 'Veterinary Care', price: 'Varies', rating: 4.9, reviews: 267 },
            ].map((service) => (
              <Card key={service.name} className="p-6 border-amber-100 hover:shadow-lg transition">
                <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center">
                  <Scissors className="w-10 h-10 text-amber-400/60" />
                </div>
                <h3 className="text-xl font-semibold text-amber-950 mb-2">{service.name}</h3>
                <p className="text-lg font-bold text-amber-700 mb-3">{service.price}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(service.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-amber-700/60">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
                <Button className="w-full bg-amber-800 hover:bg-amber-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Service
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Top Service Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Happy Paws Grooming', services: 3, verified: true },
              { name: 'Pro Trainers Inc', services: 4, verified: true },
              { name: 'Pet Care Plus', services: 5, verified: true },
            ].map((provider) => (
              <Card key={provider.name} className="p-6 border-amber-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-950">{provider.name}</h3>
                    {provider.verified && (
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded mt-1 inline-block">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-amber-700/60 mb-4">{provider.services} services available</p>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
