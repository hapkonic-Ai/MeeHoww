'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Contact Us</h1>
          <p className="text-xl text-amber-800/70">
            Have questions? We're here to help. Reach out to our team.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 border-amber-100">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Email</h3>
                  <p className="text-amber-700/60">support@meehoww.in</p>
                  <p className="text-amber-700/60">business@meehoww.in</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-amber-100">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Phone</h3>
                  <p className="text-amber-700/60">+91 22 4567 8900</p>
                  <p className="text-amber-700/60">Emergency: +91 11234 56789</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-amber-100">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Address</h3>
                  <p className="text-amber-700/60">42 Pet Care Lane, Andheri West</p>
                  <p className="text-amber-700/60">Mumbai 400058</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-amber-100">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Hours</h3>
                  <p className="text-amber-700/60">Mon-Fri: 9 AM - 6 PM IST</p>
                  <p className="text-amber-700/60">Sat: 10 AM - 4 PM IST</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-amber-100">
              <h2 className="text-2xl font-bold text-amber-950 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-amber-800/70 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800/70 mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="adoption">Pet Adoption</option>
                    <option value="services">Services Inquiry</option>
                    <option value="shop">Pet Shop</option>
                    <option value="hospital">Hospital Services</option>
                    <option value="fundraising">Fundraising</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800/70 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How do I adopt a pet?',
                a: 'Visit our Adoption page, browse available pets, and submit an application. Our team will review your profile and contact you soon.',
              },
              {
                q: 'What is the adoption fee?',
                a: 'Adoption fees vary by pet and may be free or include a fee. Details are shown on each pet\'s profile.',
              },
              {
                q: 'How can I book a service?',
                a: 'Visit the Services page, select a service provider, and book an appointment through our scheduling system.',
              },
              {
                q: 'Is emergency care available 24/7?',
                a: 'Yes! Our emergency hotline is available 24/7 at +91 11234 56789 for urgent pet care needs.',
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-amber-950 mb-2">{faq.q}</h3>
                <p className="text-amber-800/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
