'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Premium Dog Food', price: 45.99, quantity: 1 },
    { id: '2', name: 'Cozy Pet Bed', price: 89.99, quantity: 1 },
  ])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    setSession(JSON.parse(user))
  }, [router])
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <Card className="p-8 text-center border-orange-100">
            <p className="text-gray-600 mb-4">Please sign in to view your cart</p>
            <Button
              onClick={() => router.push('/auth/login')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Sign In
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const updateQuantity = (id: string, change: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total,
          deliveryAddress,
          notes,
        }),
      })

      if (!response.ok) throw new Error('Failed to place order')

      alert('Order placed successfully! You will receive a confirmation email.')
      setCartItems([])
      router.push('/orders')
    } catch (error) {
      console.error('[v0] Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <Card className="p-8 text-center border-orange-100">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Button
                  onClick={() => router.push('/shop')}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Continue Shopping
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6 border-orange-100">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg flex items-center justify-center text-3xl">
                        📦
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900">{item.name}</h3>
                        <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="hover:text-orange-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="hover:text-orange-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="p-6 border-orange-100 mb-6 sticky top-4">
                <h2 className="text-xl font-semibold text-amber-900 mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6 pb-6 border-b border-orange-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-orange-600 mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </Card>

              <Card className="p-6 border-orange-100">
                <h2 className="text-lg font-semibold text-amber-900 mb-4">Delivery Info</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Delivery Address *
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/shop')}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </form>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
