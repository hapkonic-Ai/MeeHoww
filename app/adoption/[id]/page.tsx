'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, MapPin, Calendar, Home } from 'lucide-react'

// Mock adoption pets - in production, this would come from the API
const MOCK_PETS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Male',
    adoptionFee: 0,
    description:
      'Max is a friendly and energetic Golden Retriever looking for an active family. He loves playing fetch and meeting other dogs. Max is fully vaccinated and house-trained.',
    location: 'New York, NY',
    story:
      'Max was rescued from a difficult situation and has blossomed into a loving companion. He deserves a forever home with an active family.',
  },
  '2': {
    id: '2',
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: '1 year',
    gender: 'Female',
    adoptionFee: 50,
    description:
      'Luna is a beautiful Siamese cat with striking blue eyes. She is affectionate, playful, and loves interactive toys. Luna is microchipped and up-to-date on all vaccinations.',
    location: 'Los Angeles, CA',
    story:
      'Luna was found as a stray and has been in our care for 3 months. She is now ready to find a loving home where she can be cherished.',
  },
}

export default function AdoptionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    homeType: '',
    homeOwnership: '',
    hasYard: false,
    numberOfPets: '0',
    numberOfChildren: '0',
    adoptionReason: '',
    experience: '',
    veterinarian: '',
    references: '',
  })

  const pet = MOCK_PETS[params.id as string]

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-gray-600">Pet not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/adoption/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petId: pet.id,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit application')

      alert('Application submitted! We will review it and contact you soon.')
      setShowForm(false)
    } catch (error) {
      console.error('[v0] Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pet Image & Info */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden mb-6 border-orange-100">
              <div className="h-96 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-9xl">
                {pet.type === 'Dog' ? '🐕' : '🐈'}
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-amber-900 mb-2">{pet.name}</h1>
                    <p className="text-xl text-gray-700">{pet.breed}</p>
                  </div>
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Save
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-orange-100">
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold text-amber-900">{pet.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-amber-900">{pet.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Adoption Fee</p>
                    <p className="font-semibold text-amber-900">
                      {pet.adoptionFee === 0 ? 'Free' : `$${pet.adoptionFee}`}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-amber-900 mb-3">About {pet.name}</h2>
                  <p className="text-gray-700 mb-4">{pet.description}</p>
                </div>

                <div className="mb-6 bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-amber-900 mb-2">{pet.name}'s Story</h3>
                  <p className="text-gray-700">{pet.story}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-700 mb-6">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{pet.location}</span>
                </div>

                {session ? (
                  <Button
                    onClick={() => setShowForm(!showForm)}
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    {showForm ? 'Cancel Application' : 'Apply for Adoption'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push('/auth/login')}
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Sign In to Apply
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Adoption Application Form */}
          <div>
            {showForm && (
              <Card className="p-6 border-orange-100 sticky top-4">
                <h2 className="text-xl font-bold text-amber-900 mb-6">Adoption Application</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Home Type *
                    </label>
                    <select
                      value={formData.homeType}
                      onChange={(e) => setFormData({ ...formData, homeType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="farm">Farm</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Home Ownership *
                    </label>
                    <select
                      value={formData.homeOwnership}
                      onChange={(e) =>
                        setFormData({ ...formData, homeOwnership: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="own">Own</option>
                      <option value="rent">Rent</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.hasYard}
                        onChange={(e) => setFormData({ ...formData, hasYard: e.target.checked })}
                        className="rounded"
                      />
                      Has Yard
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Number of Pets
                    </label>
                    <input
                      type="number"
                      value={formData.numberOfPets}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfPets: e.target.value })
                      }
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Number of Children
                    </label>
                    <input
                      type="number"
                      value={formData.numberOfChildren}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfChildren: e.target.value })
                      }
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Why do you want to adopt?
                    </label>
                    <textarea
                      value={formData.adoptionReason}
                      onChange={(e) =>
                        setFormData({ ...formData, adoptionReason: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Pet Experience
                    </label>
                    <textarea
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
