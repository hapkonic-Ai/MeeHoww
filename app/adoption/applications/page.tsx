'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react'

interface Application {
  id: string
  pet_id: string
  pet_name: string
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn'
  created_at: string
  updated_at: string
}

export default function AdoptionApplicationsPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [applications, setApplications] = useState<Application[]>([])
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



  useEffect(() => {
    if (session) {
      fetchApplications()
    }
  }, [session])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/adoption/applications')
      const data = await response.json()
      setApplications(data.applications || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'withdrawn':
        return <FileText className="w-5 h-5 text-amber-700/60" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      withdrawn: 'bg-gray-100 text-gray-800',
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
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
        <h1 className="text-3xl font-bold text-amber-950 mb-2">My Adoption Applications</h1>
        <p className="text-amber-700/60 mb-8">Track the status of your adoption applications</p>

        {loading ? (
          <p className="text-amber-700/60">Loading applications...</p>
        ) : applications.length === 0 ? (
          <Card className="p-8 text-center border-amber-100">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-amber-700/60 mb-4">You haven't submitted any adoption applications yet</p>
            <Button
              onClick={() => router.push('/adoption')}
              className="bg-amber-800 hover:bg-amber-700"
            >
              Browse Adoptable Pets
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card
                key={app.id}
                className="p-6 border-amber-100 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-amber-950">
                        Application for {app.pet_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700/60 mt-1">
                      Applied on{' '}
                      {new Date(app.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-700/60">Application ID</p>
                      <p className="font-semibold text-gray-900">
                        {app.id.substring(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-700/60">Last Updated</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(app.updated_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Your application is being reviewed. We'll contact you within 5-7 business days.
                    </p>
                  </div>
                )}

                {app.status === 'approved' && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Congratulations! Your application has been approved. Please check your email for next steps.
                    </p>
                  </div>
                )}

                {app.status === 'rejected' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      Unfortunately, your application was not approved. Please contact us for more information.
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  {app.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit Application
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 hover:bg-red-50"
                      >
                        Withdraw
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
