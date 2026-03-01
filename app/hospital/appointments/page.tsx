'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Appointment {
  id: string
  pet_id: string
  appointment_date: string
  service_type: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export default function HospitalAppointmentsPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: 'general',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    setSession(JSON.parse(user))
  }, [router])

  useEffect(() => {
    if (session) {
      fetchAppointments()
    }
  }, [session])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/hospital/appointments')
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/hospital/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petId: formData.petId,
          appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}`,
          serviceType: formData.serviceType,
          notes: formData.notes,
        }),
      })

      if (!response.ok) throw new Error('Failed to book appointment')

      alert('Appointment booked successfully! Confirmation has been sent to your email.')
      setShowForm(false)
      setFormData({
        petId: '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: 'general',
        notes: '',
      })
      fetchAppointments()
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Failed to book appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-950 mb-2">Appointments</h1>
            <p className="text-amber-700/60">Schedule and manage your pet's veterinary appointments</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-800 hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </Button>
        </div>

        {/* Booking Form */}
        {showForm && (
          <Card className="p-8 mb-8 border-amber-100">
            <h2 className="text-2xl font-bold text-amber-950 mb-6">Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Select Pet *
                  </label>
                  <select
                    value={formData.petId}
                    onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Choose a pet</option>
                    <option value="pet1">Max - Golden Retriever</option>
                    <option value="pet2">Luna - Siamese Cat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Service Type *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="general">General Check-up</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="dental">Dental Cleaning</option>
                    <option value="surgery">Surgery</option>
                    <option value="grooming">Grooming</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
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
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      setFormData({ ...formData, appointmentTime: e.target.value })
                    }
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
                  placeholder="Any specific concerns or information..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-800 hover:bg-amber-700"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Appointments List */}
        {loading ? (
          <p className="text-amber-700/60">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <Card className="p-8 text-center border-amber-100">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-amber-700/60 mb-4">You don't have any appointments scheduled</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-amber-800 hover:bg-amber-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Your First Appointment
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 border-amber-100 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-amber-950 capitalize">
                        {appointment.service_type}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-amber-100">
                  <div className="flex items-center gap-3 text-amber-800/70">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600/50">Date</p>
                      <p className="font-semibold">
                        {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-amber-800/70">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600/50">Time</p>
                      <p className="font-semibold">
                        {new Date(appointment.appointment_date).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-800/70">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  {appointment.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
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
