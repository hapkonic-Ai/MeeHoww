'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface Booking {
  id: string
  service_name: string
  pet_name?: string
  booking_date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: number
  category: string
  notes?: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    setSession(JSON.parse(user))
    fetchBookings()
  }, [router])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredBookings =
    filter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filter)

  if (loading && !bookings.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-950 mb-2">My Bookings</h1>
          <p className="text-amber-700/60">View and manage your service bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['all', 'pending', 'confirmed', 'completed'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
              className={
                filter === f ? 'bg-amber-800 hover:bg-amber-700' : ''
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <p className="text-amber-700/60">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <Card className="p-8 text-center border-amber-100">
            <p className="text-amber-700/60 mb-4">
              {filter === 'all'
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings`}
            </p>
            <Button
              onClick={() => router.push('/services')}
              className="bg-amber-800 hover:bg-amber-700"
            >
              Browse Services
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="p-6 border-amber-100 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-amber-950">
                        {booking.service_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700/60 mt-1">
                      {booking.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-700">
                      ₹{booking.price}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-amber-100">
                  <div className="flex items-center gap-3 text-amber-800/70">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600/50">Date</p>
                      <p className="font-semibold">
                        {new Date(booking.booking_date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-amber-800/70">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600/50">Time</p>
                      <p className="font-semibold">
                        {new Date(booking.booking_date).toLocaleTimeString(
                          'en-US',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {booking.pet_name && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-800/70">
                      <strong>Pet:</strong> {booking.pet_name}
                    </p>
                  </div>
                )}

                {booking.notes && (
                  <div className="mb-4">
                    <p className="text-sm text-amber-700/60 mb-1">
                      <strong>Notes:</strong>
                    </p>
                    <p className="text-sm text-amber-800/70">{booking.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      View Confirmation
                    </Button>
                  )}
                  {booking.status === 'completed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      Leave Review
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
