'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, Phone, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthGuard } from '@/hooks/use-auth-guard'

interface EmergencyRequest {
  id: string
  pet_id: string
  emergency_type: string
  description: string
  status: 'pending' | 'en-route' | 'arrived' | 'resolved'
  location: string
  created_at: string
}

export default function EmergencyPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuthGuard()
  const [requests, setRequests] = useState<EmergencyRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    petId: '',
    emergencyType: '',
    description: '',
    currentLocation: '',
  })

  useEffect(() => {
    if (user) {
      fetchRequests()
    }
  }, [user])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/hospital/emergency')
      const data = await response.json()
      setRequests(data.requests || [])
    } catch (error) {
      console.error('Error fetching emergency requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/hospital/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit emergency request')

      const data = await response.json()
      alert(data.message || 'Emergency request submitted! Help is on the way!')
      setShowForm(false)
      setFormData({
        petId: '',
        emergencyType: '',
        description: '',
        currentLocation: '',
      })
      fetchRequests()
    } catch (error) {
      console.error('Error submitting emergency request:', error)
      alert('Failed to submit emergency request. Please call us directly at 1800-123-PETS')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50/50 to-white">
        <div className="animate-pulse text-amber-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Emergency Alert Banner */}
        <Card className="p-6 mb-8 border-red-200 bg-red-50">
          <div className="flex gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-red-900 mb-2">Pet Emergency Service</h2>
              <p className="text-red-800 mb-3">
                Our veterinary team is available 24/7 for emergency care. If your pet needs
                immediate help, submit an emergency request below or call our hotline.
              </p>
              <div className="flex gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call: 1800-123-PETS
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Request Form */}
        {!showForm ? (
          <div className="mb-8">
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-6 h-6" />
              REQUEST EMERGENCY ASSISTANCE NOW
            </Button>
          </div>
        ) : (
          <Card className="p-8 mb-8 border-red-200 bg-white">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Emergency Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Pet Name *
                  </label>
                  <select
                    value={formData.petId}
                    onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select your pet</option>
                    <option value="pet1">Max - Golden Retriever</option>
                    <option value="pet2">Luna - Siamese Cat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800/70">
                    Emergency Type *
                  </label>
                  <select
                    value={formData.emergencyType}
                    onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select emergency type</option>
                    <option value="trauma">Trauma/Injury</option>
                    <option value="bleeding">Severe Bleeding</option>
                    <option value="breathing">Difficulty Breathing</option>
                    <option value="poisoning">Poisoning/Toxin</option>
                    <option value="seizure">Seizures</option>
                    <option value="unconscious">Unconscious/Unresponsive</option>
                    <option value="other">Other Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-800/70">
                  Current Location *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    placeholder="Street address or location description"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <Button variant="outline" type="button" className="px-4">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-800/70">
                  Describe the Emergency *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please describe what happened and the pet's current condition..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-amber-800/70"
                  required
                />
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Our emergency team will contact you immediately after
                  submitting this form. Please ensure your phone number is current in your profile.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {isSubmitting ? 'Submitting Emergency Request...' : 'Submit Emergency Request'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Previous Emergency Requests */}
        {requests.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-amber-950 mb-6">Emergency History</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="p-6 border-amber-100 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-amber-950 capitalize">
                          {request.emergency_type}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : request.status === 'en-route'
                                ? 'bg-blue-100 text-blue-800'
                                : request.status === 'arrived'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {request.status.toUpperCase().replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-amber-700/60">
                      {new Date(request.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-amber-800/70 mb-3">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">{request.location}</span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                    <p className="text-amber-800/70">{request.description}</p>
                  </div>

                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
