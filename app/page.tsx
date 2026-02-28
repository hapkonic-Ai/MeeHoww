'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Home() {
  const [session, setSession] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    const user = localStorage.getItem('user')
    setSession(user ? JSON.parse(user) : null)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold text-amber-900 mb-4">Your Pet's Complete Ecosystem</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover a unified platform for pet adoption, services, shopping, and emergency care. 
            MEEHOWW connects pet lovers with everything they need.
          </p>
          
          {hydrated && !session && (
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Pet Adoption', description: 'Find your perfect pet companion' },
              { title: 'Services', description: 'Professional grooming, training, and care' },
              { title: 'Pet Shop', description: 'Quality products for your pets' },
              { title: 'Pet Hospital', description: 'Veterinary care and emergency support' },
              { title: 'Fundraising', description: 'Support animal welfare causes' },
              { title: 'Dashboard', description: 'Manage your pet profiles and bookings' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 border border-orange-100 hover:border-orange-300 transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-amber-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
