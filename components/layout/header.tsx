'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PawPrint, Menu, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export function Header() {
  const [session, setSession] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    const user = localStorage.getItem('user')
    if (user) {
      setSession(JSON.parse(user))
    }
  }, [])

  const navLinks = [
    { href: '/adoption', label: 'Adoption' },
    { href: '/services', label: 'Services' },
    { href: '/shop', label: 'Pet Shop' },
    { href: '/hospital', label: 'Pet Hospital' },
    { href: '/fundraising', label: 'Fundraising' },
  ]

  return (
    <header className="border-b border-orange-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-amber-900 hidden sm:block">MEEHOWW</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-orange-500 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        {hydrated && (
          <div className="hidden md:flex gap-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">{session.name}</Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem('user')
                    window.location.href = '/'
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white">
          <nav className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-orange-500 px-4 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-orange-100 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      {session.user?.name}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signOut({ redirectTo: '/' })}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
