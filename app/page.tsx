'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Heart, Scissors, ShoppingBag, Stethoscope, HandHeart,
  PawPrint, ArrowRight, Star, Shield, Clock, Users
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { AuthModal } from '@/components/auth-modal'

function AnimatedSection({ children, className = '', animation = 'animate-fade-up' }: {
  children: React.ReactNode
  className?: string
  animation?: string
}) {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [hydrated, setHydrated] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    setHydrated(true)
    const user = localStorage.getItem('user')
    setSession(user ? JSON.parse(user) : null)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    localStorage.removeItem('user')
    router.push('/')
    setSession(null)
  }

  const features = [
    {
      title: 'Pet Adoption',
      description: 'Give a loving pet their forever home. Browse hundreds of rescue animals waiting for families.',
      icon: Heart,
      href: '/adoption',
      color: 'from-rose-100 to-pink-50',
      iconColor: 'text-rose-500',
    },
    {
      title: 'Pet Services',
      description: 'Professional grooming, training, and pet care from verified experts near you.',
      icon: Scissors,
      href: '/services',
      color: 'from-violet-100 to-purple-50',
      iconColor: 'text-violet-500',
    },
    {
      title: 'Pet Shop',
      description: 'Premium food, toys, accessories and everything your companion needs.',
      icon: ShoppingBag,
      href: '/shop',
      color: 'from-amber-100 to-yellow-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Pet Hospital',
      description: '24/7 veterinary care and emergency support from certified professionals.',
      icon: Stethoscope,
      href: '/hospital',
      color: 'from-emerald-100 to-green-50',
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Fundraising',
      description: 'Support animal welfare causes and help rescue animals find their path to recovery.',
      icon: HandHeart,
      href: '/fundraising',
      color: 'from-sky-100 to-blue-50',
      iconColor: 'text-sky-500',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Pets Adopted', icon: Heart },
    { number: '2,500+', label: 'Service Providers', icon: Users },
    { number: '50,000+', label: 'Happy Families', icon: Star },
    { number: '15+', label: 'Cities in India', icon: Shield },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50/30" />

          {/* Floating Paw Prints */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <PawPrint className="absolute top-20 left-[10%] w-8 h-8 text-amber-200/40 animate-float" />
            <PawPrint className="absolute top-40 right-[15%] w-6 h-6 text-rose-200/40 animate-float delay-500" />
            <PawPrint className="absolute bottom-32 left-[25%] w-10 h-10 text-orange-200/30 animate-float delay-300" />
            <PawPrint className="absolute top-60 right-[30%] w-7 h-7 text-amber-200/30 animate-float delay-700" />
            <PawPrint className="absolute bottom-20 right-[10%] w-9 h-9 text-rose-200/30 animate-float delay-200" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <div className="animate-fade-up">
                  <p className="text-amber-700 font-medium tracking-wide uppercase text-sm mb-4">
                    India&apos;s Premier Pet Platform
                  </p>
                  <h1 className="font-heading text-5xl lg:text-6xl font-bold text-amber-950 leading-[1.1] mb-6">
                    Where Every Pet
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                      Finds Home
                    </span>
                  </h1>
                </div>

                <div className="animate-fade-up delay-200">
                  <p className="text-lg text-amber-800/70 leading-relaxed mb-8 max-w-lg">
                    Discover a complete ecosystem for pet adoption, premium services, curated products, and compassionate care. Built for pet lovers, by pet lovers.
                  </p>
                </div>

                <div className="animate-fade-up delay-300 flex flex-wrap gap-3">
                  {hydrated && !session && (
                    <>
                      <Button
                        size="lg"
                        className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-8 gap-2 text-base"
                        onClick={() => setAuthModalOpen(true)}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Link href="/adoption">
                        <Button size="lg" className="bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 px-8 text-base shadow-sm">
                          Browse Pets
                        </Button>
                      </Link>
                    </>
                  )}
                  {hydrated && session && (
                    <>
                      <Link href="/dashboard">
                        <Button size="lg" className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-8 gap-2 text-base">
                          Go to Dashboard
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/adoption">
                        <Button size="lg" className="bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 px-8 text-base shadow-sm">
                          Browse Pets
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="animate-fade-up delay-500 mt-10 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {['P', 'A', 'R', 'K'].map((letter, i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-300 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-900">{letter}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-amber-700/60">Trusted by 50,000+ pet parents</p>
                  </div>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="hidden lg:flex justify-center animate-fade-in delay-300">
                <div className="relative">
                  {/* Main card */}
                  <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-amber-200 via-orange-100 to-rose-100 shadow-xl shadow-amber-200/30 flex flex-col items-center justify-center p-8">
                    <PawPrint className="w-20 h-20 text-amber-700/30 mb-4 animate-float" />
                    <p className="font-heading text-2xl font-semibold text-amber-900 text-center mb-2">
                      Find Your
                    </p>
                    <p className="font-heading text-3xl font-bold text-amber-800 text-center">
                      Perfect Match
                    </p>
                    <div className="mt-6 flex gap-3">
                      <div className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-medium text-amber-800">Dogs</div>
                      <div className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-medium text-amber-800">Cats</div>
                      <div className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-medium text-amber-800">More</div>
                    </div>
                  </div>

                  {/* Floating mini cards */}
                  <div className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-lg p-4 animate-float delay-200">
                    <Heart className="w-6 h-6 text-rose-400 mb-1" />
                    <p className="text-xs font-semibold text-amber-900">245 Adopted</p>
                    <p className="text-[10px] text-amber-600/60">This Month</p>
                  </div>

                  <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg p-4 animate-float delay-400">
                    <Stethoscope className="w-6 h-6 text-emerald-400 mb-1" />
                    <p className="text-xs font-semibold text-amber-900">24/7 Care</p>
                    <p className="text-[10px] text-amber-600/60">Always Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <AnimatedSection className="py-16 bg-white border-y border-amber-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className={`text-center delay-${(i + 1) * 100}`}>
                    <Icon className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                    <p className="font-heading text-3xl font-bold text-amber-900 mb-1">{stat.number}</p>
                    <p className="text-sm text-amber-700/60">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <p className="text-amber-600 font-medium tracking-wide uppercase text-sm mb-3">Everything Your Pet Needs</p>
              <h2 className="font-heading text-4xl font-bold text-amber-950 mb-4">
                A Complete Pet Ecosystem
              </h2>
              <p className="text-amber-800/60 max-w-2xl mx-auto text-lg">
                From finding your perfect companion to providing them with the best care, we&apos;ve got it all covered.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <AnimatedSection key={feature.title} animation={`animate-fade-up delay-${(i + 1) * 100}`}>
                    <Link href={feature.href}>
                      <div className="group bg-white rounded-2xl p-7 border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-300 cursor-pointer h-full">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-amber-950 mb-2">{feature.title}</h3>
                        <p className="text-amber-800/60 text-sm leading-relaxed mb-4">{feature.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 group-hover:text-amber-600 transition-colors">
                          Explore
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-amber-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-amber-950 mb-4">
                Why Pet Parents Love Us
              </h2>
              <p className="text-amber-800/60 max-w-xl mx-auto">
                We&apos;re committed to making pet care accessible, trustworthy, and joyful for everyone.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Verified & Trusted',
                  desc: 'Every service provider and adoption listing is thoroughly verified for quality and trust.',
                },
                {
                  icon: Clock,
                  title: '24/7 Emergency Care',
                  desc: 'Round-the-clock veterinary support for those critical moments when your pet needs help.',
                },
                {
                  icon: Heart,
                  title: 'Built with Compassion',
                  desc: 'Every feature designed with love, from adoption processes to fundraising for animals in need.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <AnimatedSection key={item.title} animation={`animate-fade-up delay-${(i + 1) * 200}`}>
                    <div className="text-center p-8">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-amber-100 flex items-center justify-center mx-auto mb-5">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-amber-950 mb-3">{item.title}</h3>
                      <p className="text-amber-800/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PawPrint className="w-10 h-10 text-amber-300/50 mx-auto mb-6" />
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Ready to Begin Your Pet Journey?
            </h2>
            <p className="text-amber-200/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of pet lovers who&apos;ve found their perfect companions through MEEHOWW.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {hydrated && !session ? (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-amber-800 hover:bg-amber-50 px-8 text-base gap-2"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Create Free Account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Link href="/adoption">
                    <Button size="lg" className="bg-amber-600/20 hover:bg-amber-600/30 text-white border border-amber-300/30 px-8 text-base">
                      Browse Pets
                    </Button>
                  </Link>
                </>
              ) : hydrated && session ? (
                <Link href="/adoption">
                  <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 px-8 text-base gap-2">
                    Find Your Pet
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab="signup"
      />
    </div>
  )
}
