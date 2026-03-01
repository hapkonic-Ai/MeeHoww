'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Stethoscope, Heart, Zap, Pill, Scissors, Clock, Award, Shield } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: Stethoscope,
    title: 'General Check-ups',
    description: 'Comprehensive physical examinations for your pet',
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Specialized heart and cardiovascular care',
  },
  {
    icon: Pill,
    title: 'Medication Management',
    description: 'Prescription and treatment management',
  },
  {
    icon: Scissors,
    title: 'Surgery',
    description: 'Advanced surgical procedures by experienced surgeons',
  },
  {
    icon: Zap,
    title: 'Emergency Care',
    description: '24/7 emergency veterinary services',
  },
  {
    icon: Heart,
    title: 'Vaccination',
    description: 'Complete vaccination and immunization programs',
  },
]

const FEATURES = [
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Available round the clock for emergencies',
  },
  {
    icon: Award,
    title: 'Expert Team',
    description: 'Board-certified veterinarians and specialists',
  },
  {
    icon: Shield,
    title: 'Quality Care',
    description: 'State-of-the-art facilities and equipment',
  },
]

export default function HospitalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
              Pet Hospital & Veterinary Care
            </h1>
            <p className="text-xl text-amber-800/70 mb-8 max-w-2xl mx-auto">
              Trusted medical care for your beloved pets. From routine check-ups to emergency
              services, we're here for your pet's health and wellbeing.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/hospital/appointments">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-700">
                  Book an Appointment
                </Button>
              </Link>
              <Link href="/hospital/emergency">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600">
                  Emergency Service
                </Button>
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          <div>
            <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => (
                <Card key={index} className="p-6 border-amber-100 hover:shadow-lg transition">
                  <service.icon className="w-12 h-12 text-amber-600 mb-4" />
                  <h3 className="text-lg font-semibold text-amber-950 mb-2">{service.title}</h3>
                  <p className="text-amber-700/60">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
              Why Choose Our Hospital?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-950 mb-2">{feature.title}</h3>
                  <p className="text-amber-700/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <Card className="p-8 md:p-12 border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-amber-950 mb-1">Address</h3>
                    <p className="text-amber-800/70">42 Pet Care Lane, Andheri West, Mumbai 400058</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-950 mb-1">Phone</h3>
                    <p className="text-amber-800/70">
                      <strong>Emergency:</strong> 1800-123-PETS (1800-123-7387)
                    </p>
                    <p className="text-amber-800/70">
                      <strong>General:</strong> +91 22 4567 8900
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-950 mb-1">Hours</h3>
                    <p className="text-amber-800/70">Monday - Friday: 9:00 AM - 7:00 PM IST</p>
                    <p className="text-amber-800/70">Saturday: 9:00 AM - 5:00 PM IST</p>
                    <p className="text-amber-800/70">Emergency: 24/7 Available</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">Emergency Hotline</h2>
                <div className="bg-white p-6 rounded-lg border-2 border-red-500">
                  <p className="text-amber-700/60 mb-4">
                    If your pet is experiencing a medical emergency, please call our emergency
                    hotline immediately. Our team is available 24/7 to provide immediate care.
                  </p>
                  <div className="text-4xl font-bold text-red-600 mb-6">1800-123-PETS</div>
                  <Button
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    Request Emergency Assistance
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card className="p-6 border-amber-100">
                <h3 className="text-lg font-semibold text-amber-950 mb-2">
                  How do I schedule an appointment?
                </h3>
                <p className="text-amber-800/70">
                  You can schedule an appointment through our website by clicking "Book an
                  Appointment" or by calling us at +91 22 4567 8900. We typically have availability
                  within 2-3 days for non-urgent cases.
                </p>
              </Card>

              <Card className="p-6 border-amber-100">
                <h3 className="text-lg font-semibold text-amber-950 mb-2">
                  What should I bring for the appointment?
                </h3>
                <p className="text-amber-800/70">
                  Please bring your pet's vaccination records, any previous medical records, and a
                  list of current medications if applicable. Also bring a picture ID and payment
                  method.
                </p>
              </Card>

              <Card className="p-6 border-amber-100">
                <h3 className="text-lg font-semibold text-amber-950 mb-2">
                  What is your emergency protocol?
                </h3>
                <p className="text-amber-800/70">
                  In case of an emergency, call our emergency hotline immediately at
                  1800-123-PETS. Our emergency team will assess your pet and provide immediate
                  care. You can also submit an online emergency request through the app.
                </p>
              </Card>

              <Card className="p-6 border-amber-100">
                <h3 className="text-lg font-semibold text-amber-950 mb-2">Do you accept insurance?</h3>
                <p className="text-amber-800/70">
                  We accept most major pet insurance plans. Please verify coverage with your
                  insurance provider and inform our staff of your coverage details at check-in.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
