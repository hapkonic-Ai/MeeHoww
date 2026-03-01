'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, TrendingUp } from 'lucide-react'

export default function FundraisingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Support Animal Welfare</h1>
          <p className="text-xl text-amber-800/70">
            Help us provide care and support to animals in need through our fundraising campaigns
          </p>
        </section>

        {/* Active Campaigns */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Active Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 1,
                title: 'Emergency Shelter Fund',
                goal: 500000,
                raised: 320000,
                donors: 245,
              },
              {
                id: 2,
                title: 'Veterinary Care Initiative',
                goal: 750000,
                raised: 485000,
                donors: 312,
              },
              {
                id: 3,
                title: 'Rescue & Rehabilitation',
                goal: 400000,
                raised: 287500,
                donors: 189,
              },
              {
                id: 4,
                title: 'Wildlife Protection Program',
                goal: 600000,
                raised: 423000,
                donors: 267,
              },
            ].map((campaign) => {
              const progress = (campaign.raised / campaign.goal) * 100
              return (
                <Card key={campaign.id} className="overflow-hidden border-amber-100 hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-amber-400/60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-amber-950 mb-2">{campaign.title}</h3>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-amber-700/60 mb-2">
                        <span>{'\u20B9'}{campaign.raised.toLocaleString('en-IN')} raised</span>
                        <span>Goal: {'\u20B9'}{campaign.goal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-amber-700/60 mb-4">
                      {campaign.donors} donors supporting this cause
                    </p>

                    <Button className="w-full bg-amber-800 hover:bg-amber-700 flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" />
                      Donate Now
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 bg-white rounded-lg p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">How Donations Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                amount: '\u20B9500',
                helps: 'Provides food for a pet for a week',
              },
              {
                amount: '\u20B92,000',
                helps: 'Covers a basic vet exam and vaccines',
              },
              {
                amount: '\u20B910,000',
                helps: 'Funds emergency surgery or intensive care',
              },
            ].map((item) => (
              <div key={item.amount} className="text-center">
                <div className="text-3xl font-bold text-amber-800 mb-2">{item.amount}</div>
                <p className="text-amber-800/70">{item.helps}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section>
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Luna',
                story: 'Thanks to donors, Luna received emergency surgery and is now a healthy, happy dog in her forever home.',
              },
              {
                name: 'The Shelter Fund',
                story: 'Raised over \u20B95,00,000 to expand our emergency shelter and provide safe haven for 100+ rescue animals.',
              },
            ].map((story) => (
              <Card key={story.name} className="p-6 border-amber-100">
                <h3 className="text-lg font-semibold text-amber-950 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  {story.name}
                </h3>
                <p className="text-amber-800/70">{story.story}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
