import Link from 'next/link'
import { PawPrint } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-800 rounded-lg">
                <PawPrint className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-heading text-lg font-semibold tracking-wide text-amber-900">
                MEEHOWW
              </span>
            </div>
            <p className="text-amber-800/60 text-sm leading-relaxed">
              Your trusted pet ecosystem for adoption, professional services, and compassionate care.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700/50 mb-4">Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/adoption" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Pet Adoption
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Pet Shop
                </Link>
              </li>
              <li>
                <Link href="/hospital" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Pet Hospital
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700/50 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-amber-800/70 hover:text-amber-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700/50 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-amber-800/70">
              <li>info@meehoww.in</li>
              <li>+91 98765 43210</li>
              <li>Emergency: +91 11234 56789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200/50 pt-8 text-center text-amber-700/40 text-xs tracking-wide">
          <p>&copy; 2025 MEEHOWW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
