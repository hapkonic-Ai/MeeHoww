'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Clock, MapPin, User, Scissors } from 'lucide-react'

// Mock service data - in production, this would come from the API
const MOCK_SERVICES: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Professional Dog Grooming',
    category: 'Grooming',
    price: 1500,
    duration: 60,
    rating: 4.8,
    reviews: 245,
    description: 'Complete grooming service including bath, haircut, nail trim, and ear cleaning.',
    provider: 'Happy Paws Grooming',
    location: 'Mumbai, Maharashtra',
  },
  '2': {
    id: '2',
    name: 'Dog Training Class',
    category: 'Training',
    price: 2500,
    duration: 90,
    rating: 4.9,
    reviews: 189,
    description: 'Professional dog training focusing on obedience, behavior, and socialization.',
    provider: 'Pro Trainers Inc',
    location: 'Delhi, NCR',
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '',
    bookingDate: '',
    bookingTime: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    setSession(user ? JSON.parse(user) : null)
  }, [])

  const service = MOCK_SERVICES[params.id as string]

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-amber-700/60">Service not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          petId: formData.petId || null,
          bookingDate: `${formData.bookingDate}T${formData.bookingTime}`,
          notes: formData.notes,
        }),
      })

      if (!response.ok) throw new Error('Failed to book service')

      // Show success message
      alert('Booking confirmed! Check your dashboard for details.')
      setShowBookingForm(false)
      setFormData({ petId: '', bookingDate: '', bookingTime: '', notes: '' })
    } catch (error) {
      console.error('Error booking service:', error)
      alert('Failed to book service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        {/* Service Header */}
        <Card className="mb-8 border-amber-100">
          <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
            <Scissors className="w-16 h-16 text-amber-400/60" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-amber-600 font-semibold text-sm mb-2">{service.category}</p>
                <h1 className="text-4xl font-bold text-amber-950 mb-2">{service.name}</h1>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-700">₹{service.price}</p>
                <p className="text-sm text-amber-700/60">per appointment</p>
              </div>
            </div>

            <div className="flex gap-6 mb-6 text-amber-800/70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>
                  {service.rating} ({service.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>{service.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>{service.location}</span>
              </div>
            </div>

            <p className="text-amber-800/70 mb-6">{service.description}</p>

            <div className="bg-amber-50/50 p-4 rounded-lg mb-6 border border-amber-100 flex items-start gap-3">
              <User className="w-5 h-5 text-amber-700 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-950">{service.provider}</p>
                <p className="text-sm text-amber-700/60">Professional service provider</p>
              </div>
            </div>

            {session ? (
              <Button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-3"
              >
                {showBookingForm ? 'Cancel Booking' : 'Book Service'}
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/auth/login')}
                className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-3"
              >
                Sign In to Book
              </Button>
            )}
          </div>
        </Card>

        {/* Booking Form */}
        {showBookingForm && (
          <Card className="p-8 border-amber-100 mb-8">
            <h2 className="text-2xl font-bold text-amber-950 mb-6">Book This Service</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Select Pet (Optional)
                  </label>
                  <select
                    value={formData.petId}
                    onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Choose a pet</option>
                    <option value="pet1">Max - Golden Retriever</option>
                    <option value="pet2">Luna - Siamese Cat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.bookingDate}
                    onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    value={formData.bookingTime}
                    onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-800/70">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or information..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-amber-800/70 mb-2">
                  <strong>Service Cost:</strong> ₹{service.price}
                </p>
                <p className="text-xs text-amber-700/60">
                  Duration: {service.duration} minutes
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-800 hover:bg-amber-700"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Service Reviews Section */}
        <Card className="p-8 border-amber-100">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[
              {
                reviewer: 'Sarah M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Excellent service! My dog Max loves coming here. The staff is friendly and professional.',
              },
              {
                reviewer: 'John D.',
                rating: 4,
                date: '1 month ago',
                text: 'Great grooming service. Very attentive to my dog\'s needs. Would recommend!',
              },
            ].map((review, index) => (
              <div key={index} className="pb-6 border-b border-amber-100 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-amber-950">{review.reviewer}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-amber-800/70">{review.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
