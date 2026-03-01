'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export function useAuthGuard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.replace('/auth/login')
      return
    }
    try {
      setUser(JSON.parse(stored))
    } catch {
      localStorage.removeItem('user')
      router.replace('/auth/login')
      return
    }
    setLoading(false)
  }, [router])

  return { user, loading }
}
