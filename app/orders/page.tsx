'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Order {
  id: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  created_at: string
  updated_at: string
}

export default function OrdersPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [orders, setOrders] = useState<Order[]>([])
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
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('[v0] Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-orange-600" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  if (status === 'loading') {
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

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">View and track your product orders</p>

        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <Card className="p-8 text-center border-orange-100">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Button
              onClick={() => router.push('/shop')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-6 border-orange-100 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-amber-900">
                        Order #{order.id.substring(0, 8).toUpperCase()}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Ordered on{' '}
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Last Updated:</strong>{' '}
                    {new Date(order.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm">
                    <div
                      className={`text-center flex-1 ${
                        ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                          order.status
                        ) >= 0
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="mb-2">Pending</div>
                    </div>
                    <div
                      className={`text-center flex-1 ${
                        ['processing', 'shipped', 'delivered'].indexOf(
                          order.status
                        ) >= 0
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="mb-2">Processing</div>
                    </div>
                    <div
                      className={`text-center flex-1 ${
                        ['shipped', 'delivered'].indexOf(order.status) >= 0
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="mb-2">Shipped</div>
                    </div>
                    <div
                      className={`text-center flex-1 ${
                        order.status === 'delivered'
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="mb-2">Delivered</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Track Order
                  </Button>
                  {order.status === 'delivered' && (
                    <Button size="sm" variant="outline" className="flex-1">
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
