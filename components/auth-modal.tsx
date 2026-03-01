'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { PawPrint } from 'lucide-react'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: 'login' | 'signup'
}

export function AuthModal({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) setTab(defaultTab)
  }, [open, defaultTab])
  const [loading, setLoading] = useState(false)

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup fields
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')

  const resetForm = () => {
    setError('')
    setLoginEmail('')
    setLoginPassword('')
    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirm('')
  }

  const switchTab = (newTab: 'login' | 'signup') => {
    setTab(newTab)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      resetForm()
      onOpenChange(false)
      window.location.reload()
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match')
      return
    }
    if (signupPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, password: signupPassword, name: signupName }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create account')
        return
      }

      // Auto-login after signup
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      })

      if (loginRes.ok) {
        const loginData = await loginRes.json()
        localStorage.setItem('user', JSON.stringify(loginData.user))
        resetForm()
        onOpenChange(false)
        window.location.reload()
      } else {
        // Signup succeeded but auto-login failed - switch to login tab
        switchTab('login')
        setError('')
        setLoginEmail(signupEmail)
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v) }}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-amber-200">
        {/* Header */}
        <div className="pt-8 pb-4 px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-2.5 bg-amber-800 rounded-xl">
              <PawPrint className="w-6 h-6 text-amber-200" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-amber-950 text-center">
              {tab === 'login' ? 'Welcome Back' : 'Join MEEHOWW'}
            </DialogTitle>
            <DialogDescription className="text-amber-700/60 text-center">
              {tab === 'login'
                ? 'Sign in to your pet ecosystem'
                : 'Create your free account'}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Tab Switcher */}
        <div className="flex mx-8 bg-amber-50 rounded-lg p-1">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              tab === 'login'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-amber-600/70 hover:text-amber-800'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => switchTab('signup')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              tab === 'signup'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-amber-600/70 hover:text-amber-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        <div className="px-8 pb-8 pt-4">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Email</label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Password</label>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-700 text-amber-50"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Full Name</label>
                <Input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Email</label>
                <Input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Password</label>
                <Input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-amber-800/70">Confirm Password</label>
                <Input
                  type="password"
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  disabled={loading}
                  className="border-amber-200 focus-visible:ring-amber-400"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-700 text-amber-50"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
