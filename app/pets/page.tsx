'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Pet {
  id: string
  name: string
  type: string
  breed?: string
  age?: string
  gender?: string
  created_at: string
}

export default function PetsPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState<Pet[]>([])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900">My Pets</h1>
          <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Pet
          </Button>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.length === 0 ? (
            <Card className="col-span-full p-8 bg-white border-orange-100 text-center">
              <p className="text-gray-600 mb-4">No pets yet. Add your first pet to get started!</p>
              <Button className="bg-orange-500 hover:bg-orange-600">Add Your First Pet</Button>
            </Card>
          ) : (
            pets.map((pet) => (
              <Card key={pet.id} className="p-6 bg-white border-orange-100 hover:border-orange-300 transition">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">{pet.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {pet.type}
                  {pet.breed && ` • ${pet.breed}`}
                  {pet.age && ` • ${pet.age}`}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600">
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
