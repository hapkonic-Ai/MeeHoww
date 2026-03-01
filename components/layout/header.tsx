'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PawPrint, Menu, X, LogOut, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { AuthModal } from '@/components/auth-modal'

interface UserData {
  id: string
  name: string
  email: string
  role: string
}

export function Header() {
  const [session, setSession] = useState<UserData | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login')
  const pathname = usePathname()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      try { setSession(JSON.parse(user)) } catch { setSession(null) }
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = useCallback(async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}
    localStorage.removeItem('user')
    window.location.href = '/'
  }, [])

  const navLinks = [
    { href: '/adoption', label: 'Adoption' },
    { href: '/services', label: 'Services' },
    { href: '/shop', label: 'Shop' },
    { href: '/hospital', label: 'Hospital' },
    { href: '/fundraising', label: 'Fundraising' },
  ]

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(180,140,60,0.08)] border-b border-amber-100/60'
            : 'bg-white/60 backdrop-blur-md border-b border-amber-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 bg-amber-800 rounded-lg group-hover:bg-amber-700 transition-colors">
                <PawPrint className="w-5 h-5 text-amber-200" />
              </div>
              <span className="font-heading text-xl font-semibold tracking-wide text-amber-900">
                MEEHOWW
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide uppercase transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-amber-900 bg-amber-100'
                      : 'text-amber-700/60 hover:text-amber-900 hover:bg-amber-100/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-2.5">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-amber-800 hover:text-amber-900 hover:bg-amber-50"
                    >
                      <div className="w-7 h-7 rounded-full bg-amber-800 flex items-center justify-center">
                        <span className="text-[11px] font-semibold text-amber-200">
                          {session.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="text-sm">{session.name}</span>
                    </Button>
                  </Link>
                  <div className="w-px h-5 bg-amber-200" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-1.5 text-amber-600/70 hover:text-red-600 hover:bg-red-50/60 text-sm"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-800 hover:text-amber-900 hover:bg-amber-50 text-sm"
                    onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true) }}
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    className="bg-amber-800 hover:bg-amber-700 text-amber-50 text-sm px-5"
                    onClick={() => { setAuthModalTab('signup'); setAuthModalOpen(true) }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-amber-900/10 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-amber-100 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-amber-700 hover:bg-amber-100/80 hover:text-amber-900'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-amber-300" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-amber-100 space-y-2">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-amber-800 flex items-center justify-center">
                        <span className="text-sm font-semibold text-amber-200">
                          {session.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900">{session.name}</p>
                        <p className="text-xs text-amber-600/70">{session.email}</p>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-amber-600/70 hover:text-red-600 hover:bg-red-50/60 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-amber-200 text-amber-800"
                      size="sm"
                      onClick={() => { setMobileMenuOpen(false); setAuthModalTab('login'); setAuthModalOpen(true) }}
                    >
                      Log in
                    </Button>
                    <Button
                      className="flex-1 bg-amber-800 hover:bg-amber-700 text-amber-50"
                      size="sm"
                      onClick={() => { setMobileMenuOpen(false); setAuthModalTab('signup'); setAuthModalOpen(true) }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </>
  )
}
