'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Heart, Users, Globe, Trophy } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">About MEEHOWW</h1>
          <p className="text-xl text-amber-800/70 max-w-2xl mx-auto">
            Building the world's most trusted pet ecosystem where pet lovers can adopt,
            care for, and celebrate their furry companions.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 border-amber-100">
            <h2 className="text-2xl font-bold text-amber-950 mb-4">Our Mission</h2>
            <p className="text-amber-800/70">
              To create a unified ecosystem that connects pet lovers with everything they need
              for their pets' health, happiness, and well-being. We believe every pet deserves
              a loving home and comprehensive care.
            </p>
          </Card>

          <Card className="p-8 border-amber-100">
            <h2 className="text-2xl font-bold text-amber-950 mb-4">Our Vision</h2>
            <p className="text-amber-800/70">
              A world where pet adoption is accessible, pet services are professional and
              trustworthy, and every pet has access to quality healthcare and products.
              Together, we're making pet ownership easier and more rewarding.
            </p>
          </Card>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Compassion', desc: 'We care deeply about animal welfare' },
              { icon: Users, title: 'Community', desc: 'Building strong pet-loving communities' },
              { icon: Globe, title: 'Accessibility', desc: 'Services available to everyone' },
              { icon: Trophy, title: 'Excellence', desc: 'Quality in everything we do' },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-6 border-amber-100 text-center">
                <Icon className="w-10 h-10 text-amber-800 mx-auto mb-3" />
                <h3 className="font-semibold text-amber-950 mb-2">{title}</h3>
                <p className="text-amber-700/60 text-sm">{desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-white rounded-lg p-8 border border-amber-100 mb-12">
          <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Pets Adopted' },
              { number: '2,500+', label: 'Service Providers' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '15+', label: 'Cities across India' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-amber-800 mb-2">{stat.number}</div>
                <p className="text-amber-700/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">Our Team</h2>
          <p className="text-amber-800/70 text-center mb-8 max-w-2xl mx-auto">
            Led by passionate pet lovers and experienced professionals dedicated to improving
            the lives of pets and their owners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Sharma', role: 'Founder & CEO' },
              { name: 'Arjun Mehta', role: 'COO' },
              { name: 'Dr. Kavita Rao', role: 'Veterinary Director' },
            ].map((member) => (
              <Card key={member.name} className="p-6 border-amber-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-700">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-amber-950">{member.name}</h3>
                <p className="text-amber-700/60 text-sm">{member.role}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-amber-50 rounded-lg p-8 border-2 border-amber-200 text-center">
          <h2 className="text-2xl font-bold text-amber-950 mb-2">Get In Touch</h2>
          <p className="text-amber-800/70 mb-6">Have questions? We'd love to hear from you.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition">
            Contact Us
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
