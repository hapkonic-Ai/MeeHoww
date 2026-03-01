'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, LogOut, PawPrint, Scissors, Heart, ShoppingBag, Stethoscope, HandHeart } from 'lucide-react'

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      localStorage.removeItem('user')
      router.push('/')
    }
  }

  const quickActions = [
    {
      title: 'My Pets',
      description: 'View and manage your pet profiles',
      buttonText: 'View Pets',
      href: '/pets',
      icon: PawPrint,
    },
    {
      title: 'Services',
      description: 'Book grooming, training, and care services',
      buttonText: 'Browse Services',
      href: '/services',
      icon: Scissors,
    },
    {
      title: 'Adoption',
      description: 'Find adoptable pets and apply for adoption',
      buttonText: 'Browse Pets',
      href: '/adoption',
      icon: Heart,
    },
    {
      title: 'Pet Shop',
      description: 'Shop for pet products and supplies',
      buttonText: 'Browse Products',
      href: '/shop',
      icon: ShoppingBag,
    },
    {
      title: 'Pet Hospital',
      description: 'Emergency care and veterinary services',
      buttonText: 'Get Help',
      href: '/hospital',
      icon: Stethoscope,
    },
    {
      title: 'Fundraising',
      description: 'Support animal welfare campaigns',
      buttonText: 'View Campaigns',
      href: '/fundraising',
      icon: HandHeart,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Welcome Section with User Menu */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-amber-950 mb-2">
              Welcome, {session.name}!
            </h2>
            <p className="text-amber-700/60">Manage your pets, bookings, and preferences</p>
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
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer border-amber-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Icon className="w-5 h-5 text-amber-800" />
                    </div>
                    <h3 className="text-lg font-semibold text-amber-950">{action.title}</h3>
                  </div>
                  <p className="text-amber-700/60 mb-4">{action.description}</p>
                  <Button variant="outline" className="w-full">
                    {action.buttonText}
                  </Button>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-amber-950 mb-6">Recent Activity</h3>
          <Card className="p-6 bg-white border-amber-100">
            <p className="text-amber-700/60">Your recent bookings and activities will appear here</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
