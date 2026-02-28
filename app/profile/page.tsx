'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Mail, Phone, MapPin } from 'lucide-react'

interface UserSession {
  id: string
  name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [session, setSession] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    const userData = JSON.parse(user)
    setSession(userData)
    setFormData(prev => ({ ...prev, name: userData.name, email: userData.email }))
    setLoading(false)
  }, [router])

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
      }))
    }
  }, [session])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle profile update
    setIsEditing(false)
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="p-6 border-orange-100">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-amber-900">{session.user?.name}</h2>
              <p className="text-gray-600 text-sm mt-1">Customer Account</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Account Status</p>
                <p className="text-sm font-semibold text-green-600">Active</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Member Since</p>
                <p className="text-sm font-semibold text-gray-900">2024</p>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-4">
                View Dashboard
              </Button>
            </div>
          </Card>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <Card className="p-8 border-orange-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-amber-900">Contact Information</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Pet Lane"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-orange-100">
                    <Mail className="w-5 h-5 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            {session.name}
          </h1>
          <p className="text-gray-600">{session.email}</p>
        </div>
                  </div>

                  <div className="flex items-center gap-3 pb-4 border-b border-orange-100">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {formData.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">
                        {formData.address || 'Not provided'}
                      </p>
                      {(formData.city || formData.state) && (
                        <p className="text-sm text-gray-600">
                          {formData.city}, {formData.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Additional Sections */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="p-6 border-orange-100">
                <h4 className="font-semibold text-amber-900 mb-2">Pets on Account</h4>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </Card>

              <Card className="p-6 border-orange-100">
                <h4 className="font-semibold text-amber-900 mb-2">Active Bookings</h4>
                <p className="text-3xl font-bold text-orange-600">1</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <Card className="p-6 border-orange-100 mt-8">
          <h3 className="text-xl font-semibold text-amber-900 mb-6">Account Security</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Connected Accounts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Login History
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
