'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Star, MapPin } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Pet Services</h1>
          <p className="text-xl text-gray-700">
            Professional grooming, training, and pet care services for your furry friends
          </p>
        </section>

        {/* Services Grid */}
        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Browse Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Grooming', price: '$50-100', rating: 4.8, reviews: 245 },
              { name: 'Training', price: '$75-150', rating: 4.9, reviews: 189 },
              { name: 'Pet Sitting', price: '$30-50/day', rating: 4.7, reviews: 312 },
              { name: 'Dog Walking', price: '$25-40/walk', rating: 4.8, reviews: 428 },
              { name: 'Boarding', price: '$40-60/night', rating: 4.6, reviews: 156 },
              { name: 'Veterinary Care', price: 'Varies', rating: 4.9, reviews: 267 },
            ].map((service) => (
              <Card key={service.name} className="p-6 border-orange-100 hover:shadow-lg transition">
                <div className="h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🐕</span>
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{service.name}</h3>
                <p className="text-lg font-bold text-orange-600 mb-3">{service.price}</p>
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
                  <span className="text-sm text-gray-600">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Service
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Top Service Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Happy Paws Grooming', services: 3, verified: true },
              { name: 'Pro Trainers Inc', services: 4, verified: true },
              { name: 'Pet Care Plus', services: 5, verified: true },
            ].map((provider) => (
              <Card key={provider.name} className="p-6 border-orange-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">{provider.name}</h3>
                    {provider.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-1 inline-block">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{provider.services} services available</p>
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
