'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Settings, LogOut } from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    setSession(JSON.parse(user))
    setLoading(false)
  }, [router])

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

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Welcome Section with User Menu */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-2">
              Welcome, {session.name}!
            </h2>
            <p className="text-gray-600">Manage your pets, bookings, and preferences</p>
          </div>
          <div className="flex gap-2">
            <Link href="/profile">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/pets">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">My Pets</h3>
              <p className="text-gray-600 mb-4">View and manage your pet profiles</p>
              <Button variant="outline" className="w-full">
                View Pets
              </Button>
            </Card>
          </Link>

          <Link href="/services">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Services</h3>
              <p className="text-gray-600 mb-4">Book grooming, training, and care services</p>
              <Button variant="outline" className="w-full">
                Browse Services
              </Button>
            </Card>
          </Link>

          <Link href="/adoption">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Adoption</h3>
              <p className="text-gray-600 mb-4">Find adoptable pets and apply for adoption</p>
              <Button variant="outline" className="w-full">
                Browse Pets
              </Button>
            </Card>
          </Link>

          <Link href="/shop">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Pet Shop</h3>
              <p className="text-gray-600 mb-4">Shop for pet products and supplies</p>
              <Button variant="outline" className="w-full">
                Browse Products
              </Button>
            </Card>
          </Link>

          <Link href="/hospital">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Pet Hospital</h3>
              <p className="text-gray-600 mb-4">Emergency care and veterinary services</p>
              <Button variant="outline" className="w-full">
                Get Help
              </Button>
            </Card>
          </Link>

          <Link href="/fundraising">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer border-orange-100">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Fundraising</h3>
              <p className="text-gray-600 mb-4">Support animal welfare campaigns</p>
              <Button variant="outline" className="w-full">
                View Campaigns
              </Button>
            </Card>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6">Recent Activity</h3>
          <Card className="p-6 bg-white border-orange-100">
            <p className="text-gray-600">Your recent bookings and activities will appear here</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
