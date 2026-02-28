import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-orange-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-amber-900 mb-4">MEEHOWW</h3>
            <p className="text-gray-600 text-sm">
              Your trusted pet ecosystem platform for adoption, services, and care.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/adoption" className="text-gray-600 hover:text-orange-500">
                  Pet Adoption
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-orange-500">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-orange-500">
                  Pet Shop
                </Link>
              </li>
              <li>
                <Link href="/hospital" className="text-gray-600 hover:text-orange-500">
                  Pet Hospital
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-orange-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@meehoww.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Emergency: +1 (555) 999-8888</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-100 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2024 MEEHOWW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
